"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";
import type { StoredMovie } from "@/features/movies/services/mapper";

type FavoriteItem = {
  id: string;
  movie: StoredMovie;
  createdAt: Date;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
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
    const fetchFavorites = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(
          collection(db, "users", userId, "favorites"),
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
  }, []);

  const deleteAll = async () => {
    const userId = getUserId();
    if (!userId || favorites.length === 0) return;

    setDeleting(true);
    try {
      const batch = writeBatch(db);
      favorites.forEach((item) => {
        batch.delete(doc(db, "users", userId, "favorites", item.id));
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
