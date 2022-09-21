import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useGetUser, usePostCard } from "../../lib/api-hooks";
import { FetchState } from "../../utils/types";
import { defaultAvatar } from "../Card";
import { Modal } from "../Modal";
import { FormBtnDrop } from "./FormBtnDrop";

export function getCurrentDate(separator = "-") {
  let newDate = new Date();
  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${hour}:${minutes} ${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

const mockLocations = [
  { id: 1, name: "Quinta da Alagoa" },
  { id: 2, name: "S. Domingos Rana" },
  { id: 3, name: "Em casa" },
];
const mockGroups = [
  { id: 1, name: "Group1" },
  { id: 2, name: "Group2" },
  { id: 3, name: "Group3" },
];
const mockParticipants = [
  { id: 1, name: "User1" },
  { id: 2, name: "User2" },
  { id: 3, name: "User3" },
];
const mockCategories = [
  { id: 1, name: "Phisical" },
  { id: 2, name: "Computer" },
  { id: 3, name: "Book" },
];

interface CardFormProps {
  togglePopup: () => void;
}

export function CardForm({ togglePopup }: CardFormProps) {
  const [isGroupSelected, setIsGroupSelected] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  const date = getCurrentDate();
  const [duration, setDuration] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [group, setGroup] = useState<any>();
  const [participants, setParticipants] = useState<any[]>([]);

  const [user, userFetchState, getUser] = useGetUser();
  const [postError, setPostError, postFetchState, postCard] = usePostCard();

  useEffect(() => {
    getUser(2); //from login context
  }, []);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const participantsIds = participants.map((participant) => {
    return participant.id;
  });

  useEffect(() => {
    console.log(
      { date },
      { duration },
      { description },
      { location },
      { category },
      { group },
      { participantsIds }
    );
  }, [date, duration, description, location, category, group, participantsIds]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log({ group });

    if (user && description && duration) {
      postCard(
        user.id,
        duration,
        date,
        location,
        category,
        description,
        group?.id,
        participantsIds
      );
    } else {
      setPostError("Card must at least have a description and a duration");
      !duration && description && setPostError("Card must have a duration");
      !description && duration && setPostError("Card must have a description");
      setTimeout(() => setPostError(""), 2000);
    }
  };

  useEffect(() => {
    console.log({ postFetchState });
    console.log({ postError });

    if (postFetchState === FetchState.SUCCESS) {
      togglePopup();
      setIsShared(true);
    }
  }, [postFetchState, postError, togglePopup]);

  return (
    <section className="w-[90vw] h-[540px] bg-slate-300 dark:bg-slate-800 rounded-3xl dark:text-gray-200">
      <button className="float-right text-3xl p-2" onClick={togglePopup}>
        <IoCloseCircle />
      </button>
      <form className="h-full" onSubmit={handleSubmit}>
        <header className="p-5">
          <div className="flex items-center">
            <span className="text-lg inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <img
                className="object-cover h-full"
                src={user?.UserImg || defaultAvatar}
                alt="profile pic"
              />
            </span>
            <div className="pl-2 ">
              {user && user.username.length <= 19 ? (
                <h2>{user.username}</h2>
              ) : (
                <h3>{user?.username}</h3>
              )}
            </div>
          </div>
        </header>
        {postError && (
          <Modal>
            <div className="bg-red-500/50 p-2 rounded-md">{postError}</div>
          </Modal>
        )}
        <div className="border-t border-slate-800 dark:border-slate-500 p-3">
          <div className="text-center w-full my-2 -mx-2">
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
        <div className="border-y border-slate-800 dark:border-slate-500">
          <div className="p-3">
            <input
              onChange={handleDescriptionChange}
              placeholder="Grind Description"
              className="bg-transparent outline-none my-2"
            />
          </div>
        </div>
        <div className="pt-2 h-56">
          <button className="w-full border-y border-slate-800 dark:border-slate-500 mt-2 p-1 text-left">
            <h3>Add Image</h3>
          </button>
          <FormBtnDrop
            label="Add Location"
            list={mockLocations}
            multiple={false}
            icon="Locat"
            setValue={setLocation}
          />
          <FormBtnDrop
            label="Add Category"
            list={mockCategories}
            multiple={false}
            icon="Categ"
            setValue={setCategory}
          />
          <FormBtnDrop
            label={"Add Group"}
            list={mockGroups}
            multiple={false}
            icon="Group"
            setIsGroupSelected={setIsGroupSelected}
            setValue={setGroup}
          />
          {isGroupSelected && (
            <FormBtnDrop
              label="Add Participants"
              list={mockParticipants}
              multiple={true}
              setMultiValue={setParticipants}
            />
          )}
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
