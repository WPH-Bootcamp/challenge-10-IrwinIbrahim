import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/features/post/post.types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="post-card">
      {/* IMAGE */}
      <div className="post-image">
        <Image
          src={post.imageUrl || "/post-placeholder.jpg"}
          alt={post.title}
          width={320}
          height={200}
        />
      </div>

      {/* CONTENT */}
      <div className="post-content">
        <Link href={`/posts/${post.id}`}>
          <h2 className="post-title">{post.title}</h2>
        </Link>

        {/* TAGS */}
        {post.tags?.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tags) => (
              <span key={tags} className="tag">
                {tags}
              </span>
            ))}
          </div>
        )}

        {/* EXCERPT */}
        <p className="post-excerpt">
          {post.content.slice(0, 140)}...
        </p>

        {/* FOOTER */}
        <div className="post-footer">
          <div className="author">
            <Image
              src="/avatar.png"
              alt={post.author.name}
              width={40}
              height={28}
              className="avatar"
            />
            <span className="author-name">{post.author.name}</span>
            <span className="dot">•</span>
            <span className="date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="stats">
            <span>👍 {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
