import { searchPosts } from "@/features/post/post.service";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import type { Metadata } from "next";
import type { Post } from "@/features/post/post.types";

export const metadata: Metadata = {
  title: "Home",
  description: "Read the latest articles from our community",
};

interface Props {
  searchParams: { page?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1);

  const posts = await searchPosts("", page, 10);

  return (
    <main className="container">
      <h1>Recommend For you</h1>

      {posts.data.length === 0 && <p>No posts found</p>}

      {posts.data.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <Pagination
        current={posts.page}
        total={posts.lastPage}
        basePath="/"
      />
    </main>
  );
}
