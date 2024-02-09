import Image from "next/image";
import Benefit from "./_components/benefit/Benefit";
import Hero from "./_components/hero/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <h2
        id="benefits"
        className="text-text-900 p-12 text-center text-4xl font-medium sm:p-16 sm:text-5xl"
      >
        Explore our{" "}
        <span className="relative font-extrabold text-main-600">
          features
          <Image
            src={"/underline.svg"}
            alt=""
            width={260}
            height={30}
            className="absolute left-1/2 top-full w-full max-w-[260px] -translate-x-1/2 transform p-1 lg:left-0 lg:translate-x-0"
          />
        </span>
      </h2>
      <Benefit
        title="Effortless Recruitment"
        content="Simplify your hiring process with our intuitive platform. Post jobs, review applications, and select top candidates effortlessly."
        src="/hiring-benefit.svg"
        alt="Candidates resumes"
      />
      <Benefit
        title="Save Time and Money"
        content="Cut down on recruitment costs and hours spent sifting through resumes. Focus on what matters – finding the perfect fit for your team."
        src="/savings-benefit.svg"
        alt="A guy putting money in piggy bank"
        reverse={true}
      />
      <Benefit
        title="Data-Driven Decisions"
        content="Leverage powerful analytics to make informed hiring decisions. Our tools help you identify the best talent for your organization."
        src="/data-benefit.svg"
        alt="People working on data graphs"
      />
    </main>
  );
}
