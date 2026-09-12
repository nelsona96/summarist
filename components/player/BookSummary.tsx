export default function BookSummary({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{summary}</p>
    </div>
  );
}
