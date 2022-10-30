import { Navigate } from "react-router-dom";
import { User } from "../../utils/types";

export function PrivateRoute({ children }: any) {
  const CurrentUser = JSON.parse(localStorage.getItem("currentUser") as string) as User;
  if (CurrentUser) {
    return children;
  } else {
    return <Navigate to="/Signup-Login" />;
  }
}
