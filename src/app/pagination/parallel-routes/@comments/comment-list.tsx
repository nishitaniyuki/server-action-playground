'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';

import type { Comments as Payload } from "../types";
import { loadComments } from './actions';
import type { State } from './actions';

type Props = {
  payload: Payload;
}

export default function CommentList({ payload }: Props) {
  const [formState, action] = useFormState<State>(loadComments, {
    comments: payload.comments,
    next: payload.next,
  });

  return (
    <form action={action}>
      <ul className="list-disc mt-12">
        {formState.comments.map(({ id, body, author }) => (
          <li key={id}>{`"${body}"`} by {author}</li>
        ))}
      </ul>

      <div className="isolate inline-flex -space-x-px rounded-md mt-12">
        {
          payload.prev ? (
            <Link href={`/pagination/parallel-routes?page=${payload.prev}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {`<`}
            </Link>
          ) : (
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {`<`}
            </span>
          )
        }

        <button type="submit" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          load more
        </button>

        {
          payload.next ? (
            <Link href={`/pagination/parallel-routes?page=${payload.next}`} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {`>`}
            </Link>
          ) : (
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              {`>`}
            </span>
          )
        }
      </div>
    </form>
  );
}
