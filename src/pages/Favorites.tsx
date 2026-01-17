import { useFavorites } from "../context/FavoriteContext";
import { usePostFavorites } from "../context/PostFavoriteContext";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const { favoriteUsers } = useFavorites();
  const { favorites: favoritePosts } = usePostFavorites();

  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);


    const fetchUsers = api.getUsers().then((allUsers) =>
      allUsers.filter((u: any) => favoriteUsers.includes(u.id))
    );


    const fetchPosts = Promise.all(
      favoritePosts.map((id) =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
          res.json()
        )
      )
    );

    Promise.all([fetchUsers, fetchPosts])
      .then(([favUsers, favPosts]) => {
        setUsers(favUsers);
        setPosts(favPosts);
      })
      .catch(() => {
        setUsers([]);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [favoriteUsers, favoritePosts]);

  if (loading) return <p className="p-6">Yükleniyor...</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => navigate(-1)}
      >
        ← Geri
      </button>

      <h1 className="text-2xl font-bold mb-6">Favoriler</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Favori Yazarlar</h2>
        {users.length === 0 ? (
          <p>Henüz favori yazar eklenmedi.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-blue-200 rounded shadow hover:bg-yellow-300 transition"
              >
                <Link
                  className="font-bold hover:underline"
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Link>
                <p className="text-sm">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Favori Postlar</h2>
        {posts.length === 0 ? (
          <p>Henüz favori post eklenmedi.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-blue-100 rounded shadow hover:bg-blue-200 transition"
              >
                <h3 className="font-bold mb-2">{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}