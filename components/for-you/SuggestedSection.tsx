import { getSuggestedBooks } from "@/lib/api";
import BookCarousel from "../book/BookCarousel";

export default async function SuggestedSection() {
  const books = await getSuggestedBooks();

  return <BookCarousel books={books} />;
}
