import { getRecommendedBooks } from "@/lib/api";
import BookCarousel from "../book/BookCarousel";
import BookCarouselError from "../book/BookCarouselError";

export default async function RecommenedSection() {
  try {
    const books = await getRecommendedBooks();
    return <BookCarousel books={books} />;
  } catch (error) {
    console.error(error);
    return <BookCarouselError message="Failed to load recommended books" />;
  }
}
