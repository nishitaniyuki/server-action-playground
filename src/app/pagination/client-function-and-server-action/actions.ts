import type { Comments } from "./types";

export async function loadComments(page: number): Promise<Comments>  {
  return await fetch(`http://localhost:3001/comments/${page}`).then(res => res.json());
}
