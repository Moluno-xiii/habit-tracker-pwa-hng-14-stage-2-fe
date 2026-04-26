import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

const NotFound = () => {
  return (
    <main className="bg-paper text-ink relative flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="ledger-num text-vermillion text-[10px] tracking-[0.22em] uppercase">
        Folio Missing
      </p>
      <h1 className="font-display text-ink mt-4 text-[clamp(4rem,16vw,10rem)] leading-[0.9] text-balance italic">
        404
      </h1>
      <hr className="rule mx-auto mt-6 w-16" />
      <p className="text-ink-soft mt-6 max-w-sm text-base leading-relaxed text-pretty">
        This page was either torn from the binding, or never inscribed at all.
        The ledger keeps no record of it.
      </p>
      <Link
        href="/"
        replace
        className="border-ink text-ink hover:bg-ink hover:text-paper ledger-num mt-10 inline-flex h-12 items-center gap-2 border px-6 text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        <HiArrowLeft className="h-4 w-4" />
        Return to the cover
      </Link>
    </main>
  );
};

export default NotFound;
