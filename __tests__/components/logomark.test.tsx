import { render, screen } from '@testing-library/react';
import Logomark from '@/components/logomark';

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: any[]) => inputs.join(' '),
}));

describe('Logomark', () => {
  it('renders with the correct foreground color', () => {
    render(<Logomark foreground="primary" />);
    const svgElement = screen.getByRole('img');
    expect(svgElement).toHaveClass('fill-primary-foreground');
  });

  it('renders with the correct background color', () => {
    render(<Logomark background="accent" />);
    const pathElement = screen.getByRole('img').querySelector('path');
    expect(pathElement).toHaveClass('fill-accent');
  });
});
