import Link from "next/link";

interface Props {
  current: number;
  total: number;
  basePath: string;
}

export default function Pagination({ current, total, basePath }: Props) {
  if (total <= 1) return null;

  return (
    <div style={{ marginTop: 24 }}>
      {Array.from({ length: total }).map((_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            style={{
              marginRight: 8,
              fontWeight: page === current ? "bold" : "normal",
            }}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
