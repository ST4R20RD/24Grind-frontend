import React from "react";

export function Button({ children, submit, onClick }: any) {
  return (
    <button
      type={submit ? `submit` : `button`}
      className=" text-white bg-lustRed dark:text-black font-semibold rounded-lg px-3 mx-3 py-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
