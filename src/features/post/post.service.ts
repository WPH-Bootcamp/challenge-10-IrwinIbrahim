import { API_URL } from "@/lib/api";
import { Post, PostListResponse } from "./post.types";
import { getToken } from "@/lib/auth";
import { Comment } from "./comment.types";
/* SEARCH / HOME */

/**
 * GET /posts/search
 * API REAL: ?query=&page=&limit=
 */
export async function searchPosts(
  query: string,
  page = 1,
  limit = 10,
): Promise<PostListResponse> {
  const res = await fetch(
    `${API_URL}/posts/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to search posts");
  }

  return res.json();
}

/* POST DETAIL */

/**
 * GET /posts/:id
 */
export async function getPostById(id: string) {
  const res = await fetch(
    `https://be-blg-production.up.railway.app/posts/${id}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

/* CREATE */

export async function createPost(data: {
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
}) {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to create post");

  return res.json();
}

/* PUBLIC POSTS BY USER */

/**
 * GET /users/by-username/:username
 * posts ada di data.posts
 */
export async function getPostsByUsername(
  username: string,
  page = 1,
  limit = 10,
): Promise<PostListResponse> {
  const res = await fetch(
    `${API_URL}/users/by-username/${encodeURIComponent(
      username,
    )}?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user posts");
  }

  const data = await res.json();
  return data.posts;
}

/* UPDATE / DELETE */

export async function updatePost(
  id: number,
  data: {
    title: string;
    content: string;
    tags: string[];
    imageUrl?: string;
  },
) {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to update post");

  return res.json();
}

export async function deletePost(id: number) {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to delete post");
}

/* LIKE */

export async function likePost(postId: number) {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to like post");
}

export async function unlikePost(postId: number) {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/posts/${postId}/like`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to unlike post");
}

/* COMMENT */

export async function getComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load comments");
  return res.json();
}

export async function createComment(postId: number, content: string) {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
}

export async function getPosts(search?: string): Promise<Post[]> {
  const url = search
    ? `${API_URL}/posts?search=${encodeURIComponent(search)}`
    : `${API_URL}/posts`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Fetch error:", res.status);
    return [];
  }

  return res.json();
}
