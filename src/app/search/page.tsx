import { searchPosts } from "@/features/post/post.service";
import PostSearchCard from "@/components/PostSearchCard";

interface SearchPageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";
  const page = Number(searchParams.page || 1);

  if (!query) {
    return (
      <main className="container">
        <p>Type something to search</p>
      </main>
    );
  }

  const posts = await searchPosts(query, page, 10);

  return (
    <main className="container">
      <h1>
        Result for <span className="highlight">"{query}"</span>
      </h1>

      {posts.data.length === 0 && <p>No results found</p>}

      {posts.data.map((post) => (
        <PostSearchCard key={post.id} post={post} />
      ))}
    </main>
  );
}
