import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";

export type AuthContextType = {
  signupError: any;
  setSignupError: (value: string) => void;
  loginError: any;
  signup: (
    accountName: string,
    username: string,
    email: string,
    password: string,
    ImgUrl: string
  ) => void;
  login: (accountName: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: any) {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState<string | null>(null);

  const saveToken = (token: any) => {
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const saveCurrentUser = (user: any) => {
    console.log('save', JSON.stringify(user));
    
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
    ImgUrl: string
  ) => {
    try {
      await client.post("/auth/signup", {
        accountName,
        username,
        email,
        password,
        ImgUrl,
      });
      navigate("/");
    } catch (error: any) {
      setSignupError(error.response.data.message);
    }
  };

  const login = async (accountName: string, password: string) => {
    try {
      const response = await client.post("/auth/login", {
        accountName,
        password,
      });
      saveToken(response.data.token);
      // setting the user
      if (response.status === 200) {
        saveCurrentUser(response.data.user);
        navigate("/");
      }
    } catch (error: any) {
      setLoginError(error.response.data.message);
    }
  };

  const logout = () => {
    deleteToken();
    deleteCurrentUser();
    navigate("/Signup-Login");
  };

  const value = { signupError, setSignupError, loginError, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
