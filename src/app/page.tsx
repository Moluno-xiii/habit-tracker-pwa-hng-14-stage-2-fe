"use client";

import useAuth from "@/hooks/useAuth";
import SplashScreen from "../components/shared/SplashScreen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const splashTimer = 1000;

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === undefined) return;
    const timer = setTimeout(() => {
      router.replace(session ? "/dashboard" : "/login");
    }, splashTimer);
    return () => clearTimeout(timer);
  }, [session, router]);

  return <SplashScreen />;
}
