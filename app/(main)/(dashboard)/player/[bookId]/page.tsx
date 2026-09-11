export default async function PlayerPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  return <div>{bookId}</div>;
}