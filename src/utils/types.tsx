export enum FetchState {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type CardData = {
  id: number;
  authorId: number;
  date: string;
  location: string;
  tags: string;
  category: string;
  description: string;
  groupName: Group["name"];
  participantsIds: Array<number>;
}

export type User = {
  id: number;
  accountName: string;
  username: string;
  UserImg: string /* || .png/.jpg/... */;
  groupsIds: number[];
  CardsIds: number[];
}

export type Group = {
  id: number;
  name: string;
  membersIds: Array<number>;
  categories: {icon:string, name:string}[];
}
