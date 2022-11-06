import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useGetSearchUsers, useGetUser, usePostCard } from "../../lib/api-hooks";
import { FetchState, ItemType, User } from "../../utils/types";
import { Modal } from "../Modal";
import { FormBtnDrop } from "./FormBtnDrop";
import { getCurrentDate } from "./getCurrentDate";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CATEGORIES_LIST = [
  { id: 1, name: "Phisical" },
  { id: 2, name: "Mental Lab" },
  { id: 3, name: "Reading" },
  { id: 4, name: "Domestic Tasks" },
];

interface CardFormProps {
  setIsOpenUpload: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFetchState: FetchState;
  uploadedURL: string;
}

export function CardForm({setIsOpenUpload, uploadFetchState, uploadedURL}:CardFormProps) {
  
  const [isShared, setIsShared] = useState<boolean>(false);
  let navigate = useNavigate();

  const date = getCurrentDate();
  const [duration, setDuration] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ItemType>();
  const [selectedParticipants, setSelectedParticipants] = useState<ItemType[]>([]);

  const [user, userFetchState, getUser] = useGetUser();
  const [postError, postFetchState, postCard] = usePostCard();

  const [users, searchFetchState, getSearchUsers] = useGetSearchUsers();

  const CurrentUser = JSON.parse(localStorage.getItem('currentUser') as string) as User;

  useEffect(() => {
    getUser(CurrentUser.id); //Current User Id from localstorage
  }, []);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const category = selectedCategory?.name;

  const participantsIds = selectedParticipants.map((participant: ItemType) => {
    return participant.id;
  });

  const usersList = users
    .filter((user) => {
      if (participantsIds.includes(user.id)) return false;
      return true;
    })
    .map((user) => {
      return {
        id: user.id,
        name: user.username,
        accountName: user.accountName,
        img: user.userImage,
      };
    });

  /* DEBUG LOG */
  /* useEffect(() => {
    console.log(
      { date },
      { duration },
      { description },
      { location },
      { selectedCategory },
      { participantsIds }
    );
  }, [
    date,
    duration,
    description,
    location,
    selectedCategory,
    participantsIds,
  ]); */

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (user && description && duration) {
      postCard(user.id, duration, date, description, category, location, participantsIds, uploadedURL);
      setIsShared(true);
    }
  };

  useEffect(() => {
    if (postFetchState === FetchState.SUCCESS) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [postFetchState, postError, navigate]);

  return (
    <section className="text-black my-4">
      <form onSubmit={handleSubmit}>
        {postError && (
          <Modal>
            <div className="bg-red-500/50 p-2 rounded-md">{postError}</div>
          </Modal>
        )}
        <section className="flex flex-wrap items-center justify-center">
          <div className="flex items-center justify-center h-40">
            <div className="w-40 h-full flex items-center justify-center bg-slate-50 rounded-lg border border-slate-800 dark:border-slate-500 my-5 px-1 py-2">
              <button type="button" onClick={() => setIsOpenUpload(true)} className="text-5xl">
                {uploadFetchState !== FetchState.SUCCESS ? (
                  <BiImageAdd />
                ) : (
                  <img src={uploadedURL} alt="chosen" className="w-72" />
                )}
              </button>
            </div>
          </div>
          <div className="my-2">
            <div className="m-1 bg-slate-50 border border-slate-800 dark:border-slate-500 rounded-full">
              <div className="flex items-center justify-between mx-1 p-1">
                <input
                  onChange={handleLocationChange}
                  placeholder="Grind Location"
                  className="px-2 py-1 bg-transparent outline-none"
                />
                <span>
                  <MdLocationOn />
                </span>
              </div>
            </div>
            <div className="my-1 p-3 bg-slate-50 border border-slate-800 dark:border-slate-500 rounded-full">
              <div className="text-center w-full">
                <label className="px-2">Grind Duration</label>
                <input
                  type="time"
                  onChange={handleDurationChange}
                  defaultValue="00:00"
                  placeholder="Grind Duration"
                  className="bg-transparent outline-none text-center border-b-2"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="my-2 bg-slate-50 border-y border-slate-800 dark:border-slate-500">
          <div className="p-3">
            <textarea
              onChange={handleDescriptionChange}
              placeholder="Grind Description"
              className="resize-none w-full h-[8vh] overflow-scroll bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="h-50">
          <FormBtnDrop
            label="Add Category"
            list={CATEGORIES_LIST}
            searchBar={false}
            multiple={false}
            icon="Categ"
            value={selectedCategory}
            setValue={setSelectedCategory}
          />
          <FormBtnDrop
            label="Add Participants"
            list={usersList}
            searchBar={true}
            getSearchResult={getSearchUsers}
            multiple={true}
            multiValue={selectedParticipants}
            setMultiValue={setSelectedParticipants}
          />
        </div>
        <button
          className={`float-right bg-blue-900 text-slate-200 w-fit m-5 text-left shadow-sm shadow-slate-900 rounded-full px-4 py-1 ${
            isShared && "animate-pulse"
          }`}
        >
          <h1>Share</h1>
        </button>
      </form>
    </section>
  );
}
