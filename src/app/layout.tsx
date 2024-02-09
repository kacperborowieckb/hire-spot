import "~/styles/globals.css";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Hire Spot",
  description: "Hire Spot app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${GeistSans.className} text-text-900 flex min-h-screen flex-col bg-main-50 bg-[url('/bg.svg')] bg-50% backdrop-blur-[2px]`}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
