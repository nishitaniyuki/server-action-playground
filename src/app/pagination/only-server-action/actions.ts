'use server';

import { MORE, PREV, NEXT } from './constants';
import type { Comments, State } from './types';

type ActionType = typeof MORE | typeof PREV | typeof NEXT;

function isActionType(formEntry: FormDataEntryValue | null): formEntry is ActionType {
  return typeof formEntry === 'string' && [MORE, PREV, NEXT].includes(formEntry);
}

export async function loadComments(state: State, formData: FormData): Promise<State>  {
  const actionType = formData.get('action');
  if (!isActionType(actionType)) {
    return state;
  }

  const page = state[actionType];
  if (!page) {
    return state;
  }

  const payload = await fetch(`http://localhost:3001/comments/${page}`).then(res => res.json()) as Comments;

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
