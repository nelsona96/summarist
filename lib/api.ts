import type { Book } from "@/types/book";

const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

export async function getSelectedBook(): Promise<Book> {
  const response = await fetch(`${BASE_URL}/getBooks?status=selected`);

  if (!response.ok) {
    throw new Error(
      `getSelectedBook: Failed to fetch selected book: ${response.status}`,
    );
  }

  return response.json();
}

export async function getRecommendedBooks(): Promise<Book[]> {
  const response = await fetch(`${BASE_URL}/getBooks?status=recommended`);

  if (!response.ok) {
    throw new Error(
      `getRecommendedBooks: Failed to fetch recommended books: ${response.status}`,
    );
  }

  return response.json();
}

export async function getSuggestedBooks(): Promise<Book[]> {
  const response = await fetch(`${BASE_URL}/getBooks?status=suggested`);

  if (!response.ok) {
    throw new Error(
      `getSuggestedBooks: Failed to fetch suggested books: ${response.status}`,
    );
  }

  return response.json();
}

export async function getBookById(id: string): Promise<Book> {
  const response = await fetch(`${BASE_URL}/getBook?id=${id}`);

  if (!response.ok) {
    throw new Error(
      `getBookById: Failed to fetch book ${id}: ${response.status}`,
    );
  }

  return response.json();
}

export async function getBooksByAuthorOrTitle(query: string): Promise<Book[]> {
  const response = await fetch(
    `${BASE_URL}/getBooksByAuthorOrTitle?search=${query}`,
  );

  if (!response.ok) {
    throw new Error(
      `getBooksByAuthorOrTitle: Failed to fetch book query: ${response.status}`,
    );
  }

  return response.json();
}
