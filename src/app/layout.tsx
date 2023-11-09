import "~/styles/globals.css";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font";

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
    <html lang="en">
      <body
        className={`${GeistSans.className} bg-main-50 bg-[url('/bg.svg')] bg-cover`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
