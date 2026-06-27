"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import type { StoredMovie } from "@/features/movies/services/mapper";

type WatchlistItem = {
  id: string;
  movie: StoredMovie;
  createdAt: Date;
};

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const getUserId = (): string | null => {
    try {
      const stored = localStorage.getItem("user_data");
      if (!stored) return null;
      return JSON.parse(stored)?.user?.uid ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(
          collection(db, "users", userId, "watchlist"),
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
  }, []);

  const deleteAll = async () => {
    const userId = getUserId();
    if (!userId || watchlist.length === 0) return;

    setDeleting(true);
    try {
      const batch = writeBatch(db);
      watchlist.forEach((item) => {
        batch.delete(doc(db, "users", userId, "watchlist", item.id));
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
