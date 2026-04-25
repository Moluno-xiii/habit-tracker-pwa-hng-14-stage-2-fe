"use client";

import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
      <h2>Page not found</h2>
      <button
        onClick={() => router.replace("/")}
        className="bg-cyan-500 px-6 py-2 rounded-lg hover:bg-cyan-200 transition-all duration-200 cursor-pointer text-white"
      >
        Go back home
      </button>
    </div>
  );
};

export default NotFound;
