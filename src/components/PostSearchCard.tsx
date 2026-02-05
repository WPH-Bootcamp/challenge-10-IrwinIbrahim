import Image from "next/image";
import type { Post } from "@/features/post/post.types";

interface Props {
  post: Post;
}

export default function PostSearchCard({ post }: Props) {
  return (
    <article className="flex gap-6 bg-white rounded-xl border p-4">
      {/* IMAGE */}
      <div className="relative w-64 h-40 overflow-hidden rounded-lg">
        <Image
          src={post.imageUrl || "/post-placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">
          {post.title}
        </h2>

        {/* TAGS */}
        <div className="flex gap-2 mb-3">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* EXCERPT (from content) */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {post.content.slice(0, 140)}...
        </p>

        {/* FOOTER */}
        <div className="mt-auto flex items-center gap-4 text-sm text-gray-500">
          <span>{post.author.name}</span>
          <span>•</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span>👍 {post.likes}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </article>
  );
}
