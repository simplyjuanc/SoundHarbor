import fs from 'fs'
import querystring from 'querystring';
import { Release } from "@prisma/client";
import { shuffleArray, throttle } from './utils';


const baseUrl = 'https://api.discogs.com/';
const CURRENCY = 'GBP'
const ACCESS_TOKEN = process.env.DISCOGS_TOKEN;

export interface IDiscogsRelease {
  id: number;
  status: string;
  uri: string;
  labels: any[];
  artists: any[];
  master_id: number;
  title: string;
  released: string;
  notes: string;
  identifiers: any[];
  formats: any[],
  year: number
  // genres: string[];
};

// TODO: no priority - implement pagination (search, getUserItems methods)

// TODO Understand why this feth is not returning data even if POstman does

export const getUserItems = fs.readFileSync(
  '/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/discogs.collection.abridged.json', { encoding: 'utf-8' }
)

export const getDiscogsRelease = async (id: string): Promise<IDiscogsRelease> => {
  const path = `releases/${id}?${querystring.stringify({ curr_abbr: CURRENCY, token: ACCESS_TOKEN })}`
  // console.log('getDiscogsRelease - path :>> ', path);
  const data = await fetchDiscogsResource(path);
  return data;
}

export const searchDiscogs = async (artist: string, album: string): Promise<IDiscogsRelease> => {
  artist = artist.replace(/[^a-zA-Z0-9]+/g, ' ')
  album = album.replace(/[^a-zA-Z0-9]+/g, ' ')
  const path = `database/search?${querystring.stringify({ artist, release_title: album, token: ACCESS_TOKEN })}`
  // console.log('searchDiscogs - path :>> ', path);
  return (await fetchDiscogsResource(path)).results[0];
}

export const throttledSearchDiscogs = throttle<IDiscogsRelease>(searchDiscogs, 1000)

async function fetchDiscogsResource(path: string) {
  const res = await fetch(baseUrl + path);
  return await res.json();
}

export const parseDiscogsRelease = (release: IDiscogsRelease): Release => {
  const artists: string[] = release.artists.map((artist: { name: string; }) => artist.name);
  const barcode = release['identifiers'] ? release.identifiers[0].value : '';
  // REMOVE_START
  // const barcode = (release['identifiers'].length) ? release.identifiers[0].value : '';
  // const artists = release.artists;
  // const barcode = release.barcode;
  // REMOVE_END
  const label = (release.labels) ? release.labels[0].name : null;
  const releaseType = (release.formats) ? release.formats[0]['descriptions'][0] : null;
  const releaseDate = (release.year) ? new Date(release.year) : new Date('1970-01-01');;


  const parsedRelease: Release = {
    id: release.id.toString(),
    // id: release.id,
    title: release.title,
    label,
    artists,
    releaseDate: releaseDate,
    createdAt: null,
    updatedAt: null,
    releaseType,
    discogsUrl: release.uri,
    barcode,
    imgUrl: '',
    spotifyUri: '',
    userId: null
  }

  return parsedRelease;
}

export async function getDiscogsRecommendations(userAlbums: Release[]): Promise<IDiscogsRelease[]> {
  const searchTuples = userAlbums.map((album) => [album.artists[0], album.title]);
  shuffleArray(searchTuples);
  const searchDiscogs = []
  for (let tuple of searchTuples) {
    const searchDiscog = await throttledSearchDiscogs(...tuple)
    if (searchDiscog) searchDiscogs.push(searchDiscog);
    if (searchDiscogs.length >= 10) break;
  }
  return searchDiscogs
    .filter((item) => item && Object.hasOwn(item, 'id'));
}