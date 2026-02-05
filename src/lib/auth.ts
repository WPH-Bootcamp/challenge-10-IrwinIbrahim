import { UserProfile } from "@/features/user/user.types";

export function isOwner(
  user: UserProfile | null,
  authorId: number
) {
  return user?.id === authorId;
}

export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("token");
}
