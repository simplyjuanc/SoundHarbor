import { truncate } from '../../src/lib/utils/utils.ts';
import '@testing-library/jest-dom';

describe('truncate function', () => {
  it('should not truncate a string shorter than the max length', () => {
    expect(truncate('Short Title', 27)).toBe('Short Title');
  });

  it('should not truncate a string equal to the max length', () => {
    const title = 'Title That Is Exactly 27 Ch';
    expect(truncate(title, 27)).toBe(title);
  });

  it('should truncate a string longer than the max length', () => {
    const longTitle = 'This Title Is Definitely Longer Than 27 Characters';
    const truncated = truncate(longTitle, 27);
    expect(truncated.length).toBeLessThanOrEqual(27);
  });
});
