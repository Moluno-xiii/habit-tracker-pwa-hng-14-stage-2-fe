"use client";

import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
      <h2>Page not found</h2>
      <button
        onClick={() => router.replace("/")}
        className="cursor-pointer rounded-lg bg-cyan-500 px-6 py-2 text-white transition-all duration-200 hover:bg-cyan-200"
      >
        Go back home
      </button>
    </div>
  );
};

export default NotFound;
