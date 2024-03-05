import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-2 flex max-w-[350px] flex-col gap-2 text-center">
        <h2 className="text-black-900">
          You are welcome to use test account with created mock recruitment and
          candidates
        </h2>
        <p className="text-black-600">
          Email:{" "}
          <span className="font-medium text-black-900">
            hirespot.mock@gmail.com
          </span>
        </p>
        <p className="text-black-600">
          Password:{" "}
          <span className="font-medium text-black-900">hirespot.mock24</span>
        </p>
      </div>
      <SignUp
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
