import SideBar from "./_components/side-bar/SideBar";
import Header from "./_components/header/Header";

export default async function RecruitmentHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-main-5 flex flex-1 overflow-x-hidden bg-main-100">
        <SideBar />
        {children}
      </main>
    </>
  );
}
