import { IoMdPerson } from "react-icons/io";
import { HiTrendingUp } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdGroup } from "react-icons/md";

const iconClassname = "h-10 w-10 text-3xl border border-black rounded-xl p-1";

export function NavBar({togglePopup}:any) {
  return (
    <div className="h-24 bg-gradient-to-b from-white via-white to-slate-200 shadow-[0_-4px_10px_0px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center p-5">
        <Link to={"/"} className={iconClassname}>
          <HiTrendingUp />
        </Link>
        <Link to={"/Groups"} className={iconClassname}>
          <MdGroup />
        </Link>
        <Link to={"/Profile"} className={iconClassname}>
          <IoMdPerson />
        </Link>
      </div>
    </div>
  );
}
