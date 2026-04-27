"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import SplashScreen from "./SplashScreen";

const AuthRedirect: React.FC<PropsWithChildren> = ({ children }) => {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === undefined) return;
    if (session) router.replace("/dashboard");
  }, [router, session]);

  if (session) return null;
  if (session === null) return children;
  return <SplashScreen />;
};

export default AuthRedirect;
