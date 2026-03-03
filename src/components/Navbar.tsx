"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getToken } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const isLoggedIn = !!getToken();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <header className="navbar">
      {/* LEFT: LOGO */}
      <Link href="/" className="navbar-logo">
        <span className="logo-icon">▮▮</span>
        <span>Your Logo</span>
      </Link>

      {/* CENTER: SEARCH */}
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          placeholder="Frontend Development"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* RIGHT */}
      <div className="navbar-right">
        <Link href="/write" className="write-btn">
          ✏️ Write Post
        </Link>

        {isLoggedIn ? (
          <Link href="/profile" className="user">
            <Image
              src="/avatar.png"
              alt="avatar"
              width={32}
              height={32}
              className="avatar"
            />
            <span>John Doe</span>
          </Link>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register" className="text-center tombol">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
