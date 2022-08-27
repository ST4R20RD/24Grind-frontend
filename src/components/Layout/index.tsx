import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

export function Layout() {
  const isMobile = window.innerWidth <= 425;

  return (
    <>
      {isMobile ? (
        <>
          <Outlet />
          <NavBar/>
        </>
      ) : (
        <h1>Desktop Version Coming Soon!</h1>
      )}
    </>
  );
}
