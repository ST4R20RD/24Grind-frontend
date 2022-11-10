import React from "react";

interface PropChildren {
  children?: React.ReactNode;
}

export function TextError(props: PropChildren) {
  return <span className="mx-2 mb-2 p-2 w-fit text-red-500 font-semibold rounded-lg border-red-900 bg-red-200">{props.children}</span>;
}
