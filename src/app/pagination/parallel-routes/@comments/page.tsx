import type { Comments as Payload } from "../types";
import CommentList from "./comment-list";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Comments({ searchParams }: Props) {
  const { page: pageParam } = searchParams;
  let page = 1;
  if (typeof pageParam === 'string') {
    const parsedPageParam = parseInt(pageParam, 10);
    if (!isNaN(parsedPageParam)) {
      page = parsedPageParam;
    }
  }

  const payload = await fetch(`http://localhost:3001/comments/${page}`).then(res => res.json()) as Payload;


  return (
    <CommentList key={page} payload={payload} />
  );
}
