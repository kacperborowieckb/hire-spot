import Footer from "./_components/Footer";
import Nav from "./_components/Nav";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
