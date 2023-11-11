import "~/styles/globals.css";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${GeistSans.className} bg-main-50 text-main-950 bg-50% flex min-h-screen flex-col bg-[url('/bg.svg')]`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
