import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import App from './App.svelte';

describe('App', () => {
  it('renders the scaffold heading', () => {
    render(App);
    expect(document.body.contains(screen.getByRole('heading', { name: /Decorator Playground frontend placeholder/i }))).toBe(true);
    expect(document.body.contains(screen.getByText(/Monorepo scaffold is ready./i))).toBe(true);
  });
});
