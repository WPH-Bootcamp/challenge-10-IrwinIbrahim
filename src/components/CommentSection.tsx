"use client";

import { useEffect, useState } from "react";
import {
  getComments,
  createComment,
} from "@/features/post/post.service";
import { Comment } from "@/features/post/comment.types";

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComments(postId)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;

    try {
      const newComment = await createComment(postId, content);
      setComments((prev) => [newComment, ...prev]);
      setContent("");
    } catch {
      alert("Login required");
    }
  }

  return (
    <section style={{ marginTop: 32 }}>
      <h3>Comments</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />
        <button type="submit">Send</button>
      </form>

      {loading && <p>Loading comments...</p>}

      {comments.map((c) => (
        <div key={c.id} style={{ marginTop: 12 }}>
          <b>{c.author.name}</b>
          <p>{c.content}</p>
        </div>
      ))}
    </section>
  );
}
