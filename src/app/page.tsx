"use client";

import useAuth from "@/hooks/useAuth";
import SplashScreen from "../components/shared/SplashScreen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === undefined) return;
    router.replace(session ? "/dashboard" : "/login");
  }, [session, router]);

  return <SplashScreen />;
}
