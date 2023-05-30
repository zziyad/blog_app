interface Account {
  name: string;
  email: string;
  password: string;
  accountId?: string;
}

interface Post {
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  postId?: string;
}

interface Category {
  name: string;
  postId: string;
  categoryId?: string;
}

interface Comment {
  message: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  parent_id: number;
  commentId?: string;
}

interface File {
  file_path: string;
  postId: string;
  fileId?: string;
}

interface comment_like {
  userId: string;
  commentId: string;
  comment_likeId?: string;
}
