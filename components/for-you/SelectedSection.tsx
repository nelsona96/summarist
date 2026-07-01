import { getSelectedBook } from "@/lib/api";
import BookCard from "../book/BookCard";
import SelectedError from "./SelectedError";

export default async function SelectedSection() {
  try {
    const book = await getSelectedBook();
    return <BookCard variant="large" book={book} priority />;
  } catch (error) {
    console.error(error);
    return <SelectedError message="Failed to load selected book" />;
  }
}
