"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { checkAuthToken, loginUser, logoutUser, signUpUser } from "../helper/api-communicator";
import toast from "react-hot-toast";

type User = {
  name: string;
  email: string;
  image?: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //for skip logging if have valid cookies
      const res = async () => {
        const data = await checkAuthToken();
        if (data) {
          setUser({
            email: data.email,
            name: data.name,
            image: data?.image,
          });
          setIsLoggedIn(true);
        }
      };
      res();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
        image: data?.image,
      });
      setIsLoggedIn(true);
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    const data = await signUpUser(name, email, password);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
        image: data?.image,
      });
      setIsLoggedIn(true);
    }
  };
  
  const logout = async () => {
    await logoutUser();
    toast.success("Logout success", {id: "logout"})
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  }), [user, isLoggedIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
