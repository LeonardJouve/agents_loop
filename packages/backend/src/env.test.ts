import { describe, expect, it } from 'vitest';
import { getPort } from './env';

describe('getPort', () => {
  it('defaults to 3000', () => {
    expect(getPort(undefined)).toBe(3000);
  });

  it('parses a valid port string', () => {
    expect(getPort('8080')).toBe(8080);
  });

  it('throws for non-numeric values', () => {
    expect(() => getPort('not-a-number')).toThrow(/Invalid PORT/);
  });

  it('throws for out-of-range values', () => {
    expect(() => getPort('0')).toThrow(/Invalid PORT/);
    expect(() => getPort('70000')).toThrow(/Invalid PORT/);
  });
});
