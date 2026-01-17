// src/pages/FavoritesPage.tsx
import { useFavorites } from "../context/FavoriteContext";
import { usePostFavorites } from "../context/PostFavoriteContext";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

type User = { id: number; name: string; email: string };
type Post = { id: number; userId: number; title: string; body: string };

export default function FavoritesPage() {
  const { favoriteUsers } = useFavorites();
  const { favorites: favoritePosts } = usePostFavorites();

  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.getUsers().then((allUsers) => {
      setUsers(allUsers.filter((u: User) => favoriteUsers.includes(u.id)));
    });
  }, [favoriteUsers]);

  useEffect(() => {
    const fetchPosts = async () => {
      const storedPosts: Post[] = JSON.parse(localStorage.getItem("addedPosts") || "[]");
      const userPosts: Post[] = [];

      for (const userId of favoriteUsers) {
        const apiPosts = await api.getPostsByUser(userId);
        userPosts.push(...apiPosts);
      }

      const filteredPosts = [...userPosts, ...storedPosts]
        .filter((p) => favoritePosts.includes(p.id));
      setPosts(filteredPosts);
    };
    fetchPosts();
  }, [favoriteUsers, favoritePosts]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary-700 dark:text-primary-300">
        Favorites
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-primary-700 dark:text-primary-300">Favorite Authors</h2>
        {users.length === 0 && <p>No favorite authors yet.</p>}
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 rounded shadow bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark"
            >
              <Link to={`/users/${user.id}`} className="font-bold hover:underline">
                {user.name}
              </Link>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-primary-700 dark:text-primary-300">Favorite Posts</h2>
        {posts.length === 0 && <p>No favorite posts yet.</p>}
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 rounded shadow bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark"
            >
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
