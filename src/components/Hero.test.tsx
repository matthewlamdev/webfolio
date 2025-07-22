import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the name Matthew Lam', () => {
    render(<Hero />);
    expect(screen.getByText('Matthew Lam')).toBeInTheDocument();
  });

  it('renders the tagline typewriter', async () => {
    render(<Hero />);
    const typewriter = await screen.findByTestId('typewriter-text', {}, { timeout: 20000 });
    console.log('Typewriter text:', typewriter.textContent);
    expect(typewriter.textContent).toMatch(/Mobile|Crafting|Native/);
  }, 25000);
}); 