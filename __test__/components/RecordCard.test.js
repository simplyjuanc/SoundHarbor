import { render, screen } from '@testing-library/react';
import RecordCard from '../../src/components/RecordCard.tsx';
import '@testing-library/jest-dom';

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
