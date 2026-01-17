const KEY = "local_posts";

export function getLocalPosts(userId: number) {
  const all = JSON.parse(localStorage.getItem(KEY) || "{}");
  return all[userId] || [];
}

export function saveLocalPost(userId: number, post: any) {
  const all = JSON.parse(localStorage.getItem(KEY) || "{}");

  const updated = {
    ...all,
    [userId]: [post, ...(all[userId] || [])],
  };

  localStorage.setItem(KEY, JSON.stringify(updated));
}