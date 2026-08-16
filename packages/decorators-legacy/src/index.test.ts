import { describe, expect, it } from 'vitest';
import { LEGACY_DECORATORS_READY } from './index';

describe('decorators-legacy entrypoint', () => {
  it('exports a ready flag', () => {
    expect(LEGACY_DECORATORS_READY).toBe(true);
  });
});
