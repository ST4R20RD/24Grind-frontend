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
  attachImg: string;
  description: string;
  groupName: Group["name"];
  participants: {id: number, UserImg: string}[];
}

export type User = {
  id: number;
  accountName: string;
  username: string;
  UserImg: string;
  groupsIds: number[];
  CardsIds: number[];
}

export type Group = {
  id: number;
  name: string;
  membersIds: Array<number>;
  categories: string[];
}

export type ItemType = {
  id: number;
  name: string;
  accountName?: string;
  img?: string;
};
