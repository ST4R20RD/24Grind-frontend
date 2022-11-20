export enum FetchState {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type CardData = {
  id: number;
  author: User;
  duration: string;
  day: string;
  location: string;
  category: string;
  image: string;
  description: string;
  participants: User[];
};

export type User = {
  id: number;
  accountName: string;
  email: string;
  username: string;
  image: string;
  cards: Array<CardData>;
};

export type ItemType = {
  id: number;
  name: string;
  accountName?: string;
  img?: string;
};
