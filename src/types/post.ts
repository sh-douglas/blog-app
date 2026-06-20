interface PostProps {
  id: number;
  title: string;
  content: string;
  author: AuthorProps;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthorProps {
  id: number;
  name: string;
}

export type { PostProps };
