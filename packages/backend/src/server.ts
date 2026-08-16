import { serve } from '@hono/node-server';
import { app } from './app';
import { getPort } from './env';

const port = getPort();

serve({
  fetch: app.fetch,
  port,
});

console.log(`Backend placeholder listening on port ${port}`);
