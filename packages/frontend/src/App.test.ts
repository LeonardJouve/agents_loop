import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import App from './App.svelte';

describe('App', () => {
  it('renders the @Log page heading and source code', () => {
    render(App);

    expect(document.body.contains(screen.getByRole('heading', { name: /@Log — Legacy Decorator/i }))).toBe(true);
    expect(document.body.contains(screen.getByText(/export function Log/i))).toBe(true);
    expect(document.body.contains(screen.getByRole('button', { name: /GET \/api\/books/i }))).toBe(true);
  });
});
