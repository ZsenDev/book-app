import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  image: string;
  published: string;
  publisher: string;
};

export default function BookDetails() {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (router.query.book) {
      try {
        const parsedBook = JSON.parse(router.query.book as string);
        setBook(parsedBook);
      } catch {
        console.error("Failed to parse book from query.");
      }
    }
  }, [router.query.book]);

  if (!book) {
    return <div className="p-8 text-center text-gray-700 dark:text-gray-300">Loading book details...</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <button
            onClick={() => router.push("/book")}
            className="mb-6 rounded-full border border-transparent transition-colors flex items-center justify-center bg-gray-900 text-white gap-2 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            type="button"
            aria-label="Back to Books List"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Books List
        </button>

      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">{book.title}</h1>

      <div className="flex flex-col sm:flex-row gap-8">
        <Image
          src={book.image}
          alt={book.title}
          width={220}
          height={320}
          className="rounded-md object-cover flex-shrink-0"
        />

        <div className="flex flex-col justify-start text-gray-800 dark:text-gray-300 space-y-4">
          <DetailRow label="ID" value={book.id.toString()} />
          <DetailRow label="Author" value={book.author} />
          <DetailRow label="Genre" value={book.genre} />
          <DetailRow label="Description" value={book.description} isLong />
          <DetailRow label="ISBN" value={book.isbn} />
          <DetailRow label="Published Date" value={new Date(book.published).toLocaleDateString("en-GB")} />
          <DetailRow label="Publisher" value={book.publisher} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, isLong = false }: { label: string; value: string; isLong?: boolean }) {
  return (
    <div>
      <span className="font-semibold text-gray-700 dark:text-gray-400">{label}:</span>{" "}
      <span className={`inline-block ${isLong ? "max-w-md" : "max-w-xs"} break-words`}>
        {value}
      </span>
    </div>
  );
}
