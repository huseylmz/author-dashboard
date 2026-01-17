export const BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {
  getUsers: async () => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Users alınamadı");
    return res.json();
  },

  getPostsByUser: async (userId: number) => {
    const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if (!res.ok) throw new Error("Postlar alınamadı");
    return res.json();
  },

  createPost: async (post: { title: string; body: string; userId: number }) => {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return res.json();
  },

  deletePost: async (postId: number) => {
    await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
    });
  },
};
