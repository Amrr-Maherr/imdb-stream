"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export function useAddToFavorite() {
  const [loading, setLoading] = useState(false);

  const addToFavorite = async (movie: any, user: any) => {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "users", user.uid, "favorites", movie.id.toString()),
        {
          movie,
          createdAt: new Date(),
        },
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addToFavorite,
  };
}
