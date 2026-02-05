import type { Metadata } from "next";
import { getUserByUsername } from "@/features/user/user.service";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { Post } from "@/features/post/post.types";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  const user = await getUserByUsername(params.username, 1, 1);

  return {
    title: `${user.name} (@${user.username})`,
    description: user.headline || `Posts by ${user.name}`,
    openGraph: {
      title: user.name,
      description: user.headline || "",
      images: user.avatarUrl ? [user.avatarUrl] : [],
    },
  };
}

interface Props {
  params: { username: string };
  searchParams: { page?: string };
}

export default async function UserProfilePage({
  params,
  searchParams,
}: Props) {
  const page = Number(searchParams.page || 1);

  let user;
  try {
    user = await getUserByUsername(params.username, page, 10);
  } catch {
    notFound();
  }

  return (
    <main className="container">
      <h1>{user.name}</h1>
      <p>@{user.username}</p>
      <p>{user.headline || "No headline"}</p>

      {user.posts.data.length === 0 && <p>No posts yet</p>}

      {user.posts.data.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <Pagination
        current={user.posts.page}
        total={user.posts.lastPage}
        basePath={`/users/${user.username}`}
      />
    </main>
  );
}
