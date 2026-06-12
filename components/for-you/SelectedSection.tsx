import { getSelectedBook } from "@/lib/api";
import BookCard from "../book/BookCard";

export default async function SelectedSection() {
  const book = await getSelectedBook();

  return <BookCard variant="large" book={book} priority />;
}
