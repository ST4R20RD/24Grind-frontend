interface PropChildren {
  children?: string;
}

export function TextError(props: PropChildren) {
  return (
    <span id="errorElement" className="w-fit whitespace-pre-wrap text-red-600 font-semibold">
      {props.children}
    </span>
  );
}
