import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { User } from "../types/user";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { favoriteUsers, toggleFavoriteUser } = useFavorites();

  useEffect(() => {
    api.getUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <input
        className="p-2 rounded w-full mb-6 border border-primary-300
                   focus:ring-2 focus:ring-primary-400 focus:outline-none
                   bg-white dark:bg-primary-900 dark:text-white"
        placeholder="Search authors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((user) => (
          <div
            key={user.id}
            className={`relative p-6 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl
              ${favoriteUsers.includes(user.id)
                ? "bg-blue-200 dark:bg-blue-700"
                : "bg-card-light dark:bg-card-dark"
              }
              text-text-light dark:text-text-dark
            `}
          >
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => toggleFavoriteUser(user.id)}
            >
              {favoriteUsers.includes(user.id) ? "★" : "☆"}
            </button>
            <Link to={`/users/${user.id}`}>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
