import { IoMdPerson } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { User } from "../../utils/types";
import { useEffect } from "react";
import { useGetUser } from "../../lib/api-hooks";

const iconClassname = "flex items-center justify-center h-6 w-6 text-2xl";

const linkDivClassname = "flex flex-col items-center";

export function NavBar() {
  const CurrentUser = JSON.parse(localStorage.getItem("currentUser") as string) as User;

  const [, , getUser] = useGetUser();

  useEffect(() => {
    if (!CurrentUser) return;
    getUser(CurrentUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-testid="navbar"
      className="h-12 bg-white border-t-[1px] border-zinc-800 dark:bg-eerieBlack p-1"
    >
      <div>
        <div className="flex justify-around items-center dark:text-white">
          <div className={linkDivClassname}>
            <Link to={"/"} className={iconClassname} data-testid="feedLink">
              <TiHome />
            </Link>
            <h4>Home</h4>
          </div>
          <div className={linkDivClassname} data-testid="profileLink">
            <Link
              to={CurrentUser ? `/Profile/${CurrentUser.id}` : "/Signup-Login"}
              className={iconClassname}
            >
              <IoMdPerson />
            </Link>
            <h4>Profile</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
