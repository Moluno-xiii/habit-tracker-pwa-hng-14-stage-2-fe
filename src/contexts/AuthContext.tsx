"use client";
import authService from "@/lib/auth";
import { AuthenticateUserDTO, Session, User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useState } from "react";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  login: (data: AuthenticateUserDTO) => void;
  signup: (data: AuthenticateUserDTO) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(() =>
    authService.getUserSession(),
  );
  const router = useRouter();

  const user = session ? authService.getUserByEmail(session.email) : null;

  const signup = (data: AuthenticateUserDTO) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
    };
    authService.signup(newUser);
    setSession({ email: newUser.email, userId: newUser.id });
    router.replace("/dashboard");
  };

  const login = (data: AuthenticateUserDTO) => {
    authService.login(data);
    setSession(authService.getUserSession());
    router.replace("/dashboard");
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, user, setSession, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
