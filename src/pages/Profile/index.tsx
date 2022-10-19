import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {
  useGetUser,
  useGetUserCards,
} from "../../lib/api-hooks";
import { FetchState, User } from "../../utils/types";
import { BiEdit } from 'react-icons/bi'
import { FiCamera, FiSave } from 'react-icons/fi'
import { TiCancel } from 'react-icons/ti'

const defaultAvatar =
  "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

export function Profile() {
  const { userId } = useParams();
  const userID = Number(userId);
  const CurrentUser = JSON.parse(localStorage.getItem('currentUser') as string) as User;

  const [user, userFetchState, getUser] = useGetUser();
  const [cards, cardFetchState, getCards] = useGetUserCards();

  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    getUser(Number(userID)); //login CurrentUser context;
  }, [userID]);

  /* TESTING LOG BEFORE LOGIN FEATURE */
  useEffect(() => {
    if (!user) return
    localStorage.setItem('currentUser', JSON.stringify(user))
    console.log({ CurrentUser }, { userID });

  }, [user])

  useEffect(() => {
    userFetchState === FetchState.SUCCESS && user && getCards(user.id);
  }, [userFetchState]);

  const handleEditUsername = () => {
    //Endpoint PUT
  }

  return (
    <section className='m-5'>
      {userFetchState === FetchState.LOADING && <p>Loading...</p>}
      {userFetchState === FetchState.SUCCESS && (
        <div className="">
          <section className="mx-2">
            {userID === CurrentUser.id && <div className="bg-green-200 float-right border py-1 px-2 rounded-lg">
              <span>{!isEditing ? <button type="button" onClick={() => setIsEditing(true)}>
                <BiEdit />
              </button>
                : <div className='flex items-center'>
                  <button className='p-2'>
                    <FiSave />
                  </button>
                  <button className='border-l-2 border-black p-2' type="button" onClick={() => setIsEditing(false)}>
                    <h2>
                      <TiCancel />
                    </h2>
                  </button>
                </div>}</span>
            </div>}
            <div className="flex">
              <div className="rounded-full overflow-hidden">
                {!isEditing ? <img
                  className="object-cover w-16 h-16"
                  src={user?.UserImg || defaultAvatar}
                  alt="profile pic"
                /> : <div className='flex justify-center items-center w-16 h-16 border rounded-full'>
                  <span>
                    <FiCamera />
                  </span>
                </div>}
              </div>
              {!isEditing ? <h2 className="ml-3">{user?.username}</h2> : <input onChange={handleEditUsername} className='border h-7 mx-1' placeholder={user?.username} />}
            </div>
          </section>
          <section className='my-4'>
            <h1 className="text-center font-bold">Latest Grinds</h1>
            <button className='float-right m-2 text-blue-400'>View all</button>
          </section>
        </div>
      )}
      {userFetchState === FetchState.ERROR && <p>Please Log in</p>}
    </section>
  );
}
