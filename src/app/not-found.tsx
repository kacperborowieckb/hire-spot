import Image from "next/image";
import Link from "next/link";
import Button from "~/ui/button/Button";
import Nav from "./(landing-page)/_components/nav/Nav";
import Footer from "./(landing-page)/_components/footer/Footer";

// TODO: CHANGES LIGHT COLOR IN SVG'S

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center">
        <Image
          alt="404 error"
          src={"/404.svg"}
          height={320}
          width={320}
          priority={true}
        />
        <p className="p-4 text-lg">Sorry, could not find this page</p>
        <Link href="/">
          <Button variant="default">Return Home</Button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
