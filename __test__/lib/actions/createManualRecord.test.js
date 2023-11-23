import createRecord from '../../../src/lib/actions/createManualRecord.ts';
import '@testing-library/jest-dom';
import { getFullReleaseDataForManualRecord } from '../../../src/lib/utils/releaseUtils.ts';
import { postRelease } from '../../../src/lib/models/releases.model.ts';
import { redirect } from 'next/navigation';

jest.mock('../../../src/lib/utils/releaseUtils.ts');
jest.mock('../../../src/lib/models/releases.model.ts');
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('createRecord function', () => {
  const spotifyToken = 'mockSpotifyToken';
  let data;

  beforeEach(() => {
    data = new FormData();
    getFullReleaseDataForManualRecord.mockClear();
    postRelease.mockClear();
    redirect.mockClear();
  });

  it('should create a record when title and artist are provided', async () => {
    data.append('title', 'Test Title');
    data.append('artist', 'Test Artist');

    const mockReleaseData = {};
    getFullReleaseDataForManualRecord.mockResolvedValue(mockReleaseData);

    await createRecord(spotifyToken, data);

    expect(getFullReleaseDataForManualRecord).toHaveBeenCalledWith(
      'Test Artist',
      'Test Title',
      spotifyToken
    );
    expect(postRelease).toHaveBeenCalledWith(mockReleaseData);
    expect(redirect).toHaveBeenCalledWith('/collection');
  });

  it('should not create a record when title or artist is missing', async () => {
    data.append('title', 'Test Title');

    await createRecord(spotifyToken, data);

    expect(getFullReleaseDataForManualRecord).not.toHaveBeenCalled();
    expect(postRelease).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
