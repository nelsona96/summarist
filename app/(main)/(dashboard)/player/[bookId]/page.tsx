import type { Book } from "@/types/book";
import { notFound } from "next/navigation";
import { BookNotFoundError, getBookById } from "@/lib/api";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  let book: Book;

  try {
    book = await getBookById(bookId);
  } catch (error) {
    if (error instanceof BookNotFoundError) notFound();
    throw error;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
    </div>
  );
}
