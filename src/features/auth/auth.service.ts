import { API_URL } from "@/lib/api";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function register(
  email: string,
  username: string,
  password: string
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  if (res.status === 400) {
    const err = await res.json();
    throw new Error(err.message || "Email already registered");
  }

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}
