import { useState } from "react";
import { client } from "../client";
import { CardData, FetchState, Group, User } from "../utils/types";

export function useGetFeed() {
  const [feedFetchState, setFeedFetchState] = useState(FetchState.LOADING);
  const [cards, setCards] = useState<Array<CardData>>([]);
  const getCards = async () => {
    try {
      setFeedFetchState(FetchState.LOADING);

      const res = await client.get("/getFeed");
      const resData = res.data as Array<CardData>;

      setCards(resData);
      setFeedFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFeedFetchState(FetchState.ERROR);
    }
  };
  return [cards, feedFetchState, getCards] as const;
}

export function useGetUser() {
  const [userFetchState, setUserFetchState] = useState(FetchState.LOADING);
  const [user, setUser] = useState<User>();
  const getUser = async (id: number) => {
    try {
      setUserFetchState(FetchState.LOADING);

      const res = await client.get(`/getUser/${id}`);
      const resData = res.data as User;

      setUser(resData);
      setUserFetchState(FetchState.SUCCESS);
    } catch (error) {
      setUserFetchState(FetchState.ERROR);
    }
  };

  return [user, userFetchState, getUser] as const;
}

export function useGetSearchUsers() {
  const [searchFetchState, setSearchFetchState] = useState(FetchState.LOADING);
  const [users, setUsers] = useState<User[]>([]);
  const getSearchUsers = async (search?: string) => {
    try {
      setSearchFetchState(FetchState.LOADING);
      
      const res = await client.get('/users', {params: {search: search}});
      const resData = res.data as Array<User>;

      setUsers(resData);
      setSearchFetchState(FetchState.SUCCESS);
    } catch (error) {
      setSearchFetchState(FetchState.ERROR);
    }
  };
  return [users, searchFetchState, getSearchUsers] as const;
}

export function useGetUserCards() {
  const [feedFetchState, setFeedFetchState] = useState(FetchState.LOADING);
  const [cards, setCards] = useState<Array<CardData>>([]);
  const getCards = async (userId: number) => {
    try {
      setFeedFetchState(FetchState.LOADING);

      const res = await client.get(`/getUserCards/${userId}`);
      const resData = res.data as Array<CardData>;

      setCards(resData);
      setFeedFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFeedFetchState(FetchState.ERROR);
    }
  };
  return [cards, feedFetchState, getCards] as const;
}

export function useGetCard() {
  const [cardFetchState, setCardFetchState] = useState(FetchState.LOADING);
  const [card, setCard] = useState<CardData>();
  const getCard = async (id: number) => {
    try {
      setCardFetchState(FetchState.LOADING);

      const res = await client.get(`/getCard/${id}`);
      const resData = res.data as CardData;

      setCard(resData);
      setCardFetchState(FetchState.SUCCESS);
    } catch (error) {
      setCardFetchState(FetchState.ERROR);
    }
  };

  return [card, cardFetchState, getCard] as const;
}

export function usePostCard() {
  const [postFetchState, setPostFetchState] = useState(FetchState.LOADING);
  const [postError, setPostError] = useState<any>();
  const postCard = async (
    authorId: number,
    duration: string,
    date: string,
    description: string,
    category?: string,
    location?: string,
    participantsId?: number[],
    attachImg?: string
  ) => {
    try {
      setPostFetchState(FetchState.LOADING);

      await client.post(`/postCard`, {
        authorId,
        duration,
        date,
        description,
        category,
        location,
        participantsId,
        attachImg,
      });

      setPostFetchState(FetchState.SUCCESS);
    } catch (error: any) {
      setPostError(error.response.data.message);
      setPostFetchState(FetchState.ERROR);
    }
  };

  return [postError, setPostError, postFetchState, postCard] as const;
}

export function useGetUserGroups() {
  const [groupsFetchState, setGroupsFetchState] = useState(FetchState.LOADING);
  const [groups, setGroups] = useState<Array<Group>>([]);
  const getGroups = async (userId: number) => {
    try {
      setGroupsFetchState(FetchState.LOADING);

      const res = await client.get(`/getUserGroups/${userId}`);
      const resData = res.data as Array<Group>;

      setGroups(resData);
      setGroupsFetchState(FetchState.SUCCESS);
    } catch (err) {
      setGroupsFetchState(FetchState.ERROR);
    }
  };
  return [groups, groupsFetchState, getGroups] as const;
}

export function useGetGroup() {
  const [groupFetchState, setGroupFetchState] = useState(FetchState.LOADING);
  const [group, setGroup] = useState<Group>();
  const getGroup = async (id: number) => {
    try {
      setGroupFetchState(FetchState.LOADING);

      const res = await client.get(`/getGroup/${id}`);
      const resData = res.data as Group;

      setGroup(resData);
      setGroupFetchState(FetchState.SUCCESS);
    } catch (error) {
      setGroupFetchState(FetchState.ERROR);
    }
  };

  return [group, groupFetchState, getGroup] as const;
}
