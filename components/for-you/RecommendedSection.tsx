import { getRecommendedBooks } from "@/lib/api";

export default async function RecommenedSection() {
  const books = await getRecommendedBooks();

  return <div>Placeholder</div>;
}
