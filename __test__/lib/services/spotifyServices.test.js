import { beforeEach } from 'node:test';
import {
  generateSpotifyHeader,
  fetchTopItems,
} from '../../../src/lib/services/spotifyServices.ts';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('generateSpotifyHeader', () => {
  it('should generate the correct authorization header', () => {
    const accessToken = 'testAccessToken';
    const expectedHeader = {
      Authorization: 'Bearer testAccessToken',
    };

    expect(generateSpotifyHeader(accessToken)).toEqual(expectedHeader);
  });
});

describe('fetchTopItems', () => {
  it('should fetch top items correctly', async () => {
    const mockItems = [{ id: 1, name: 'Test Item' }];
    fetchMock.mockResponseOnce(JSON.stringify({ items: mockItems }));

    const type = 'artists';
    const accessToken = 'testAccessToken';
    const limit = 10;

    const items = await fetchTopItems(type, accessToken, limit);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`,
      { headers: { Authorization: 'Bearer testAccessToken' } }
    );
    expect(items).toEqual(mockItems);
  });

  it('should handle fetch errors', async () => {
    fetchMock.mockReject(new Error('Failed to fetch'));

    const type = 'artists';
    const accessToken = 'testAccessToken';
    const limit = 10;

    await expect(
      fetchTopItems(type, accessToken, limit)
    ).resolves.toBeUndefined();
  });
});
