export interface UserMe {
  id: number;
  name: string;
  email: string;
  headline: string | null;
  avatarUrl: string | null;
}

export interface PublicUser {
  id: number;
  name: string;
  username: string;
  headline: string | null;
  avatarUrl: string | null;
  posts: {
    data: UserPost[];
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface UserPost {
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
    email: string;
  };
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  headline: string | null;
  avatarUrl: string | null;
}
