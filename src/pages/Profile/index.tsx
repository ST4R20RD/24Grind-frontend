import React, { useEffect } from "react";
import {
  useGetUser,
  useGetUserCards,
  useGetUserGroups,
} from "../../lib/api-hooks";
import { CardData, FetchState } from "../../utils/types";

const defaultAvatar =
  "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

export function Profile() {
  const [user, userFetchState, getUser] = useGetUser();
  const [groups, groupFetchState, getGroups] = useGetUserGroups();
  const [cards, cardFetchState, getCards] = useGetUserCards();

  useEffect(() => {
    getUser(1); //login CurrentUser context;
  }, []);

  useEffect(() => {
    userFetchState === FetchState.SUCCESS && user && getCards(user.id);
  }, [userFetchState]);

  useEffect(() => {
    userFetchState === FetchState.SUCCESS && user && getGroups(user.id);
  }, [userFetchState]);

  return (
    <>
      {userFetchState === FetchState.LOADING && <p>Loading...</p>}
      {userFetchState === FetchState.SUCCESS && (
        <div className="">
          <section className="mx-2">
            <div className="flex">
              <div className="rounded-full overflow-hidden">
                <img
                  className="object-cover w-16 h-16"
                  src={user?.UserImg || defaultAvatar}
                  alt="profile pic"
                />
              </div>
              <h2 className="ml-3">{user?.username}</h2>
            </div>
            <div className="m-2">
              <h2>Echo chambers</h2>
              {groups.map((group) => (
                <button
                  className="bg-gray-500 rounded-full p-1 flex"
                  key={group.id}
                >
                  <img
                    className="w-4 rounded-full"
                    src="https://geodash.gov.bd/uploaded/people_group/default_group.png"
                    alt="group pic"
                  />
                  <h3 className="mx-1">{group.name}</h3>
                </button>
              ))}
            </div>
          </section>
          <section className="m-4">
            <div className="flex flex-wrap">
              <h2>Filters</h2>
              {groupFetchState === FetchState.SUCCESS &&
                groups.map((group) =>
                  group.categories.map((category) => (
                    <button className="flex bg-gray-500 rounded-full p-1 m-1">
                      <img
                        className="w-4 rounded-full"
                        src={category.icon}
                        alt="filter icon"
                      />
                      <h3 className="mx-1">{category.name}</h3>
                    </button>
                  ))
                )}
            </div>
          </section>
          <section>
            <h1 className="text-center font-bold">Latest Grinds</h1>
          </section>
        </div>
      )}
      {userFetchState === FetchState.ERROR && <p>Please Log in</p>}
    </>
  );
}
