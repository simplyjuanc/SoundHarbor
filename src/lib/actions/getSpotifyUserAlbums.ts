import { Release } from '@prisma/client';
import { randomUUID } from 'crypto';
import querystring from 'querystring'

const baseURL = 'https://api.spotify.com/v1/';
const market = 'GB';


export async function getSpotifyUserAlbums(accessToken: string):Promise<Release[] | void> {
  try {
    const tracks = await getTopItems('tracks', accessToken, 1);
    const trackIds = extractItemIds(tracks);
    let fullTracks;
    if (trackIds) fullTracks = await getTracksDetails(trackIds, accessToken);

    const artists = await getTopItems('artists', accessToken, 1);
    const artistsIds = extractItemIds(artists);
    let artistsTracks = await getSeveralArtistsTracks(artistsIds!, accessToken)
    if (artistsTracks) artistsTracks = artistsTracks.flat();
    // console.log('artistTracks[0] :>> ', artistsTracks![0]);

    const uniqueTracks = Array.from(new Set([...fullTracks!, ...artistsTracks!]))
    // console.log('uniqueTracks[1] :>> ', uniqueTracks[1]);

    let albumIds: any[] = uniqueTracks.map(track => track.album.id);
    shuffleArray(albumIds);
    // console.log('getSpotifyUserAlbums - albumIds :>> ', albumIds);
    // TODO remove once in prod
    
    albumIds = albumIds.slice(0, 1);

    const userAlbums = await getAlbums(albumIds, accessToken);
    console.log('userAlbums[0] :>> ', userAlbums[0]);
    const userReleases:Release[] = userAlbums.map((album: any) => parseAlbumToRelease(album));
    console.log('userReleases[0] :>> ', userReleases[0]);
    return userReleases;

  } catch (error) {
    console.log('ERROR - getSpotifyUserAlbums', error);
  }
}

/* 
curl --request GET \
  --url 'https://api.spotify.com/v1/tracks?market=GB&ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/


function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}


async function getTracksDetails(trackIds: string[], accessToken: string): Promise<any[] | void> {
  try {

    const query = querystring.stringify({
      market: market,
      ids: trackIds.join(','),
    })
    const res = await fetch(`${baseURL}tracks?${query}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await res.json();
    return data.tracks;

  } catch (error) {
    console.log('ERROR - getTracksDetails', error);
  }
}


async function getSeveralArtistsTracks(artistsIds: string[], accessToken: string) {
  try {
    const artistsTracks = await Promise.all(artistsIds.map(async (id) => {
      const topTracks = await getArtistTopTracks(id, accessToken)
      return topTracks;
    }));
    return artistsTracks;
  } catch (error) {

  }
}

async function getTopItems(type: string, accessToken: string, limit: number) {
  try {
    const res = await fetch(`${baseURL}me/top/${type}?limit=${limit}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const items = (await res.json()).items;
    console.log(type, ' - items :>> ', items[0].name);
    if (items) return items;
    else throw new Error("empty items");

  } catch (error) {
    console.log('ERROR - getTopItems', error);
  }
}


function extractItemIds(items: any[]): string[] | void {
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


async function getArtistTopTracks(id: string, accessToken: string) {
  try {

    const query = querystring.stringify({
      market: market
    })

    const res = await fetch(`${baseURL}artists/${id}/top-tracks?${query}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await res.json()
    // console.log('getArtistTopTracks - data.tracks :>> ', data.tracks[0]);
    return data.tracks;

  } catch (error) {
    console.log('ERROR - getArtistTopTracks', error);
  }
}


async function getAlbums(ids: string[], accessToken: string) {
  try {
    if (!ids) return;
    const query = querystring.stringify({
      ids: ids.join(','),
      market: market
    })

    const res = await fetch(`${baseURL}albums/?${query}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    const data = (await res.json())
    return data.albums;
  } catch (error) {
    console.log('ERROR - getAlbums', error);
  }
}

// Parse album so that I can add it to the DB
// Need to migrate the DB as deleted fields
function parseAlbumToRelease(album: any): Release {
  
  const artists:string[] =album.artists.map((artist: { name: string; }) => artist.name)
  const barcode:string = album.external_ids.upc ? album.external_ids.upc : album.external_ids.ean;
  
  const release:Release = { 
    id: album.id,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    title: album.name,
    label: album.label,
    releaseType: album.type,
    releaseDate: new Date(album.release_date),
    imgUrl: album.images[0]['url'],
    spotifyUri: album.external_urls.spotify,
    artists:artists,
    barcode: barcode,
    userId:null,
  }

  // TODO change the userId assignemtn so it doesn't overwrite existing things in the DB.
  
  return release;
}


