import { Release } from '@prisma/client';
import { cookies } from 'next/headers';
import {
  fetchTracksDetails,
  fetchTopItems,
  fetchArtistTopTracks,
  fetchAlbum,
  fetchAlbums,
  searchAlbum,
} from '@/lib/services/spotifyServices';
import { shuffleArray } from '@/lib/utils/utils';
import { parseSpotifyAlbumToRelease } from '@/lib/utils/releaseUtils';

export const getSpotifyToken = (): string | undefined => {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  return spotifyToken;
};

export async function getTracksDetails(
  trackIds: string[],
  accessToken: string
): Promise<any[] | void> {
  try {
    const tracks = await fetchTracksDetails(trackIds, accessToken);

    return tracks;
  } catch (error) {
    console.log('ERROR - getTracksDetails', error);
  }
}

export async function getSeveralArtistsTracks(
  artistsIds: string[],
  accessToken: string
) {
  try {
    const artistsTracks = await Promise.all(
      artistsIds.map(async id => {
        const topTracks = await fetchArtistTopTracks(id, accessToken);
        return topTracks;
      })
    );

    return artistsTracks;
  } catch (error) {}
}

export async function getTopItems(
  type: string,
  accessToken: string,
  limit: number
) {
  try {
    const items = await fetchTopItems(type, accessToken, limit);

    if (items) return items;
    else throw new Error('Empty items');
  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}

export function extractItemIds(items: any[]): string[] | void {
  try {
    if (!items) throw new Error('extractItemIds - No items');

    const itemIds = [];
    for (let item of items) itemIds.push(item.id);

    if (itemIds) return itemIds;
    else throw new Error('empty items');
  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}

export async function getAlbums(ids: string[], accessToken: string) {
  try {
    if (!ids) return;
    shuffleArray(ids);

    const albums = await fetchAlbums(ids, accessToken);

    return albums;
  } catch (error) {
    console.log('ERROR - getAlbums', error);
  }
}

// not used
export async function getSeveralTracks(
  trackIds: string[],
  accessToken: string
) {
  const data = await fetchTracksDetails(trackIds, accessToken);

  return data;
}

// TODO: solve why this URL is not correctly fetching data - error 400
export async function searchSpotifyAlbum(
  album: string,
  artist: string,
  accessToken: string
): Promise<Release | null> {
  try {
    const topAlbum = await searchAlbum(album, artist, accessToken);
    if (!topAlbum) throw new Error('No album found');
  
    const topAlbumDetail = await fetchAlbum(topAlbum.id, accessToken);
    if (!topAlbumDetail) throw new Error('No album detail found');

    return parseSpotifyAlbumToRelease(topAlbumDetail);
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getSpotifyUserAlbums = async (
  accessToken: string
): Promise<Release[] | null> => {
  try {
    const tracks = await getTopItems('tracks', accessToken, 10);
    const trackIds = extractItemIds(tracks);
    let fullTracks;
    if (trackIds) {
      fullTracks = await getTracksDetails(trackIds, accessToken);
    }

    const artists = await getTopItems('artists', accessToken, 10);
    const artistsIds = extractItemIds(artists);
    let artistsTracks = await getSeveralArtistsTracks(artistsIds!, accessToken);
    if (artistsTracks) {
      artistsTracks = artistsTracks.flat();
    }

    const uniqueTracks = Array.from(
      new Set([...fullTracks!, ...artistsTracks!])
    );

    const albumIds: string[] = Array.from(
      new Set(uniqueTracks.map(track => track.album.id))
    );

    const userAlbums = await getAlbums(albumIds, accessToken);
    
    if (!userAlbums) throw new Error('No albums retrieved');

    const userReleases: Release[] = userAlbums.map((album: any) =>
      parseSpotifyAlbumToRelease(album)
    );

    return userReleases;
  } catch (error) {
    console.log('ERROR - getSpotifyUserAlbums', error);
    return null;
  }
};
