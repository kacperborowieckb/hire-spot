export default function Card({ children }: { children: JSX.Element }) {
  return (
    <div className="border-border flex min-h-[154px] min-w-[200px] flex-col rounded-lg border bg-main-50 p-4 shadow-md">
      {children}
    </div>
  );
}
