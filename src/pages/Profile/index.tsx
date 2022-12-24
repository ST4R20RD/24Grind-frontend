import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEditProfile, useGetUser, useUploadImg } from "../../lib/api-hooks";
import { CardData, FetchState, User } from "../../utils/types";
import { BiEdit } from "react-icons/bi";
import { FiCamera, FiSave } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { Card, Modal, Upload } from "../../components";
import { RotatingLines } from "react-loader-spinner";

export function Profile() {
  const [canSave, setCanSave] = useState<boolean>(false);
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);
  const [
    uploadFetchState,
    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    clear,
  ] = useUploadImg();

  const { userId } = useParams();
  const userID = Number(userId);
  const CurrentUser = JSON.parse(localStorage.getItem("currentUser") as string) as User;

  const [user, userFetchState, getUser] = useGetUser();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    getUser(userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  const [newUsername, setNewUsername] = useState<string>();
  const handleEditUsername = (e: any) => {
    setNewUsername(e.target.value);
    setCanSave(true);
  };

  const [editError, setEditError, editFetchState, sendNewProfileInfo] = useEditProfile();

  const handleSaveChanges = async () => {
    const file = await handleSubmitFile();
    sendNewProfileInfo(CurrentUser.id, newUsername, file);
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
    clear();
    setCanSave(false);
  };

  useEffect(() => {
    if (editFetchState === FetchState.SUCCESS) {
      setIsEditing(false);
      setCanSave(false);
      getUser(CurrentUser.id);
      setTimeout(() => setEditError(""), 2000);
    }
  }, [editFetchState]);

  useEffect(() => {
    if (previewSource === "") return;
    setCanSave(true);
  }, [previewSource]);

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
                        {canSave ? (
                          uploadFetchState === FetchState.LOADING ? (
                            <RotatingLines
                              strokeColor="grey"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="16"
                              visible={true}
                            />
                          ) : (
                            <FiSave />
                          )
                        ) : (
                          <FiSave color="gray" />
                        )}
                      </button>
                      <button
                        className="border-l-2 border-black p-2"
                        type="button"
                        onClick={handleCancelChanges}
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
                  <img className="object-cover w-16 h-16" src={user.image} alt="profile pic" />
                ) : (
                  <div className="flex justify-center items-center w-16 h-16 border rounded-full">
                    <button onClick={() => setIsOpenUpload(true)}>
                      {previewSource === "" ? (
                        <FiCamera />
                      ) : (
                        <img
                          className="object-contain w-16 h-16"
                          src={previewSource}
                          alt="chosen"
                        />
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
                    <Card {...card} author={user} />
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
            <Upload
              isOpenUpload={isOpenUpload}
              setIsOpenUpload={setIsOpenUpload}
              handleSubmitFile={handleSubmitFile}
              handleFileInputChange={handleFileInputChange}
              fileInputState={fileInputState}
              previewSource={previewSource}
            />
          )}
        </div>
      )}
      {userFetchState === FetchState.ERROR && !user && <p>Please Log in</p>}
    </section>
  );
}
