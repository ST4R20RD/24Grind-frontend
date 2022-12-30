import { useEffect, useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../NavBar";
import { FaPlus } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import "@fontsource/bangers";

import { AuthContext, AuthContextType } from "../../context";

export function Layout() {
  const { logout } = useContext(AuthContext) as AuthContextType;

  const isUserLoggedIn = localStorage.getItem("currentUser");

  const [hidden, setHidden] = useState(false);

  const isMobile = window.innerWidth <= 425;

  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/Create") return setHidden(false);
    setHidden(true);
  }, [location]);

  return (
    <section>
      {isMobile ? (
        <>
          <div className="flex flex-col h-[100vh] bg-white dark:bg-chinBlackDark">
            <header className="h-16 fixed w-screen z-50 flex justify-center items-center bg-zinc-200 dark:bg-eerieBlack">
              {isUserLoggedIn && (
                <div className="fixed top-0 left-0 m-3">
                  <button
                    className="h-10 w-10 text-3xl border border-white text-white rounded-xl p-1"
                    onClick={logout}
                  >
                    <RiLogoutCircleLine />
                  </button>
                </div>
              )}
              <div className="flex text-5xl">
                <p className="font-['bangers'] text-lustRed">24</p>
                <p className="font-['bangers'] text-eerieBlack dark:text-white">Grind</p>
              </div>
              <div className="fixed top-0 right-0 m-3">
                <Link to="/Create">
                  <button
                    className="w-10 text-3xl border border-black dark:border-white text-black dark:text-white rounded-xl p-1"
                    hidden={hidden}
                  >
                    <FaPlus />
                  </button>
                </Link>
              </div>
            </header>
            <main className="mb-auto my-16 pb-5 overflow-scroll">
              <div>
                <Outlet />
              </div>
            </main>
            <div className="">
              <NavBar />
            </div>
          </div>
        </>
      ) : (
        <h1>Desktop Version Coming Soon!</h1>
      )}
    </section>
  );
}
