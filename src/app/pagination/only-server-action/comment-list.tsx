'use client';

import { useFormState } from 'react-dom';

import { loadComments } from './actions';
import { MORE, PREV, NEXT } from './constants';
import type { State } from './types';

type Props = {
  initialState: State;
};

export default function CommentList({ initialState }: Props) {
  const [formState, action] = useFormState<State, FormData>(loadComments, initialState);

  return (
    <form action={action}>
      <ul className="list-disc mt-12">
        {formState.comments.map(({ id, body, author }) => (
          <li key={id}>{`"${body}"`} by {author}</li>
        ))}
      </ul>

      <div className="isolate inline-flex -space-x-px rounded-md mt-12">
        <button type="submit" name="action" value={PREV} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          {`<`}
        </button>
        <button type="submit" name="action" value={MORE} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          load more
        </button>
        <button type="submit" name="action" value={NEXT} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          {`>`}
        </button>
      </div>
    </form>
  )
}
