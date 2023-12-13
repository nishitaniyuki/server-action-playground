import type { Comment, Comments as Payload } from "../types";

export type State = {
  comments: Comment[];
  next: number | null;
} 

export async function loadComments(state: State): Promise<State>  {
  if (!state.next) {
    return state;
  }

  const { comments, next } = await fetch(`http://localhost:3001/comments/${state.next}`).then(res => res.json()) as Payload;

  return {
    comments: [
      ...state.comments,
      ...comments,
    ],
    next,
  };
}
