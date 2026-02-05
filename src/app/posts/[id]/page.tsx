import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import CommentForm from "@/components/CommentForm";
import { getComments, getPostById } from "@/features/post/post.service";
import { Post } from "@/features/post/post.types";
import { Comment } from "@/features/post/comment.types";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: Params) {
  const { id } = await params;
  const numericId = Number(id);

  if (!id || isNaN(numericId)) return notFound();

  let post: Post;
  try {
    post = await getPostById(String(numericId));
  } catch {
    return notFound();
  }

  let comments: Comment[] = [];
  try {
    comments = await getComments(numericId);
  } catch {}

  return (
    <main className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
      {/* TITLE */}
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-gray-900">
          {post.title}
        </h1>

        {/* TAGS */}
        {post.tags && (
          <div className="flex justify-center flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* AUTHOR + DATE */}
        <div className="flex flex-col items-center gap-2 text-gray-600 text-sm">
          <Image
            src={ "/avatar.png"}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <p className="font-medium">{post.author.name}</p>
          <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </header>

      {/* HERO IMAGE */}
      {post.imageUrl && (
        <div className="w-full mb-8 rounded-lg overflow-hidden shadow-md mx-auto">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1200}
            height={500}
            className="object-cover w-full h-64 sm:h-80 md:h-96 mx-auto rounded-lg"
            priority
          />
        </div>
      )}

      {/* CONTENT */}
      <article className="prose prose-lg sm:prose-xl max-w-none mb-10 text-gray-800 mx-auto text-center">
        <p>{post.content}</p>
      </article>

      {/* STATS */}
      <div className="flex justify-center items-center gap-6 mb-10 text-gray-700">
        <LikeButton postId={numericId} initialLikes={post.likes} />
        <span className="font-medium">💬 {comments.length} Comments</span>
      </div>

      {/* COMMENTS */}
      <section className="comments">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
          Comments
        </h3>

        {comments.length === 0 ? (
          <p className="text-gray-500 mb-4">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-6 mb-6">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md bg-white text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/avatar.png"
                    alt={comment.author.name}
                    width={50}
                    height={32}
                    className="rounded-full"
                  />
                  <p className="font-semibold text-gray-800">{comment.author.name}</p>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-left">
          <CommentForm postId={numericId} />
        </div>
      </section>
    </main>
  );
}
