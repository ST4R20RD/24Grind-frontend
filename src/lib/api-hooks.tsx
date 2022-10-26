import React, { useState } from "react";
import { client } from "../client";
import { CardData, FetchState, User } from "../utils/types";

export function useGetFeed() {
  const [feedFetchState, setFeedFetchState] = useState(FetchState.LOADING);
  const [cards, setCards] = useState<Array<CardData>>([]);
  const getCards = async () => {
    try {
      setFeedFetchState(FetchState.LOADING);

      const res = await client.get("/cards");
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

      const res = await client.get(`/users/${userId}`);
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

      const res = await client.get("/users", { params: { search: search } });
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

      const res = await client.get(`/users/${userId}/cards`);
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

      const res = await client.get(`/cards/${id}`);
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

      await client.post(`/cards`, {
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

export function useUploadImg() {
  const [uploadFetchState, setUploadFetchState] = useState(FetchState.LOADING);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [uploadedURL, setUploadedURL] = useState<string>("");
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
    };
  };

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setUploadFetchState(FetchState.ERROR);
    };
  };

  const uploadImage = async (base64EncodedImage: any) => {
    try {
      setUploadFetchState(FetchState.LOADING);

      const res = await client.post("/upload", {
        method: "POST",
        body: base64EncodedImage,
        headers: { "Content-Type": "application/json" },
      });
      const resData = res.data.url as string;
      console.log({ res });

      setUploadedURL(resData);
      setFileInputState("");
      setPreviewSource("");

      setUploadFetchState(FetchState.SUCCESS);
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
    uploadedURL,
  ] as const;
}

export function useEditProfile() {
  const [editFetchState, setEditFetchState] = useState(FetchState.LOADING);
  const [editError, setEditError] = useState<any>();
  const sendNewProfileInfo = async (userId: number, newUsername?: string, uploadedImg?: string) => {
    try {
      setEditFetchState(FetchState.LOADING);

      await client.put(`/users/${userId}`, {
        newUsername,
        uploadedImg,
      });

      setEditFetchState(FetchState.SUCCESS);
    } catch (error: any) {
      setEditError(error.response.data.message);
      setEditFetchState(FetchState.ERROR);
    }
  };

  return [editError, setEditError, editFetchState, sendNewProfileInfo] as const;
}
