export interface Author {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  authorId: string;
  year: number;
}

export interface Loan {
  id: string;
  bookId: string;
  borrower: string;
  dueDate: string;
}

export type Store = {
  authors: Author[];
  books: Book[];
  loans: Loan[];
};

export const store: Store = {
  authors: [],
  books: [],
  loans: [],
};

const authors: Omit<Author, 'id'>[] = [
  { name: 'Jane Austen' },
  { name: 'George Orwell' },
  { name: 'Toni Morrison' },
  { name: 'Gabriel García Márquez' },
  { name: 'Ursula K. Le Guin' },
];

const books: Pick<Book, 'title' | 'year'>[] = [
  { title: 'Pride and Prejudice', year: 1813 },
  { title: 'Emma', year: 1815 },
  { title: '1984', year: 1949 },
  { title: 'Animal Farm', year: 1945 },
  { title: 'Beloved', year: 1987 },
  { title: 'The Bluest Eye', year: 1970 },
  { title: 'One Hundred Years of Solitude', year: 1967 },
  { title: 'Love in the Time of Cholera', year: 1985 },
  { title: 'A Wizard of Earthsea', year: 1968 },
  { title: 'The Left Hand of Darkness', year: 1969 },
];

const loans: Pick<Loan, 'borrower' | 'dueDate'>[] = [
  { borrower: 'Alice', dueDate: '2026-09-01' },
  { borrower: 'Bob', dueDate: '2026-09-15' },
  { borrower: 'Carol', dueDate: '2026-10-01' },
];

function createId(prefix: string, index: number): string {
  return `${prefix}-${String(index + 1).padStart(3, '0')}`;
}

export function seed(): Store {
  store.authors = authors.map((author, index) => ({ ...author, id: createId('author', index) }));

  // Each author gets two books in order.
  store.books = books.map((book, index) => ({
    ...book,
    id: createId('book', index),
    authorId: store.authors[Math.floor(index / 2)].id,
  }));

  store.loans = loans.map((loan, index) => ({
    ...loan,
    id: createId('loan', index),
    bookId: store.books[index].id,
  }));

  return store;
}
