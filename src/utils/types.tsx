export enum FetchState {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type CardData = {
  id: number;
  authorId: number;
  duration: string;
  date: string;
  location: string;
  tags: string[];
  category: string;
  attachImage: string;
  description: string;
  participants: {id: number, userImage: string}[];
}

export type User = {
  id: number;
  accountName: string;
  username: string;
  userImage: string;
  cards: Array<CardData>;
}

export type ItemType = {
  id: number;
  name: string;
  accountName?: string;
  img?: string;
};
