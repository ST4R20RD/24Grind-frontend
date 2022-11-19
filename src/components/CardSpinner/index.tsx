import { BiCategory } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { CardButton } from "../Card";

export function CardSpinner() {
  return (
    <section data-testid='card-spinner'>
      {/* User/Duration/Date Section */}
      <section className="flex items-center justify-between">
        {/* User */}
        <div className="flex items-center">
          <span className="text-lg inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-400 animate-pulse"></span>
          <div className="flex flex-col justify-evenly pl-2 w-10 h-10">
            <div className="bg-gray-400 animate-pulse rounded-md w-24 h-4" />
            <div className="bg-gray-400 animate-pulse rounded-md w-20 h-2" />
          </div>
        </div>
        {/* Duration, Date */}
        <div className="font-['orbitron']">
          <div className="bg-gray-400 animate-pulse rounded-md w-24 h-10" />
        </div>
      </section>
      {/* Location Section */}
      <section className="flex my-2">
          <CardButton>
            <MdLocationOn />
            <div className="rounded-md w-24 h-2" />
          </CardButton>
      </section>
      {/* Attach Image Section */}
      <section>
        <div className="bg-gray-400 animate-pulse rounded-md w-full h-24" />
      </section>
      {/* Categories/Participants Section */}
      <section className="flex justify-between items-center">
        <div className="my-2">
          <CardButton>
            <BiCategory />
            <div className=" rounded-md w-24 h-2" />
          </CardButton>
        </div>
        <div className="dark:text-gray-400">
          <div className="m-auto">
            <div className="flex justify-center m-3 -space-x-4">
              <div className="bg-gray-400 animate-pulse w-9 h-9 rounded-full border-2 border-white dark:border-gray-800" />
              <div className="bg-gray-400 animate-pulse w-9 h-9 rounded-full border-2 border-white dark:border-gray-800" />
              <div className="bg-gray-400 animate-pulse w-9 h-9 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
          </div>
        </div>
      </section>
      {/* Description Section */}
      <section className="shadow-sm shadow-slate-900 rounded-md py-1 px-2">
        <div className="flex items-center p-1">
          <div className="bg-gray-400 animate-pulse rounded-md w-24 h-4" />
          <div className="bg-gray-400 animate-pulse rounded-md w-56 h-2" />
        </div>
      </section>
    </section>
  );
}
