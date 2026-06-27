"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export function useAddToWatchlist() {
  const [loading, setLoading] = useState(false);

  const addToWatchlist = async (movie: any, user: any) => {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "users", user.uid, "watchlist", movie.id.toString()),
        {
          movie,
          createdAt: new Date(),
        },
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addToWatchlist,
  };
}
