import React from "react";

export function Button({ children, submit, onClick, className }: any) {
  return (
    <button
      type={submit ? `submit` : `button`}
      className={`text-white bg-lustRed dark:text-black font-semibold rounded-lg px-3 mx-3 py-1 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
