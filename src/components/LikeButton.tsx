"use client";

import { useState } from "react";
import { likePost, unlikePost } from "@/features/post/post.service";
import { getToken } from "@/lib/auth";

interface Props {
  postId: number;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  async function toggleLike() {
    if (!getToken()) {
      alert("Please login to like");
      return;
    }

    if (liked) {
      await unlikePost(postId);
      setLikes((l) => l - 1);
    } else {
      await likePost(postId);
      setLikes((l) => l + 1);
    }

    setLiked(!liked);
  }

  return (
    <button onClick={toggleLike} className="like-btn">
      👍 {likes}
    </button>
  );
}
