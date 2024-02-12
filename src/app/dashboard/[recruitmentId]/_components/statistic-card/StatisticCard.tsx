import Card from "~/ui/card/Card";

export default function StatisticCard({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) {
  return (
    <Card className="basis-full">
      <>
        <h4 className="text-black-900">{title}</h4>
        {children}
      </>
    </Card>
  );
}
