import { useState } from "react";

interface PropChildren {
  children?: string;
}

export function TextError(props: PropChildren) {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <span
      id="errorElement"
      className="w-fit whitespace-pre-wrap text-red-600 font-semibold"
      onClick={() => setShowMore(!showMore)}
    >
      {props.children && props.children?.length > 22 && !showMore ? (
        <>
          {props.children?.substring(0, 22)}
          {"("}
          <span className="underline">show</span>
          {")"}
        </>
      ) : (
        props.children
      )}
    </span>
  );
}
