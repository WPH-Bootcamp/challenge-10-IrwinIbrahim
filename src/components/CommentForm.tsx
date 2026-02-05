"use client";

import { useState } from "react";
import { createComment } from "@/features/post/post.service";
import { getToken } from "@/lib/auth";

export default function CommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!getToken()) {
      alert("Please login to comment");
      return;
    }

    if (!content.trim()) return;

    await createComment(postId, content);
    setContent("");
    location.reload(); // simple & safe
  }

  return (
    <form onSubmit={submit} className="comment-form">
      <textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="absolute bottom-0 left-0" >Send</button>
    </form>
  );
}
