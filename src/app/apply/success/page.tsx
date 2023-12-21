import Image from "next/image";

export default function SuccessApply() {
  return (
    <main className="mx-auto flex w-[512px] max-w-full flex-col items-center gap-8 px-4 py-6 text-center">
      <h1 className="font-semi-bold text-4xl text-main-600">
        Congratulations!
      </h1>
      <Image
        src={"/success-application.svg"}
        alt="Success!"
        height={257}
        width={300}
      />

      <p className="text-xl">
        You just applied for a new job! We hope they will contact you.
      </p>
    </main>
  );
}
