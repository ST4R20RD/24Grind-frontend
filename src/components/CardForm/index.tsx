import React, { useState, useEffect } from "react";
import { FetchState, ItemType, User } from "../../utils/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetSearchUsers,
  useGetUser,
  usePostCard,
} from "../../lib/api-hooks";
import { TextError } from "./TextError";
import * as Yup from "yup";
import { getCurrentDate } from "./getCurrentDate";
import { FormBtnDrop } from "./FormBtnDrop";
import { BiImageAdd } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CATEGORIES_LIST = [
  { id: 1, name: "Phisical" },
  { id: 2, name: "Mental Lab" },
  { id: 3, name: "Reading" },
  { id: 4, name: "Domestic Tasks" },
];
export interface CardFormProps {
  setIsOpenUpload: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFetchState: FetchState;
  previewSource: any;
  handleSubmitFile: any;
}

type Values = {
  duration: string;
  description: string;
  location: string;
};

const initialValues = {
  duration: "",
  description: "",
  location: "",
};

const notOnlyDigits = (value: any) => /(?!^\d+$)^.+$/.test(value);

const validationSchema = Yup.object().shape({
  duration: Yup.string().required("Duration Required"),
  description: Yup.string().required("Description Required"),
  location: Yup.string().test(
    "Not digits only",
    "Location should not be just numbers",
    notOnlyDigits
  ),
});

export function CardForm({
  setIsOpenUpload,
  uploadFetchState,
  previewSource,
  handleSubmitFile,
}: CardFormProps) {
  const [user, userFetchState, getUser] = useGetUser();

  const CurrentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as User;

  useEffect(() => {
    getUser(CurrentUser.id); //Current User Id from localstorage
  }, []);

  const [users, searchFetchState, getSearchUsers] = useGetSearchUsers();

  const [postError, postFetchState, postCard] = usePostCard();

  const [isShared, setIsShared] = useState<boolean>(false);
  let navigate = useNavigate();

  const date = getCurrentDate();

  const [selectedCategory, setSelectedCategory] = useState<ItemType>();
  const category = selectedCategory?.name;

  const [selectedParticipants, setSelectedParticipants] = useState<ItemType[]>(
    []
  );
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
        img: user.image,
      };
    });

  const onSubmit = async ({ duration, description, location }: Values) => {
    if (user) {
      const file = await handleSubmitFile();
      postCard(
        user.id,
        duration,
        date,
        description,
        category,
        location,
        participantsIds,
        file
      );
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <section className="flex flex-wrap items-center justify-center">
            <div className="flex items-center justify-center h-40">
              <div className="w-40 h-full flex items-center justify-center bg-slate-50 rounded-lg border border-slate-800 dark:border-slate-500 my-5 px-1 py-2">
                <button
                  type="button"
                  onClick={() => setIsOpenUpload(true)}
                  className="text-5xl w-full h-full"
                >
                  {previewSource === "" ? (
                    <BiImageAdd className="m-auto" />
                  ) : (
                    <img
                      src={previewSource}
                      alt="chosen"
                      className="w-full h-full object-contain"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="my-2">
              <div className="m-1 bg-slate-50 border border-slate-800 dark:border-slate-500 rounded-full">
                <div className="flex items-center justify-between mx-1 p-1">
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Location"
                    className="px-2 py-1 bg-transparent outline-none"
                  />
                  <span>
                    <MdLocationOn />
                  </span>
                </div>
              </div>
              <div className="my-1 p-3 bg-slate-50 border border-slate-800 dark:border-slate-500 rounded-full">
                <div className="text-center w-full">
                  <label className="px-2" htmlFor="duration">
                    Grind Duration
                  </label>
                  <Field
                    type="time"
                    id="duration"
                    name="duration"
                    className="bg-transparent outline-none text-center border-b-2"
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="my-2 bg-slate-50 border-y border-slate-800 dark:border-slate-500">
            <div className="p-3">
              <Field
                as="textarea"
                id="description"
                name="description"
                className="resize-none w-full h-[8vh] overflow-scroll bg-transparent outline-none"
                placeholder="Description"
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
            type="submit"
            className={`float-right bg-blue-900 text-slate-200 w-fit m-5 text-left shadow-sm shadow-slate-900 rounded-full px-4 py-1 ${
              isShared && "animate-pulse"
            }`}
          >
            <h1>Share</h1>
          </button>
          <div className="flex my-2 flex-wrap">
            <ErrorMessage name="duration" component={TextError} />
            <ErrorMessage name="description" component={TextError} />
            <ErrorMessage name="location" component={TextError} />
          </div>
        </Form>
      </Formik>
    </section>
  );
}
