import { render, screen } from '@testing-library/react';
import LogoView from '../src/components/LogoView.tsx';
import RecordCard from '../src/components/RecordCard.tsx';
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

describe('RecordCard Component', () => {
  it('renders an image and a title', () => {
    const mockRelease = {
      title: 'Test Title',
      imgUrl: '/test-image.jpg',
    };

    render(<RecordCard release={mockRelease} />);
    const imageRecord = screen.getByRole('img', {
      name: /Test Title album cover/i,
    });
    expect(imageRecord).toBeInTheDocument();
    expect(imageRecord).toHaveAttribute(
      'alt',
      `${mockRelease.title} album cover`
    );
    expect(imageRecord).toHaveAttribute('width', (150).toString());
    expect(imageRecord).toHaveAttribute('height', (150).toString());

    const srcValue = imageRecord.getAttribute('src');
    expect(srcValue).toMatch(/test-image\.jpg/);
    const title = screen.getByRole('heading', { name: /Test Title/i });
    expect(title).toHaveClass('card-title text-base pb-1');
  });

  it('displays truncated title when necessary', () => {
    const longTitleRelease = {
      title: 'This Title Is Definitely Longer Than 27 Characters',
      imgUrl: '/test-image.jpg',
    };

    render(<RecordCard release={longTitleRelease} />);
    const expectedTruncatedText =
      longTitleRelease.title.substring(0, 24) + '...';

    const titleElement = screen.getByText(
      new RegExp(expectedTruncatedText, 'i')
    );
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe(expectedTruncatedText);
  });
});
