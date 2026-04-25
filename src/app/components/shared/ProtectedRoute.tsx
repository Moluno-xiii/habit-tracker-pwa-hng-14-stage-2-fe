"use client";

import useAuth from "@/hooks/useAuth";
import { PropsWithChildren, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === null) router.replace("/login");
  }, [session, router]);

  if (!session) return <SplashScreen />;
  return children;
};

export default ProtectedRoute;
