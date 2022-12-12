import React, { useEffect, useState } from "react";
import { client } from "../client";
import { CardData, FetchState, User } from "../utils/types";
import FormData from "form-data";

export function useGetFeed() {
  const [feedFetchState, setFeedFetchState] = useState(FetchState.LOADING);
  const [cards, setCards] = useState<Array<CardData>>([]);
  const getCards = async () => {
    try {
      setFeedFetchState(FetchState.LOADING);

      const res = await client.get("/v1/cards");
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
  const getUser = async (userId: number) => {
    try {
      setUserFetchState(FetchState.LOADING);

      const res = await client.get(`/v1/users/${userId}`);
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

      const res = await client.get("/v1/users", { params: { search: search } });
      const resData = res.data as Array<User>;

      setUsers(resData);
      setSearchFetchState(FetchState.SUCCESS);
    } catch (error) {
      setSearchFetchState(FetchState.ERROR);
    }
  };
  return [users, searchFetchState, getSearchUsers] as const;
}

export function useGetCard() {
  const [cardFetchState, setCardFetchState] = useState(FetchState.LOADING);
  const [card, setCard] = useState<CardData>();
  const getCard = async (id: number) => {
    try {
      setCardFetchState(FetchState.LOADING);

      const res = await client.get(`/v1/cards/${id}`);
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
    day: string,
    description: string,
    category?: string,
    location?: string,
    participantsId?: number[],
    image?: string
  ) => {
    try {
      setPostFetchState(FetchState.LOADING);

      await client.post(`/v1/users/${authorId}/cards`, {
        duration,
        day,
        description,
        category,
        location,
        participantsId,
        image,
      });

      setPostFetchState(FetchState.SUCCESS);
    } catch (error: any) {
      setPostError(error.response.data.message);
      setPostFetchState(FetchState.ERROR);
    }
  };

  return [postError, postFetchState, postCard] as const;
}

export function useUploadImg() {
  const [uploadFetchState, setUploadFetchState] = useState(FetchState.LOADING);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setFileInputState("");
    };
  };

  const clearPreviewSource = () => {
    setPreviewSource("");
  };

  const handleSubmitFile = async () => {
    if (!selectedFile) return;
    return await uploadImage(selectedFile);
  };

  const uploadImage = async (file: any) => {
    try {
      setUploadFetchState(FetchState.LOADING);

      const formData = new FormData();
      formData.append("file", file);

      const res = await client.post("/v1/upload", formData, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
      });
      const resData = res.data.eager[0].secureUrl as string;

      setUploadFetchState(FetchState.SUCCESS);
      clearPreviewSource();
      return resData;
    } catch (err) {
      console.error(err);
      setUploadFetchState(FetchState.ERROR);
    }
  };

  return [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    clearPreviewSource,
  ] as const;
}

export function useEditProfile() {
  const [editFetchState, setEditFetchState] = useState(FetchState.LOADING);
  const [editError, setEditError] = useState<any>();
  const sendNewProfileInfo = async (
    userId: number,
    username?: string,
    image?: string
  ) => {
    try {
      setEditFetchState(FetchState.LOADING);

      await client.post(`/v1/users/${userId}`, {
        username,
        image,
      });

      setEditFetchState(FetchState.SUCCESS);
    } catch (error: any) {
      setEditError(error.response.data.message);
      setEditFetchState(FetchState.ERROR);
    }
  };

  return [editError, setEditError, editFetchState, sendNewProfileInfo] as const;
}
