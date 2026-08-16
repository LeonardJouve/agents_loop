import { describe, expect, it } from 'vitest';
import { app } from './app';

describe('backend app', () => {
  it('responds with the placeholder text', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Decorator Playground backend placeholder');
  });
});
