import { describe, expect, it } from 'vitest';
import { MODERN_DECORATORS_READY } from './index';

describe('decorators-modern entrypoint', () => {
  it('exports a ready flag', () => {
    expect(MODERN_DECORATORS_READY).toBe(true);
  });
});
