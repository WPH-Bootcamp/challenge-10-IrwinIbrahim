export interface Author {
  id: number;
  name: string;
  username: string;
  email?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string | null;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface PaginatedPosts {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
}
