import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignIn
        appearance={{
          variables: { colorPrimary: "#6446e6" },
          elements: {
            logoBox: "h-12 mx-auto",
            headerSubtitle: "hidden",
            card: "m-0",
          },
          layout: { logoImageUrl: "/logo.svg" },
        }}
      />
      ;
    </main>
  );
}
