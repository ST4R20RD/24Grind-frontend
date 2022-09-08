export enum FetchState {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type CardData = {
  id: number;
  author: User["id"];
  date: string;
  location: string;
  tags: string;
  category: string;
  description: string;
  groupName: Group["name"];
  participants: Array<User["id"]>;
}

export type User = {
  id: number;
  username: string;
  UserImg: string /* || .png/.jpg/... */;
  groups: Array<Group>;
  Cards: Array<CardData["id"]>;
}

export type Group = {
  name: string;
  members: Array<User["id"]>;
  categories: Array<string>;
}
