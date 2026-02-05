export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string | null;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: number;
    name: string;
    username: string;
    email?: string;
  };
}


export interface PostListResponse {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
}
