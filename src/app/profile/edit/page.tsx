"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostById, updatePost } from "@/features/post/post.service";
import { getMyProfile } from "@/features/user/user.service";
import { isOwner } from "@/lib/auth";

export default function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const postId = Number(params.id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [post, me] = await Promise.all([
          getPostById(params.id),
          getMyProfile(),
        ]);

        if (!isOwner(me, post.author.id)) {
          router.replace("/");
          return;
        }

        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(", "));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updatePost(postId, {
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
    });

    router.push(`/posts/${postId}`);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <main className="container">
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </main>
  );
}
