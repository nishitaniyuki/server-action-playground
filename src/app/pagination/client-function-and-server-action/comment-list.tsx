'use client';

import { useFormState } from 'react-dom';

import { loadComments } from './actions';
import type { Comment } from './types';

const MORE = 'more';
const PREV = 'prev';
const NEXT = 'next';

type ActionType = typeof MORE | typeof PREV | typeof NEXT;

function isActionType(formEntry: FormDataEntryValue | null): formEntry is ActionType {
  return typeof formEntry === 'string' && [MORE, PREV, NEXT].includes(formEntry);
}

type State = {
  comments: Comment[];
  [MORE]: number | null;
  [PREV]: number | null;
  [NEXT]: number | null;
}

async function reducer(state: State, formData: FormData): Promise<State> {
  const actionType = formData.get('action');
  if (!isActionType(actionType)) {
    return state;
  }

  const page = state[actionType];
  if (!page) {
    return state;
  }

  const payload = await loadComments(page);

  switch (actionType) {
    case MORE: {
      const { comments, next } = payload;
      return {
        ...state,
        comments: [
          ...state.comments,
          ...comments,
        ],
        more: next,
      };
    }

    case PREV:
    case NEXT: {
      const { comments, prev, next } = payload;
      return {
        comments,
        more: next,
        prev,
        next,
      };
    }
  }
}

type Props = {
  initialState: State;
};

export default function CommentList({ initialState }: Props) {
  const [formState, action] = useFormState(reducer, initialState);

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
