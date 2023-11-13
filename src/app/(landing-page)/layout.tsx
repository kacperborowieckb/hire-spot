import Footer from "./_components/footer/Footer";
import Nav from "./_components/nav/Nav";

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
