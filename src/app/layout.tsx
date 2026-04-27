import ServiceWorkerRegistrar from "@/components/shared/ServiceWorkerRegistrar";
import AppProvider from "@/providers/AppProvider";
import type { Metadata } from "next";
import { ABeeZee, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const abeezee = ABeeZee({
  variable: "--font-abeezee",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habit Tracker | Daily Ledger",
  description:
    "An almanac for the small disciplines that compound into a life.",
  manifest: "/manifest.json",
};

const themeBootScript = `
(function () {
  try {
    var saved = localStorage.getItem('habit-tracker-theme');
    var theme = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${abeezee.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="grain bg-paper text-ink relative flex min-h-full flex-col">
        <div className="relative z-10 flex flex-1 flex-col">
          <AppProvider>{children}</AppProvider>
        </div>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
