import { IoMdPerson } from "react-icons/io";
import { HiTrendingUp } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdGroup } from "react-icons/md";

const iconClassname = "flex items-center justify-center h-8 w-8 text-3xl";

const linkDivClassname = "flex flex-col items-center";

export function NavBar() {
  return (
    <div className="h-16 dark:bg-zinc-800 shadow-[0_-4px_10px_0px_rgba(0,0,0,0.3)]">
      <div className="border-t-2 border-slate-300">
        <div className="flex justify-around items-center p-2 dark:text-white">
          <div className={linkDivClassname}>
            <Link to={"/"} className={iconClassname}>
              <HiTrendingUp />
            </Link>
            <h4>Feed</h4>
          </div>
          <div className={linkDivClassname}>
            <Link to={"/Groups"} className={iconClassname}>
              <MdGroup />
            </Link>
            <h4>Groups</h4>
          </div>
          <div className={linkDivClassname}>
            <Link to={"/Profile"} className={iconClassname}>
              <IoMdPerson />
            </Link>
            <h4>Profile</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
