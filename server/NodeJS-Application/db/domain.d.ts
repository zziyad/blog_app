interface User {
  username: string;
  email: string;
  password: string;
  img: string;
  userId?: string;
}

interface Post {
  title: string;
  desc: string;
  img: string;
  date: string;
  uidId: string;
  postId?: string;
}
