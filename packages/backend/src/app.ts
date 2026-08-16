import { Hono } from 'hono';
import { booksRoute } from './routes/books';
import { seed } from './store';

export const app = new Hono();

seed();

app.get('/', (c) => c.text('Decorator Playground backend'));
app.route('/books', booksRoute);
