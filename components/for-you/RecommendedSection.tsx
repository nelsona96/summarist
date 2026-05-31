import { getRecommendedBooks } from "@/lib/api";
import BookCarousel from "../book/BookCarousel";

export default async function RecommenedSection() {
  const books = await getRecommendedBooks();

  return <BookCarousel books={books} />;
}
