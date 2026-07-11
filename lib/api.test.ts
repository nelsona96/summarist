import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  BASE_URL,
  getBookById,
  getRecommendedBooks,
  getSelectedBook,
  getSuggestedBooks,
} from "./api";

const mockBook = {
  id: "1234567",
  author: "Author",
  title: "Title",
  subTitle: "Subtitle",
  imageLink: "img-link",
  audioLink: "audio-link",
  totalRating: 981,
  averageRating: 4.6,
  keyIdeas: 11,
  type: "Audio & Text",
  status: "selected",
  subscriptionRequired: true,
  summary: "Summary",
  tags: ["Tag 1", "Tag 2"],
  bookDescription: "Book description",
  authorDescription: "Author description",
};

const mockBooks = [mockBook, mockBook];

// getSelectedBook
describe("getSelectedBook", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("returns correct data", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [mockBook],
    } as Response);

    const book = await getSelectedBook();

    expect(book).toEqual(mockBook);
  });

  it("calls correct URL with cache revalidation", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [mockBook],
    } as Response);

    await getSelectedBook();

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/getBooks?status=selected`, {
      next: {
        revalidate: 86400,
      },
    });
  });

  it("throws on bad response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {},
    } as Response);

    await expect(getSelectedBook()).rejects.toThrow(
      "getSelectedBook: Failed to fetch selected book",
    );
  });
});

// getRecommendedBooks
describe("getRecommendedBooks", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("returns correct data", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockBooks,
    } as Response);

    const books = await getRecommendedBooks();

    expect(books).toEqual(mockBooks);
  });

  it("calls correct URL with cache revalidation", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [mockBook],
    } as Response);

    await getRecommendedBooks();

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/getBooks?status=recommended`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );
  });

  it("throws on bad response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {},
    } as Response);

    await expect(getRecommendedBooks()).rejects.toThrow(
      "getRecommendedBooks: Failed to fetch recommended book",
    );
  });
});

// getSuggestedBooks
describe("getSuggestedBooks", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("returns correct data", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockBooks,
    } as Response);

    const books = await getSuggestedBooks();

    expect(books).toEqual(mockBooks);
  });

  it("calls correct URL with cache revalidation", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [mockBook],
    } as Response);

    await getSuggestedBooks();

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/getBooks?status=suggested`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );
  });

  it("throws on bad response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {},
    } as Response);

    await expect(getSuggestedBooks()).rejects.toThrow(
      "getSuggestedBooks: Failed to fetch suggested book",
    );
  });
});

// getBookById
describe("getBookById", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("returns correct data", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockBook,
    } as Response);

    const book = await getBookById("id123");

    expect(book).toEqual(mockBook);
  });

  it("calls correct URL with cache revalidation and URL encoding", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockBook,
    } as Response);

    const id = "id 123";
    await getBookById(id);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/getBook?id=${encodeURIComponent(id)}`,
      {
        next: {
          revalidate: 604800,
        },
      },
    );
  });

  it("throws on bad response", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {},
    } as Response);

    await expect(getBookById("id123")).rejects.toThrow(
      "getBookById: Failed to fetch book id123",
    );
  });
});
