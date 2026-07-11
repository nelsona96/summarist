export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  return (
    <div>
      <h1>Book Details</h1>
      <p>Book ID: {bookId}</p>
    </div>
  );
}
