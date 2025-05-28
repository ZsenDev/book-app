import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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

type BookPageProps = {
  books: Book[];
};

export const getServerSideProps: GetServerSideProps<BookPageProps> = async () => {
  const response = await fetch("https://fakerapi.it/api/v1/books");
  const data = await response.json();

  const books = data.data.map((book: Book) => ({
    ...book,
    image: `https://picsum.photos/seed/${book.id}/480/640`,
  }));

  return { props: { books } };
};

export default function BookPage({ books }: BookPageProps) {
  const router = useRouter();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center mb-8 gap-4">
        <button
          onClick={() => router.push("/")}
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-gray-900 text-white gap-2 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          type="button"
          aria-label="Go to Home"
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
          Home
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Books List
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {["ID", "Image", "Title", "Author", "Genre", "Description", "ISBN", "Published Date", "Publisher", "Action"].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{book.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={60}
                    height={90}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="px-4 py-3 max-w-xs truncate text-sm text-gray-800 dark:text-gray-200">{book.title}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{book.author}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{book.genre}</td>
                <td className="px-4 py-3 max-w-lg truncate text-sm text-gray-600 dark:text-gray-400">{book.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{book.isbn}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {new Date(book.published).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{book.publisher}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    href={{
                      pathname: `/book/${book.id}`,
                      query: { book: JSON.stringify(book) },
                    }}
                    passHref
                  >
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md transition">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
