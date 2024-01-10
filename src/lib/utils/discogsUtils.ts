import type { Release } from '@prisma/client';
import discogsColJson from '@/lib/mocks/discogs.collection.abridged.json';
import { shuffleArray, throttle } from '@/lib/utils/utils';
import {
  fetchDiscogsRelease,
  searchDiscogsRelease,
  fetchDiscogsMasterRelease,
  searchDiscogsMasterRelease,
} from '@/lib/services/discogsServices';
import { Release as DiscogsRelease } from '@/@types/discogs.types';


// TODO: no priority - implement pagination (search, getUserItems methods)

// TODO Understand why this feth is not returning data even if POstman does

export const getUserItems = () => discogsColJson;

export const getDiscogsRelease = async (
  id: string
): Promise<DiscogsRelease> => {
  const res = await fetchDiscogsRelease(id);

  return res;
};

export const searchDiscogs = async (
  artist: string,
  album: string
): Promise<DiscogsRelease> => {
  artist = artist.replace(/[^a-zA-Z0-9]+/g, ' ');
  album = album.replace(/[^a-zA-Z0-9]+/g, ' ');

  const data = await searchDiscogsRelease(artist, album);

  return data[0];
};

export const searchDiscogsForManualRecord = async (
  artist: string,
  album: string
): Promise<DiscogsRelease> => {
  artist = artist.replace(/[^a-zA-Z0-9]+/g, ' ');
  album = album.replace(/[^a-zA-Z0-9]+/g, ' ');

  let releaseId;
  const master = await searchDiscogsMasterRelease(artist, album);

  if (master.length !== 0) {
    const masterId = master[0]['master_id'];
    const masterRelease = await fetchDiscogsMasterRelease(masterId);

    releaseId = masterRelease['main_release'];
  } else {
    const data = await searchDiscogsRelease(artist, album);
    releaseId = data[0]['id'];
  }

  const release = await fetchDiscogsRelease(releaseId);

  return release;
};

export const throttledSearchDiscogs = throttle<DiscogsRelease>(
  searchDiscogs,
  1000
);

export async function getDiscogsRecommendations(
  userAlbums: Release[]
): Promise<DiscogsRelease[]> {
  const searchTuples = userAlbums.map(album => [album.artists[0], album.title]);
  shuffleArray(searchTuples);

  const searchDiscogs = [];
  for (let tuple of searchTuples) {
    const searchDiscog = await throttledSearchDiscogs(...tuple);

    if (searchDiscog) {
      searchDiscogs.push(searchDiscog);
    }
    if (searchDiscogs.length >= 10) {
      break;
    }
  }

  return searchDiscogs.filter(item => item && Object.hasOwn(item, 'id'));
}

export const getDiscogsReleasesBasicInfo = (releases: any[]) => {
  return releases.map(release => release.basic_information);
};

export const searchDiscogsAlbum = async (name: string) => {
  //TODO currently  working with mock data, need to make sure I can get all the info from both services
  const releasesMock = discogsColJson.releases;

  const discogsResults: any[] = getDiscogsReleasesBasicInfo(releasesMock);
  const album = discogsResults.filter(i => i.artists[0].name === name)[0];

  return album;
};
