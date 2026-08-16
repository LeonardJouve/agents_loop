import { describe, expect, it } from 'vitest';
import { app } from './app';

describe('backend app', () => {
  it('responds with the root text', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Decorator Playground backend');
  });

  it('returns seeded books from /books', async () => {
    const res = await app.request('/books');
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(10);
    expect(body[0]).toMatchObject({
      id: 'book-001',
      title: 'Pride and Prejudice',
      year: 1813,
    });
  });
});
