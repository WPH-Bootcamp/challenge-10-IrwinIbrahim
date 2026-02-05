"use client";

import Link from "next/link";
import { Post } from "@/features/post/post.types";
import { deletePost } from "@/features/post/post.service";
import { getMyProfile } from "@/features/user/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostOwnerActions({ post }: { post: Post }) {
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function checkOwner() {
      try {
        const me = await getMyProfile();
        setIsOwner(me.id === post.author.id);
      } catch {
        setIsOwner(false);
      }
    }

    checkOwner();
  }, [post.author.id]);

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    await deletePost(post.id);
    router.push("/");
  }

  if (!isOwner) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <Link href={`/posts/${post.id}/edit`}>✏️ Edit</Link>{" "}
      <button onClick={handleDelete}>🗑 Delete</button>
    </div>
  );
}
