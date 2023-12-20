import type { Release } from '@prisma/client';
import discogsColJson from '@/lib/mocks/discogs.collection.abridged.json';
import { shuffleArray, throttle } from '@/lib/utils/utils';
import {
  fetchDiscogsRelease,
  searchDiscogsRelease,
  fetchDiscogsMasterRelease,
  searchDiscogsMasterRelease,
} from '@/lib/services/discogsServices';
import { IDiscogsRelease, IDiscogsBasicInfo, IDiscogsData } from '@/@types';


// TODO: no priority - implement pagination (search, getUserItems methods)

// TODO Understand why this fetch is not returning data even if POstman does

export const getUserItems = () => discogsColJson;

export const getDiscogsRelease = async (
  id: string
): Promise<IDiscogsRelease | null> => {
  try {
    const res = await fetchDiscogsRelease(id);
    return res;
  } catch (error) {
    console.error(error);
    return null;;
  }
  
};

export const searchDiscogs = async (
  artist: string,
  album: string
): Promise<IDiscogsRelease | null> => {
  try {
    artist = artist.replace(/[^a-zA-Z0-9]+/g, ' ');
    album = album.replace(/[^a-zA-Z0-9]+/g, ' ');
  
    const data = await searchDiscogsRelease(artist, album);
  
    return data[0];
    
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchDiscogsForManualRecord = async (
  artist: string,
  album: string
): Promise<IDiscogsRelease | null> => {
  try {
    artist = artist.replace(/[^a-zA-Z0-9]+/g, ' ');
    album = album.replace(/[^a-zA-Z0-9]+/g, ' ');
    
    const master = await searchDiscogsMasterRelease(artist, album);
  

    const releaseId = await getDiscogsMasterId(master, artist, album);
    if (!releaseId) throw new Error('searchDiscogsForManualRecord - No masterId found');


    const release = await fetchDiscogsRelease(releaseId);
    if (!release) throw new Error('searchDiscogsForManualRecord - No release found');
    return release;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};



async function getDiscogsMasterId(release: IDiscogsRelease[], artist: string, album: string):Promise<number | null> {
  try {
    let releaseId;
    if (release.length !== 0) {
      const masterId = release[0]['master_id'];
      const masterRelease = await fetchDiscogsMasterRelease(masterId);
      releaseId = masterRelease['main_release'];
      
    } else {
      const data = await searchDiscogsRelease(artist, album);
      releaseId = data[0]['id'];
    }
    return releaseId;
  } catch (error) {
    console.log(error);
    return null;
  }
}




export const throttledSearchDiscogs = throttle<IDiscogsRelease | null>(
  searchDiscogs,
  1000
);



export async function getDiscogsRecommendations(
  userAlbums: Release[]
): Promise<IDiscogsRelease[] | null> {
  try {
    const searchTuples = userAlbums.map(album => [album.artists[0], album.title]);
    shuffleArray(searchTuples);
  
    const searchDiscogs:IDiscogsRelease[] = [];
    for (let tuple of searchTuples) {
      const searchDiscog = await throttledSearchDiscogs(...tuple);
  
      if (searchDiscog) searchDiscogs.push(searchDiscog);
      if (searchDiscogs.length >= 10) break;

    }
    return searchDiscogs.filter(item => item && Object.hasOwn(item, 'id'));
    
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const extractDiscogsReleasesBasicInfo = (releases: any[]):IDiscogsBasicInfo[] => {
  return releases.map(release => release.basic_information);
};

export const searchDiscogsAlbum = async (name: string):Promise<IDiscogsBasicInfo | null> => {
  //TODO currently  working with mock data, need to make sure I can get all the info from both services
  const releasesMock = discogsColJson.releases;
  // const album = releasesMock.find(i => i.basic_information.artists[0].name === name);

  const discogsResults = extractDiscogsReleasesBasicInfo(releasesMock);
  const album = discogsResults.find(i => i.artists[0].name === name);

  return album ? album : null;
};
