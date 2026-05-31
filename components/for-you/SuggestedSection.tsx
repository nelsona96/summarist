import { getSuggestedBooks } from "@/lib/api";

export default async function SuggestedSection() {
  const books = await getSuggestedBooks();

  return <div>Placeholder</div>;
}
