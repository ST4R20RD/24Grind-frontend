import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEditProfile, useGetUser, useGetUserCards, useUploadImg } from "../../lib/api-hooks";
import { FetchState, User } from "../../utils/types";
import { BiEdit } from "react-icons/bi";
import { FiCamera, FiSave } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { Modal } from "../../components/Modal";
import { Card } from "../../components";
import { useGetUser, useGetUserCards } from "../../lib/api-hooks";
import { CardData, FetchState } from "../../utils/types";

const defaultAvatar = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

export function Profile() {
  const [canSave, setCanSave] = useState<boolean>(false);
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);
  const [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    uploadedURL,
  ] = useUploadImg();

  const { userId } = useParams();
  const userID = Number(userId);
  const CurrentUser = JSON.parse(localStorage.getItem("currentUser") as string) as User;

  const [user, userFetchState, getUser] = useGetUser();
  const [cards, cardFetchState, getCards] = useGetUserCards();

  /* TESTING LOG BEFORE LOGIN FEATURE */
  useEffect(() => {
    if (!user) return;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    getUser(Number(userID)); //login CurrentUser context;
  }, [userID]);

  useEffect(() => {
    userFetchState === FetchState.SUCCESS && user && getCards(user.id);
  }, [userFetchState]);

  const [newUsername, setNewUsername] = useState<string>();
  const handleEditUsername = (e: any) => {
    setNewUsername(e.target.value);
    setCanSave(true);
  };

  const [editError, setEditError, editFetchState, sendNewProfileInfo] = useEditProfile();

  const handleSaveChanges = () => {
    sendNewProfileInfo(CurrentUser.id, newUsername, uploadedURL);
    setCanSave(false);
    setTimeout(() => setEditError(""), 2000);
  };

  useEffect(() => {
    editFetchState === FetchState.SUCCESS && setIsEditing(false);
  }, [editFetchState]);

  return (
    <section className="m-5">
      {userFetchState === FetchState.LOADING && <p>Loading...</p>}
      {userFetchState === FetchState.SUCCESS && user && (
        <div className="">
          {editError && (
            <Modal>
              <div className="bg-red-500/50 p-2 rounded-md">{editError}</div>
            </Modal>
          )}
          <section className="mx-2">
            {userID === CurrentUser.id && (
              <div className="bg-green-200 float-right border py-1 px-2 rounded-lg">
                <span>
                  {!isEditing ? (
                    <button type="button" onClick={() => setIsEditing(true)}>
                      <BiEdit />
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <button className="p-2" onClick={handleSaveChanges} disabled={!canSave}>
                        {canSave ? <FiSave /> : <FiSave color="gray" />}
                      </button>
                      <button
                        className="border-l-2 border-black p-2"
                        type="button"
                        onClick={() => setIsEditing(false)}
                      >
                        <h2>
                          <TiCancel />
                        </h2>
                      </button>
                    </div>
                  )}
                </span>
              </div>
            )}
            <div className="flex">
              <div className="rounded-full overflow-hidden">
                {!isEditing ? (
                  <img
                    className="object-cover w-16 h-16"
                    src={user.UserImg || defaultAvatar}
                    alt="profile pic"
                  />
                ) : (
                  <div className="flex justify-center items-center w-16 h-16 border rounded-full">
                    <button onClick={() => setIsOpenUpload(true)}>
                      {uploadFetchState !== FetchState.SUCCESS ? (
                        <FiCamera />
                      ) : (
                        <img src={uploadedURL} alt="chosen" className="w-72" />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div className="ml-3">
                {!isEditing ? (
                  <h2>{user.username}</h2>
                ) : (
                  <input
                    onChange={handleEditUsername}
                    className="border h-7"
                    placeholder={user.username}
                  />
                )}
                <h3>{user.accountName}</h3>
              </div>
            </div>
          </section>
          <section className="my-4">
            <h1 className="text-center font-bold">Latest Grinds</h1>
            <button className="float-right m-2 text-blue-400">View all</button>
            {user.cards.length !== 0 ? (
              user.cards.map((card: CardData) => {
                return (
                  <article key={card.id}>
                    <Card {...card} />
                  </article>
                );
              })
            ) : (
              <span className="text-center">
                <h1>No Cards to show</h1>
              </span>
            )}
          </section>
          {isOpenUpload && (
            <Modal isOpen={isOpenUpload} setIsOpen={setIsOpenUpload}>
              <div className="bg-slate-300 flex flex-col rounded-lg p-2 m-5">
                {previewSource && (
                  <div className="h-80 w-80 m-5 mb-10">
                    <img src={previewSource} alt="chosen" />
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    handleSubmitFile(e);
                    setIsOpenUpload(false);
                    setCanSave(true);
                  }}
                  className="flex flex-col"
                >
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="shadow-lg p-2 mb-2 rounded-xl"
                  />
                  <button className="border border-blue-900 rounded-full px-4 py-1">OK</button>
                </form>
              </div>
            </Modal>
          )}
        </div>
      )}
      {userFetchState === FetchState.ERROR && !user && <p>Please Log in</p>}
    </section>
  );
}
