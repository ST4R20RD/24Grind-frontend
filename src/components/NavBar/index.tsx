import { IoMdPerson } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { User } from "../../utils/types";
import { useEffect } from "react";
import { useGetUser } from "../../lib/api-hooks";

const iconClassname = "flex items-center justify-center h-8 w-8 text-3xl m-1";

const linkDivClassname = "flex flex-col items-center";

export function NavBar() {
  const CurrentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as User;

  const [user, userFetchState, getUser] = useGetUser();

  useEffect(() => {
    if (!CurrentUser) return;
    getUser(CurrentUser.id);
  }, []);

  return (
    <div
      data-testid="navbar"
      className="h-10 bg-white border-t-[1px] border-zinc-700 dark:bg-eerieBlack "
    >
      <div>
        <div className="flex justify-around items-center dark:text-white">
          <div className={linkDivClassname}>
            <Link to={"/"} className={iconClassname} data-testid="feedLink">
              <TiHome />
            </Link>
          </div>
          <div className={linkDivClassname} data-testid="profileLink">
            <Link
              to={CurrentUser ? `/Profile/${CurrentUser.id}` : "/Signup-Login"}
              className={iconClassname}
            >
              <IoMdPerson />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
