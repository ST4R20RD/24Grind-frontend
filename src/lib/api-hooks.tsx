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

export function useGetUserGroups() {
  const [feedFetchState, setFeedFetchState] = useState(FetchState.LOADING);
  const [groups, setGroups] = useState<Array<Group>>([]);
  const getGroups = async (userId: number) => {
    try {
      setFeedFetchState(FetchState.LOADING);

      const res = await client.get(`/getUserGroups/${userId}`);
      const resData = res.data as Array<Group>;

      setGroups(resData);
      setFeedFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFeedFetchState(FetchState.ERROR);
    }
  };
  return [groups, feedFetchState, getGroups] as const;
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
    reader.onerror = (err) => {
      console.log(err);
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