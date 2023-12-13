import type { ReactNode } from 'react';

type Props = {
  post: ReactNode;
  comments: ReactNode;
}

export default function ParallelRoutes({ post, comments }: Props) {
  return (
    <main className="p-24">
      {post}
      {comments}
    </main>
  );
}
