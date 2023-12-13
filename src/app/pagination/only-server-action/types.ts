import { MORE, PREV, NEXT } from './constants';

export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
};

export type Comment = {
  id: number;
  body: string;
  author: string;
};

export type Comments = {
  id: number;
  comments: Comment[];
  prev: number | null;
  next: number | null;
};

export type State = {
  comments: Comment[];
  [MORE]: number | null;
  [PREV]: number | null;
  [NEXT]: number | null;
}
