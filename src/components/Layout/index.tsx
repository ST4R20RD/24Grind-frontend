import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Modal } from "../Modal";
import { NavBar } from "../NavBar";
import { FaPlus } from "react-icons/fa";
import "@fontsource/bangers";
import { CardForm } from "../CardForm";

export function Layout() {
  const [hidden, setHidden] = useState(false);
  const isMobile = window.innerWidth <= 425;

  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/Create") return setHidden(false);
    setHidden(true);
  }, [location]);

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-col h-[100vh] bg-slate-300">
            <header className="h-16 fixed w-screen z-50 flex justify-center items-center bg-slate-600 rounded-b-2xl">
              <div className="flex text-5xl">
                <p className="font-['bangers'] text-[#e0ef4d]">24</p>
                <p className="font-['bangers'] text-[#223982]">Grind</p>
              </div>
              <div className="fixed top-0 right-0 m-3">
                <Link to="/Create">
                  <button
                    className="w-10 text-3xl border border-white text-white rounded-xl p-1"
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
            <nav className="w-screen fixed bottom-0">
              <NavBar />
            </nav>
          </div>
        </>
      ) : (
        <h1>Desktop Version Coming Soon!</h1>
      )}
    </>
  );
}
