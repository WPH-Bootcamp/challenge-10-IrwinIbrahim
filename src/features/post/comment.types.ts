// export interface Comment {
//   id: number;
//   content: string;
//   createdAt: string;
//   author: {
//     id: number;
//     name: string;
//     headline?: string;
//     avatarUrl?: string;
//   };
// }

export interface CommentAuthor {
  id: number;
  name: string;
  headline?: string;
  avatarUrl?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: CommentAuthor;
}
