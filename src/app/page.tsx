"use client";

import useAuth from "@/hooks/useAuth";
import SplashScreen from "./components/shared/SplashScreen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) router.replace("/dashboard");
    router.replace("/login");
  }, [session, router]);

  return <SplashScreen />;
}
