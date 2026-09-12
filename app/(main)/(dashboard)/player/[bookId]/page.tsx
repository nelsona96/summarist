import type { Book } from "@/types/book";
import { notFound } from "next/navigation";
import { BookNotFoundError, getBookById } from "@/lib/api";
import PlayerGate from "@/components/player/PlayerGate";
import BookSummary from "@/components/player/BookSummary";

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
      <PlayerGate subscriptionRequired={book.subscriptionRequired}>
        <BookSummary title={book.title} summary={book.summary} />
      </PlayerGate>
    </div>
  );
}
