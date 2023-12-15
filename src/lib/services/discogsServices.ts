import querystring from 'querystring';
import discogsColJson from '@/lib/mocks/discogs.collection.abridged.json';
import { IMasterRelease, IDiscogsRelease } from '@/@types';

const baseUrl = 'https://api.discogs.com/';
const CURRENCY = 'GBP';
const ACCESS_TOKEN = process.env.DISCOGS_TOKEN;

//TODO currently  working with mock data, need to make sure I can get all the info from both services
export const getDiscogsReleases = () => {
  return discogsColJson.releases;
};

export const fetchDiscogs = async (path: string) => {
  const res = await fetch(baseUrl + path);
  const data = await res.json();

  return data;
};

export const fetchDiscogsRelease = async (
  id: string | number
): Promise<IDiscogsRelease> => {
  const query = querystring.stringify({
    curr_abbr: CURRENCY,
    token: ACCESS_TOKEN,
  });
  const path = `releases/${id}?${query}`;

  const data = await fetchDiscogs(path);

  return data;
};

export const fetchDiscogsMasterRelease = async (
  id: number
): Promise<IMasterRelease> => {
  const path = `masters/${id}`;

  const data = await fetchDiscogs(path);

  return data;
};

export const searchDiscogsRelease = async (
  artist: string,
  album: string
): Promise<IDiscogsRelease[]> => {
  const query = querystring.stringify({
    artist,
    release_title: album,
    token: ACCESS_TOKEN,
  });
  const path = `database/search?${query}`;

  const { results } = await fetchDiscogs(path);

  return results;
};

export const searchDiscogsMasterRelease = async (
  artist: string,
  album: string
): Promise<IDiscogsRelease[]> => {
  const query = querystring.stringify({
    artist,
    type: 'master',
    release_title: album,
    token: ACCESS_TOKEN,
  });
  const path = `database/search?${query}`;

  const { results } = await fetchDiscogs(path);

  return results;
};
