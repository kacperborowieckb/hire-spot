import Card from "~/ui/card/Card";

export default function StatisticCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  // TODO tests
  return (
    <Card className="basis-full">
      <h4 className="text-lg text-black-900">{title}</h4>
      {children}
    </Card>
  );
}
