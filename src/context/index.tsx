import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";

export type AuthContextType = {
  signupError: any;
  setSignupError: (value: string) => void;
  loginError: any;
  setLoginError: (value: string) => void;
  signup: (
    accountName: string,
    username: string,
    email: string,
    password: string,
    imageUrl: string
  ) => void;
  login: (accountName: string, password: string) => void;
  logout: () => void;
  isSignedUp: boolean;
  setIsSignedUp: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: any) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(true);

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const saveCurrentUser = (user: any) => {
    console.log("save", JSON.stringify(user));

    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const deleteCurrentUser = () => {
    localStorage.removeItem("currentUser");
  };

  /* const getCurrentUser = async () => {
    getUser(Number(localStorage.getItem("currentUserID")));
  }; */

  /* useEffect(() => {
    setCurrentUser(localStorage.getItem);
  }, [user]); */

  const signup = async (
    accountName: string,
    username: string,
    email: string,
    password: string,
    image: string
  ) => {
    try {
      await client.post("/v1/users/signup", {
        accountName,
        username,
        email,
        password,
        image,
      });
      setIsSignedUp(true);
    } catch (error: any) {
      setSignupError(error.response.data.message);
    }
  };

  const login = async (accountName: string, password: string) => {
    try {
      const response = await client.post("/v1/users/login", {
        accountName,
        password,
      });
      /* saveToken(response.data.token); */
      // setting the user
      if (response.status === 200) {
        saveCurrentUser(response.data);
        navigate("/");
      }
    } catch (error: any) {
      setLoginError(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await client.post("/v1/users/logout");
      deleteToken();
      deleteCurrentUser();
      navigate("/Signup-Login");
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    signupError,
    setSignupError,
    loginError,
    setLoginError,
    signup,
    login,
    logout,
    isSignedUp,
    setIsSignedUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
