import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Card } from "../Card";
import { Modal } from "../Modal";
import { NavBar } from "../NavBar";

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
          <div className="flex flex-col h-screen justify-between">
            <header className="h-10 text-center">24Grind</header>
            <main className="mb-auto h-screen w-screen">
              <Outlet />
              {isOpen && (
                <Modal>
                  <Card togglePopup={togglePopup} />
                </Modal>
              )}
            </main>
            <div className="">
              <NavBar togglePopup={togglePopup} />
            </div>
          </div>
        </>
      ) : (
        <h1>Desktop Version Coming Soon!</h1>
      )}
    </>
  );
}
