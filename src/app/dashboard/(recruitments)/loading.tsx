export default function RecruitmentCardsLoading() {
  return (
    <main className="mx-6 my-4 flex flex-wrap justify-center gap-4 sm:justify-start md:mx-24">
      {Array(4)
        .fill(null)
        .map((_) => (
          <div className="flex h-64 w-56 flex-col items-center gap-4 rounded-lg bg-main-50 p-4 shadow-md">
            <div className="mt-8 h-4 w-full animate-pulse rounded-lg bg-main-200" />
            <div className="mt-12 h-4 w-full animate-pulse rounded-lg bg-main-200" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-main-200" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-main-200" />
          </div>
        ))}
      <span className="sr-only">Loading...</span>
    </main>
  );
}
