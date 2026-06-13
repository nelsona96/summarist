import { getSuggestedBooks } from "@/lib/api";
import BookCarousel from "../book/BookCarousel";
import BookCarouselError from "../book/BookCarouselError";

export default async function SuggestedSection() {
  try {
    const books = await getSuggestedBooks();
    return <BookCarousel books={books} />;
  } catch (error) {
    console.error(error);
    return <BookCarouselError message="Failed to load suggested books" />;
  }
}
