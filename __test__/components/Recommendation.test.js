import { render, screen } from '@testing-library/react';
import Recommendation from '../../src/components/Recommendation.tsx';
import '@testing-library/jest-dom';

describe('Recommendation Component', () => {
  it('renders the cover image correctly with cover_image', () => {
    const mockRecommendation = {
      title: 'Test Title',
      cover_image: '/test-image.jpg',
    };
    render(<Recommendation recommendation={mockRecommendation} />);
    const CoverImage = screen.getByRole('img', { name: /Test title image/i });
    expect(CoverImage).toBeInTheDocument();

    const srcValue = CoverImage.getAttribute('src');
    expect(srcValue).toMatch(/test-image\.jpg/);
    expect(CoverImage).toHaveAttribute(
      'alt',
      `${mockRecommendation.title} image.`
    );
    expect(CoverImage).toHaveAttribute('width', (75).toString());
    expect(CoverImage).toHaveAttribute('height', (75).toString());
  });

  it('renders the cover image correctly with default image', () => {
    const mockRecommendation = {
      title: 'Test Title',
    };
    render(<Recommendation recommendation={mockRecommendation} />);
    const CoverImage = screen.getByRole('img', { name: /Test title image/i });
    expect(CoverImage).toBeInTheDocument();
    const srcValue = CoverImage.getAttribute('src');
    expect(srcValue).toMatch(/record-generic\.jpg/);
  });

  it('renders the title correctly for short titles', () => {
    const shortTitle = 'Short Title';
    const mockRecommendation = {
      title: shortTitle,
      cover_image: '/test-image.jpg',
    };
    render(<Recommendation recommendation={mockRecommendation} />);

    const titleElement = screen.getByText(shortTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(shortTitle);
  });

  it('renders the title correctly for long titles', () => {
    const longTitle = 'This is a very long album title that exceeds the limit';
    const truncatedTitle = 'This is a very long al...';
    const mockRecommendation = {
      title: longTitle,
      cover_image: '/test-image.jpg',
    };
    render(<Recommendation recommendation={mockRecommendation} />);

    const titleElement = screen.getByText(truncatedTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(truncatedTitle);
  });

  it('renders the Buy button with the correct link', () => {
    const mockRecommendation = {
      title: 'Test Album',
      cover_image: '/test-image.jpg',
      uri: '/release/12345-Test-Album',
    };
    render(<Recommendation recommendation={mockRecommendation} />);

    const buyButton = screen.getByRole('link', { name: /buy/i });
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toHaveAttribute(
      'href',
      'https://www.discogs.com' + mockRecommendation.uri
    );
    expect(buyButton).toHaveAttribute('target', '_blank');
  });
});
