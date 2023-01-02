import { MdLocationOn } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CardData } from "../../utils/types";
import "@fontsource/orbitron";
import moment from "moment";
import { padTo2Digits } from "../../utils/padTo2Digits";
import { Link } from "react-router-dom";

interface CardButtonChildren {
  children: JSX.Element[];
}

/* CardButton Component  */
export function CardButton({ children }: CardButtonChildren) {
  return (
    <button className="flex items-center bg-slate-700 shadow-sm shadow-slate-900 rounded-full px-2 py-1 dark:text-gray-400 w-fit mx-1">
      {children}
    </button>
  );
}

export function Card(card: CardData) {
  const now = moment().toDate();
  const cardDay = new Date(card.day);
  const cardHour = `${padTo2Digits(cardDay.getHours())}:${padTo2Digits(cardDay.getMinutes())}`;
  const cardDate = `${padTo2Digits(cardDay.getDate())}/${padTo2Digits(
    cardDay.getMonth()
  )}/${padTo2Digits(cardDay.getFullYear())}`;
  const dateIsToday = moment(now).isSame(cardDay, "day");
  const dateSince = moment(cardDay, "hh:mm YYYY-MM-DD").startOf("minute").fromNow();

  return (
    <div className="border-b bor pb-5 my-5">
      <div className="text-zinc-700 dark:text-gray-200 flex flex-col w-11/12 max-w-[365px] min-h-[270px] relative bg-slate-400 dark:bg-gray-800 shadow-lg shadow-slate-900 mx-auto rounded-2xl p-4 font-medium">
        <section data-testid="success-section">
          {/* User/Duration/Date Section */}
          <section className="flex items-center justify-between">
            {/* User */}
            <div className="flex items-center">
              <span className="text-lg inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <img className="object-cover h-full" src={card.author?.image} alt="profile pic" />
              </span>
              <div className="pl-2 ">
                <Link to={`/Profile/${card.author.id}`}>
                  <span data-testid="username">
                    {card.author && card.author.username.length <= 16 ? (
                      <h2>{card.author?.username}</h2>
                    ) : (
                      <h3>{card.author?.username}</h3>
                    )}
                  </span>
                </Link>
                <h4 className="dark:text-gray-400">
                  {dateIsToday ? cardHour : cardDate} · {dateSince}
                </h4>
              </div>
            </div>
            {/* Duration, Date */}
            <div className="font-['orbitron']">
              <div className="flex justify-center items-center text-2xl bg-transparent text-center placeholder-gray-600 placeholder:text-xs p-2 border-none overflow-auto outline-none">
                {card.duration}
              </div>
            </div>
          </section>
          {/* Location Section */}
          {card.location !== "" ? (
            <section className="flex my-2">
              <CardButton>
                <MdLocationOn />
                <h4>{card.location}</h4>
              </CardButton>
            </section>
          ) : null}
          {/* Attach Image Section */}
          <section>
            {card.image && (
              <div className="flex items-center justify-center overflow-hidden text-5xl h-fit shadow-md shadow-slate-900 rounded-lg m-2">
                <img className="object-cover w-full" src={card.image} alt="AttachImg" />
              </div>
            )}
          </section>
          {/* Categories/Participants Section */}
          <section className="flex justify-between items-center">
            {/* Categories */}
            {card.category ? (
              <div className="my-2">
                <CardButton>
                  <BiCategory />
                  <h3 className="pl-2">{card.category}</h3>
                </CardButton>
              </div>
            ) : null}
            {/* Participants */}
            <div className="dark:text-gray-400">
              <div className="m-auto">
                <div className="flex justify-center m-3 -space-x-4">
                  {card.participants.length <= 5 ? (
                    card.participants.map((participant, index) => {
                      return (
                        <img
                          key={index}
                          className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-800"
                          src={participant.image}
                          alt="profile pic"
                        />
                      );
                    })
                  ) : (
                    <>
                      {card.participants.slice(0, 4).map((participant) => {
                        return (
                          <img
                            className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-800"
                            src={participant.image}
                            alt="profile pic"
                          />
                        );
                      })}
                      <p
                        data-testid="participants-crowded"
                        className="flex justify-center items-center w-9 h-9 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                      >
                        +{card.participants.length - 4}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* Description Section */}
          <section className="shadow-sm shadow-slate-900 rounded-md py-1 px-2">
            {/* tags */}
            {/* <div className="flex my-1">
                {card.tags.map((tag: string) => {
                  return (
                    <CardButton>
                      <HiHashtag />
                      <h4>{tag}</h4>
                    </CardButton>
                  );
                })}
              </div> */}
            {/* Description */}
            <div className="flex items-center p-1">
              <Link to={`/Profile/${card.author.id}`}>
                <h3>{card.author?.username}</h3>
              </Link>
              <h4 className="ml-1 dark:text-slate-400">{card.description}</h4>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
