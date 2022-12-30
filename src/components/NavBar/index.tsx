import { IoMdPerson } from "react-icons/io";
import { HiTrendingUp } from "react-icons/hi";
import { Link } from "react-router-dom";
import { User } from "../../utils/types";
import { useEffect } from "react";
import { useGetUser } from "../../lib/api-hooks";

const iconClassname = "flex items-center justify-center h-8 w-8 text-3xl";

const linkDivClassname = "flex flex-col items-center";

export function NavBar() {
  const CurrentUser = JSON.parse(localStorage.getItem("currentUser") as string) as User;

  const [user, userFetchState, getUser] = useGetUser();

  useEffect(() => {
    if (!CurrentUser) return;
    getUser(CurrentUser.id);
  }, []);

  return (
    <div data-testid="navbar" className="h-16 bg-white border-t-2 dark:bg-eerieBlack ">
      <div>
        <div className="flex justify-around items-center p-2 dark:text-white">
          <div className={linkDivClassname}>
            <Link to={"/"} className={iconClassname}>
              <HiTrendingUp />
            </Link>
            <h4>Feed</h4>
          </div>
          <div className={linkDivClassname}>
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
