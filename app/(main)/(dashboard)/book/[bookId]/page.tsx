import { getBookById } from "@/lib/api";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const book = await getBookById(bookId);

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>{book.subTitle}</h2>
      <p>{book.author}</p>
      <br />
      <p>{book.bookDescription}</p>
    </div>
  );
}
