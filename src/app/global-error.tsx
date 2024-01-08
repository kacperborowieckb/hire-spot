"use client";

import Button from "~/ui/button/Button";
import Nav from "./(landing-page)/_components/nav/Nav";
import Footer from "./(landing-page)/_components/footer/Footer";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Nav />
        <main className="flex flex-1 flex-col items-center justify-center">
          <h2>Something went wrong!</h2>
          <Image
            alt="Error"
            src={"/global-error.svg"}
            height={320}
            width={320}
            priority={true}
          />
          <Button variant="default" onClick={() => reset()}>
            Try again
          </Button>
        </main>
        <Footer />
      </body>
    </html>
  );
}
