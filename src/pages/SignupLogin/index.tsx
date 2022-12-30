import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context";
import { CSSTransition } from "react-transition-group";
import "./index.css";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function SignupLogin() {
  const { isSignedUp } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="text-black dark:text-white">
      <div>
        <CSSTransition in={!isSignedUp} timeout={300} classNames="tab" unmountOnExit>
          <Signup />
        </CSSTransition>
        <CSSTransition in={isSignedUp} timeout={300} classNames="tab" unmountOnExit>
          <Login />
        </CSSTransition>
      </div>
    </div>
  );
}
