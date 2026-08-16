import { Hono } from 'hono';
import { Log } from '@decorator-playground/decorators-legacy';
import { store } from '../store';
import type { Book } from '../store';

class BooksHandler {
  @Log()
  getBooks(): Book[] {
    return store.books;
  }
}

const handler = new BooksHandler();

export const booksRoute = new Hono();

booksRoute.get('/', (c) => {
  const books = handler.getBooks();
  return c.json(books);
});
