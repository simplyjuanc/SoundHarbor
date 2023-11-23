import { render, screen } from '@testing-library/react';
import LogoView from '../../src/components/LogoView.tsx';
import '@testing-library/jest-dom';

describe('LogoView Component', () => {
  it('renders the logo image correctly', () => {
    render(<LogoView />);
    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo-no-background.svg');
    expect(logoImage).toHaveAttribute('alt', 'logo');
    expect(logoImage).toHaveAttribute('width', (1500 / 7).toString());
    expect(logoImage).toHaveAttribute('height', (935 / 7).toString());
    expect(logoImage).toHaveClass('m-5 mx-auto mt-16');
  });
});
