import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { UserProfile } from "./user.types";

export async function getMyProfile(): Promise<UserProfile> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to load profile");

  return res.json();
}

export async function updateProfile(formData: FormData): Promise<UserProfile> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to update profile");

  return res.json();
}

import { PostListResponse } from "@/features/post/post.types";

export interface PublicUserProfile extends Omit<UserProfile, "email"> {
  username: string;
  posts: PostListResponse;
}

export async function getUserByUsername(
  username: string,
  page = 1,
  limit = 10
): Promise<PublicUserProfile> {
  const res = await fetch(
    `${API_URL}/users/by-username/${encodeURIComponent(
      username
    )}?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    throw new Error("User not found");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
}
