import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const poppinsFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: "Todo App",
  description: "The best todo app in the world!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppinsFont.className}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
