"use client";

import AuthContextProvider from "@/contexts/AuthContext";
import { PropsWithChildren } from "react";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AppProvider;
