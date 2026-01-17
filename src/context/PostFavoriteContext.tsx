import { createContext, useContext, useEffect, useState } from "react";

type PostFavoriteContextType = {
  favorites: number[];
  toggleFavorite: (postId: number) => void;
  isFavorite: (postId: number) => boolean;
};

const PostFavoriteContext = createContext<PostFavoriteContextType | null>(null);

export function PostFavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favoritePosts");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritePosts", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (postId: number) => {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const isFavorite = (postId: number) => favorites.includes(postId);

  return (
    <PostFavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </PostFavoriteContext.Provider>
  );
}

export function usePostFavorites() {
  const ctx = useContext(PostFavoriteContext);
  if (!ctx) throw new Error("usePostFavorites must be used inside PostFavoriteProvider");
  return ctx;
}