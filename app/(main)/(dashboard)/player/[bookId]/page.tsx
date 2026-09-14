import type { Book } from "@/types/book";
import { notFound } from "next/navigation";
import { BookNotFoundError, getBookById } from "@/lib/api";
import PlayerGate from "@/components/player/PlayerGate";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  let subRequired: boolean;

  try {
    const { subscriptionRequired }: Book = await getBookById(bookId);
    subRequired = subscriptionRequired;
  } catch (error) {
    if (error instanceof BookNotFoundError) notFound();
    throw error;
  }

  return (
    <div>
      <PlayerGate bookId={bookId} subscriptionRequired={subRequired} />
    </div>
  );
}
