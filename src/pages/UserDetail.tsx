// src/pages/UserDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { usePostFavorites } from "../context/PostFavoriteContext";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { toggleFavorite, isFavorite } = usePostFavorites();

  // API + localStorage'dan postları getirme
  useEffect(() => {
    const fetchPosts = async () => {
      const apiPosts = await api.getPostsByUser(userId);
      const storedPosts: Post[] = JSON.parse(localStorage.getItem("addedPosts") || "[]");
      const userStoredPosts = storedPosts.filter((p) => p.userId === userId);
      setPosts([...userStoredPosts.reverse(), ...apiPosts]);
    };
    fetchPosts();
  }, [userId]);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    const newPost = await api.createPost({ title, body, userId });

    setPosts((prev) => [newPost, ...prev]);

    const stored: Post[] = JSON.parse(localStorage.getItem("addedPosts") || "[]");
    localStorage.setItem("addedPosts", JSON.stringify([newPost, ...stored]));

    setTitle("");
    setBody("");
  };

  const handleDelete = async (postId: number) => {
    await api.deletePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));

    const stored: Post[] = JSON.parse(localStorage.getItem("addedPosts") || "[]");
    localStorage.setItem("addedPosts", JSON.stringify(stored.filter((p) => p.id !== postId)));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary-700 dark:text-primary-300">
        Posts
      </h1>

      <form
        onSubmit={handleAddPost}
        className="mb-6 flex flex-col items-center space-y-3 max-w-xl mx-auto 
                   bg-card-light dark:bg-card-dark p-4 rounded shadow"
      >
        <input
          className="border p-2 w-full rounded bg-white dark:bg-primary-100 text-black dark:text-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full rounded bg-white dark:bg-primary-100 text-black dark:text-black"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Post
        </button>
      </form>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className={`p-4 rounded shadow flex justify-between items-start transition-colors duration-500
              ${isFavorite(post.id)
                ? "bg-blue-700 text-white"
                : "bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark"
              }`}
          >
            <div>
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <button
                onClick={() => toggleFavorite(post.id)}
                className={`text-xl ${isFavorite(post.id) ? "text-yellow-400" : "text-gray-400"}`}
              >
                ★
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
