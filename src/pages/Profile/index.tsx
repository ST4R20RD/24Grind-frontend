import React, { useEffect } from "react";
import {
  useGetUser,
  useGetUserCards,
} from "../../lib/api-hooks";
import { CardData, FetchState } from "../../utils/types";

const defaultAvatar =
  "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

export function Profile() {
  const [user, userFetchState, getUser] = useGetUser();
  const [cards, cardFetchState, getCards] = useGetUserCards();

  useEffect(() => {
    getUser(1); //login CurrentUser context;
  }, []);

  useEffect(() => {
    userFetchState === FetchState.SUCCESS && user && getCards(user.id);
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
          </section>
          <section className="m-4">
            <div className="flex flex-wrap">
              <h2>Filters</h2>
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
