import { render, screen, waitFor } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the name Matthew Lam', () => {
    render(<Hero />);
    expect(screen.getByText('Matthew Lam')).toBeInTheDocument();
  });

  it('renders the tagline typewriter', async () => {
    render(<Hero />);
    const typewriter = await screen.findByTestId('typewriter-text', {}, { timeout: 12000 });
    await waitFor(
      () => {
        expect(typewriter.textContent).toMatch(/production|automation|DevOps-first/);
      },
      { timeout: 12000 }
    );
  }, 15000);
}); 