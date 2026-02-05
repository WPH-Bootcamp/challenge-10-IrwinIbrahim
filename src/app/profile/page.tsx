"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyProfile } from "@/features/user/user.service";
import { UserProfile } from "@/features/user/user.types";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return null;

  return (
    <main className="container">
      <h1>My Profile</h1>

      {profile.avatarUrl && (
        <img
          src={`${profile.avatarUrl}`}
          alt="Avatar"
          width={120}
          height={120}
        />
      )}

      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Headline:</b> {profile.headline || "-"}</p>

      <button onClick={() => router.push("/profile/edit")}>
        Edit Profile
      </button>
    </main>
  );
}
