import { useState } from "react";
import { client } from "../client";
import { CardData, FetchState, User } from "../utils/types";

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
