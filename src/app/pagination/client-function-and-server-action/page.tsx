import CommentList from "./comment-list";
import type { Post, Comments } from "./types";

export default async function ClientFunctionAndServerAction() {
  const [post, comments] = await Promise.all([
    fetch('http://localhost:3001/posts/1').then(res => res.json()) as Promise<Post>,
    fetch('http://localhost:3001/comments/1').then(res => res.json()) as Promise<Comments>,
  ]);

  const commentListInitialState = {
    comments: comments.comments,
    more: comments.next,
    prev: comments.prev,
    next: comments.next,
  };

  return (
    <main className="p-24">
      <h1 className="mb-3 text-2xl font-semibold">
        {`"${post.title}" by ${post.author}`}
      </h1>
      <p>{post.body}</p>

      <CommentList initialState={commentListInitialState} />
    </main>
  );
}
