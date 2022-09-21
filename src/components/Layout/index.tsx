import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Modal } from "../Modal";
import { NavBar } from "../NavBar";
import { FaPlus } from "react-icons/fa";
import "@fontsource/bangers";
import { CardForm } from "../CardForm";

export function Layout() {
  const isMobile = window.innerWidth <= 425;

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-col">
            <header className="h-16 fixed w-screen z-50 flex justify-center items-center bg-slate-600 rounded-b-2xl">
              <div className="flex text-5xl">
                <p className="font-['bangers'] text-[#e0ef4d]">24</p>
                <p className="font-['bangers'] text-[#223982]">Grind</p>
              </div>
              <div className="fixed top-0 right-0 m-3">
                <button
                  className="w-10 text-3xl border border-white text-white rounded-xl p-1"
                  onClick={togglePopup}
                >
                  <FaPlus />
                </button>
              </div>
            </header>
            <main className="mb-auto my-16 pb-5 overflow-scroll">
              <div className="p-2">
                <Outlet />
              </div>
              {isOpen && (
                <Modal>
                  <CardForm togglePopup={togglePopup} />
                </Modal>
              )}
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
