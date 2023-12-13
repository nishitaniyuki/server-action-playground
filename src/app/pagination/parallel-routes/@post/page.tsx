import type { Post } from '../types';

export default async function Post() {
  const post  = await fetch('http://localhost:3001/posts/1').then(res => res.json()) as Post;

  return (
    <>
      <h1 className="mb-3 text-2xl font-semibold">
        {`"${post.title}" by ${post.author}`}
      </h1>
      <p>{post.body}</p>
    </>
  );
}
