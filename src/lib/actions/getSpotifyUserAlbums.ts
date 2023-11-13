import { Release } from '@prisma/client';
import { getTopItems, extractItemIds, getTracksDetails, getSeveralArtistsTracks, shuffleArray, getAlbums, parseAlbumToRelease } from '../utils/spotifyUtils';

export const baseURL = 'https://api.spotify.com/v1/';
export const market = 'GB';


export async function getSpotifyUserAlbums(accessToken: string): Promise<Release[] | void> {
  try {
    const tracks = await getTopItems('tracks', accessToken, 10);
    const trackIds = extractItemIds(tracks);
    let fullTracks;
    if (trackIds) fullTracks = await getTracksDetails(trackIds, accessToken);

    const artists = await getTopItems('artists', accessToken, 10);
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
    albumIds = albumIds.slice(0, 5);

    const userAlbums = await getAlbums(albumIds, accessToken);
    // console.log('userAlbums[0] :>> ', userAlbums[0]);
    const userReleases: Release[] = userAlbums.map((album: any) => parseAlbumToRelease(album));
    // console.log('userReleases[0] :>> ', userReleases[0]);
    return userReleases;

  } catch (error) {
    console.log('ERROR - getSpotifyUserAlbums', error);
  }
}



