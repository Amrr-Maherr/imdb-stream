"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import type { StoredMovie } from "@/features/movies/services/mapper";
import { useAuth } from "@/shared/provider/authProvider";

type WatchlistItem = {
  id: string;
  movie: StoredMovie;
  createdAt: Date;
};

export function useWatchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(
          collection(db, "users", user.uid, "watchlist"),
        );
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as WatchlistItem[];

        setWatchlist(items);
      } catch {
        console.error("Failed to fetch watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  const deleteAll = async () => {
    if (!user || watchlist.length === 0) return;

    setDeleting(true);
    try {
      const batch = writeBatch(db);
      watchlist.forEach((item) => {
        batch.delete(doc(db, "users", user!.uid, "watchlist", item.id));
      });
      await batch.commit();
      setWatchlist([]);
    } catch {
      console.error("Failed to delete watchlist");
    } finally {
      setDeleting(false);
    }
  };

  return { watchlist, loading, deleting, deleteAll };
}
