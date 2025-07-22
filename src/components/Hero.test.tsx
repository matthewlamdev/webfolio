import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the name Matthew Lam', () => {
    render(<Hero />);
    expect(screen.getByText('Matthew Lam')).toBeInTheDocument();
  });

  it('renders the tagline typewriter', async () => {
    render(<Hero />);
    // Wait for the first tagline to appear
    const tagline = await screen.findByText("Crafting Native Mobile Experiences", {}, { timeout: 3000 });
    expect(tagline).toBeInTheDocument();
  });
}); 