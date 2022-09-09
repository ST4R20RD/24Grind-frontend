import { CgProfile } from "react-icons/cg";
import { MdLocationOn } from "react-icons/md";
import { HiHashtag } from "react-icons/hi";
import { BiImageAdd, BiCategory } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

const tagButtonClassname =
  "flex items-center border border-black rounded-full bg-slate-300 px-2 mx-2";

const addParticipantButnClassname = "border border-black rounded-full h-7 w-7 text-center"

export function Card({ togglePopup }: any) {
  return (
    <div className="flex flex-col w-11/12 max-w-[365px] relative bg-gray-500 my-0 mx-auto mt-[calc(95vh-85vh-20px)] rounded-3xl shadow-2xl p-3 font-medium">
      <section>
        <div className="flex justify-between">
          <div className="flex text-lg items-center">
            <CgProfile />
            <h2 className="pl-2">Username</h2>
          </div>
          <h1>55'30s</h1>
          <h2>Today's Date</h2>
          <button
            className="flex justify-end -ml-1 -mt-5 w-full text-3xl absolute "
            onClick={togglePopup}
          >
            <AiFillCloseCircle />
          </button>
        </div>
        <div className="flex my-2">
          <div className={tagButtonClassname}>
            <MdLocationOn />
            Add Location
          </div>
          <div className={tagButtonClassname}>
            <HiHashtag />
            Add Tags
          </div>
        </div>
        <div className="flex items-center justify-center text-5xl h-40 border border-black rounded-lg bg-slate-300 m-2">
          <button>
            <BiImageAdd />
          </button>
        </div>
        <div className="flex items-center w-1/2 border border-black rounded-full bg-slate-300 px-2 mx-2">
          <BiCategory />
          <h3 className="pl-2">Add Grind Category</h3>
        </div>
        <div className="border border-black rounded-md m-2">
          <textarea
            placeholder="Description"
            className="bg-transparent placeholder-gray-600 p-2 border-none overflow-auto outline-none resize-none"
          ></textarea>
        </div>
      </section>
      <section className="text-center m-2">
        <div className="my-2">
          <button className="border border-black rounded-full px-2">
            Echo Chamber
          </button>
        </div>
        <h3 className="mb-2">Participants</h3>
        <div className="flex justify-between m-auto w-3/5">
          <button className={addParticipantButnClassname}>
            +
          </button>
          <button className={addParticipantButnClassname}>
            +
          </button>
          <button className={addParticipantButnClassname}>
            +
          </button>
        </div>
      </section>
      <div className="m-auto ">
        <button className="border border-black rounded-full px-2">Share</button>
      </div>
    </div>
  );
}
