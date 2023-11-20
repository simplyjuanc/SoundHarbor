import { Release, Track } from '@prisma/client';
import { shuffleArray } from './utils';

import { fetchTracksDetails, fetchTopItems, fetchArtistTopTracks,fetchAlbum, fetchAlbums, searchAlbum } from '@/lib/services/spotifyServices'
import { parseSpotifyAlbumToRelease } from '@/lib/utils/releaseUtils'


export async function getTracksDetails(trackIds: string[], accessToken: string): Promise<any[] | void> {
  try {
    const tracks = await fetchTracksDetails(trackIds,accessToken)

    return tracks;

  } catch (error) {
    console.log('ERROR - getTracksDetails', error);
  }
}

export async function getSeveralArtistsTracks(artistsIds: string[], accessToken: string) {
  try {
    const artistsTracks = await Promise.all(artistsIds.map(async (id) => {
      const topTracks = await fetchArtistTopTracks(id, accessToken);
      return topTracks;
    }));

    return artistsTracks;
  } catch (error) {
  }
}

export async function getTopItems(type: string, accessToken: string, limit: number) {
  try {
    const items = await fetchTopItems(type, accessToken, limit);
    // console.log(type, ' - items :>> ', items[0]);

    if (items) return items;
    else throw new Error("empty items");
  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}

export function extractItemIds(items: any[]): string[] | void {
  try {

    if (!items) throw new Error("extractItemIds - No items");
    // console.log('extractItemIds - items :>> ', items[0]);
    const itemIds = [];
    for (let item of items) itemIds.push(item.id);

    if (itemIds) return itemIds;
    else throw new Error("empty items");
  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}

export async function getAlbums(ids: string[], accessToken: string) {
  try {
    if (!ids) return;
    shuffleArray(ids);

    const albums = await fetchAlbums(ids,accessToken)

    return albums;
  } catch (error) {
    console.log('ERROR - getAlbums', error);
  }
}

// not used
export async function getSeveralTracks(trackIds:string[], accessToken:string) {

  const data = await fetchTracksDetails(trackIds, accessToken)

  return data;
}

// TODO: solve why this URL is not correctly fetching data - error 400
export async function searchSpotifyAlbum(album:string, artist:string, accessToken:string):Promise<Release> {
  const res = await searchAlbum(album, artist, accessToken)

  const topAlbum = res.albums.items[0]
  const topAlbumDetail = await fetchAlbum(topAlbum.id, accessToken)

  return parseSpotifyAlbumToRelease(topAlbumDetail);

}