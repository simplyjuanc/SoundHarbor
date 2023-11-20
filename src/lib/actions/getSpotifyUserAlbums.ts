import { Release } from '@prisma/client';
import {
  getTopItems,
  extractItemIds,
  getTracksDetails,
  getSeveralArtistsTracks,
  getAlbums,
} from '@/lib/utils/spotifyUtils';
import { parseSpotifyAlbumToRelease } from '@/lib/utils/releaseUtils';

export async function getSpotifyUserAlbums(
  accessToken: string
): Promise<Release[] | void> {
  try {
    const tracks = await getTopItems('tracks', accessToken, 10);
    const trackIds = extractItemIds(tracks);
    let fullTracks;
    if (trackIds) fullTracks = await getTracksDetails(trackIds, accessToken);

    const artists = await getTopItems('artists', accessToken, 10);
    const artistsIds = extractItemIds(artists);
    let artistsTracks = await getSeveralArtistsTracks(artistsIds!, accessToken);
    if (artistsTracks) artistsTracks = artistsTracks.flat();
    // console.log('artistTracks[0] :>> ', artistsTracks![0]);

    const uniqueTracks = Array.from(
      new Set([...fullTracks!, ...artistsTracks!])
    );
    // console.log('uniqueTracks[0] :>> ', uniqueTracks[0]);

    const albumIds: string[] = Array.from(
      new Set(uniqueTracks.map(track => track.album.id))
    );
    // console.log('getSpotifyUserAlbums - albumIds :>> ', albumIds);

    const userAlbums = await getAlbums(albumIds, accessToken);
    // console.log('userAlbums[0] :>> ', userAlbums[0]);
    const userReleases: Release[] = userAlbums.map((album: any) =>
      parseSpotifyAlbumToRelease(album)
    );
    // console.log('userReleases[0] :>> ', userReleases[0]);
    return userReleases;
  } catch (error) {
    console.log('ERROR - getSpotifyUserAlbums', error);
  }
}
