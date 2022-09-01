import { useParams } from "react-router-dom";

export const InsideGroup = () => {
  const { id } = useParams();

  return <div>{id}</div>;
}