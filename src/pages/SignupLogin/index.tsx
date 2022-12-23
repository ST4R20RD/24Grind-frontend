import { Signup, Login } from "../../components";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context";
import { CSSTransition } from "react-transition-group";
import "./index.css";

export function SignupLogin() {
  const { isSignedUp } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="text-black">
      <div>
        <CSSTransition
          in={!isSignedUp}
          timeout={300}
          classNames="tab"
          unmountOnExit
        >
          <Signup />
        </CSSTransition>
        <CSSTransition
          in={isSignedUp}
          timeout={300}
          classNames="tab"
          unmountOnExit
        >
          <Login />
        </CSSTransition>
      </div>
    </div>
  );
}
