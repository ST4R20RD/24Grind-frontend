import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

export function Layout() {
  const isMobile = window.innerWidth <= 425;

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-col h-screen justify-between">
            <header className="h-10">Header</header>
            <main className="mb-auto">
              <Outlet />
            </main>
            <div className="">
              <NavBar />
            </div>
          </div>
        </>
      ) : (
        <h1>Desktop Version Coming Soon!</h1>
      )}
    </>
  );
}
