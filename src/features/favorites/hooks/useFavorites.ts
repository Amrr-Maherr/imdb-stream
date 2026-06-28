"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import type { StoredMovie } from "@/features/movies/services/mapper";
import { useAuth } from "@/shared/provider/authProvider";

type FavoriteItem = {
  id: string;
  movie: StoredMovie;
  createdAt: Date;
};

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(
          collection(db, "users", user.uid, "favorites"),
        );
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FavoriteItem[];

        setFavorites(items);
      } catch {
        console.error("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const deleteAll = async () => {
    if (!user || favorites.length === 0) return;

    setDeleting(true);
    try {
      const batch = writeBatch(db);
      favorites.forEach((item) => {
        batch.delete(doc(db, "users", user!.uid, "favorites", item.id));
      });
      await batch.commit();
      setFavorites([]);
    } catch {
      console.error("Failed to delete favorites");
    } finally {
      setDeleting(false);
    }
  };

  return { favorites, loading, deleting, deleteAll };
}
