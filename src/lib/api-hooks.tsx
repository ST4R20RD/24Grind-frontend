import { useState } from "react";
import { client } from "../client";
import { CardData, FetchState, Group, User } from "../utils/types";

export function useGetFeed() {
  const [fetchState, setFetchState] = useState(FetchState.LOADING);
  const [cards, setCards] = useState<Array<CardData>>([]);
  const getCards = async () => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await client.get("/getFeed");
      const resData = res.data as Array<CardData>;

      setCards(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };
  return [cards, fetchState, getCards] as const;
}

export function useGetUser() {
  const [fetchState, setFetchState] = useState(FetchState.LOADING);
  const [user, setUser] = useState<User>();
  const getUser = async (id: number) => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await client.get(`/getUser/${id}`);
      const resData = res.data as User;

      setUser(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (error) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [user, fetchState, getUser] as const;
}

export function useGetCard() {
  const [fetchState, setFetchState] = useState(FetchState.LOADING);
  const [card, setCard] = useState<CardData>();
  const getCard = async (id: number) => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await client.get(`/getCard/${id}`);
      const resData = res.data as CardData;

      setCard(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (error) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [card, fetchState, getCard] as const;
}

export function useGetGroup() {
  const [fetchState, setFetchState] = useState(FetchState.LOADING);
  const [group, setGroup] = useState<Group>();
  const getGroup = async (id: number) => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await client.get(`/getGroup/${id}`);
      const resData = res.data as Group;

      setGroup(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (error) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [group, fetchState, getGroup] as const;
}
