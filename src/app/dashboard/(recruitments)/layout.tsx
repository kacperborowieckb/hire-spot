import Footer from "~/app/(landing-page)/_components/footer/Footer";
import Nav from "~/app/(landing-page)/_components/nav/Nav";

export default function DashboardRecruitmentLayout({
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
