import type { Release } from '@prisma/client';

import {
  IDiscogsRelease,
  parseDiscogsRelease,
  searchDiscogsAlbum,
} from '@/lib/utils/discogsUtils';
import { searchSpotifyAlbum } from '@/lib/utils/spotifyUtils';

export const normaliseReleaseData = (
  discogsAlbum: IDiscogsRelease,
  spotifyAlbum: Release
): Release => {
  const { imgUrl, spotifyUri, releaseDate, barcode } = spotifyAlbum;
  const parsedDiscogsRelease = parseDiscogsRelease(discogsAlbum);

  const data = Object.assign(parsedDiscogsRelease, {
    imgUrl,
    spotifyUri,
    releaseDate,
    barcode,
  });

  return data;
};

export const getFullReleaseData = async (
  name: string,
  title: string,
  spotifyToken: string
) => {
  const discogsAlbum = await searchDiscogsAlbum(name);
  const spotifyAlbum = await searchSpotifyAlbum(name, title, spotifyToken);
  // console.log('spotifyResult :>> ', spotifyResult);

  const fullReleaseData = normaliseReleaseData(discogsAlbum, spotifyAlbum);

  return fullReleaseData;
};

export function parseSpotifyAlbumToRelease(album: any): Release {
  const artists: string[] = album.artists.map(
    (artist: { name: string }) => artist.name
  );
  const barcode: string = album.external_ids.upc
    ? album.external_ids.upc
    : album.external_ids.ean;

  const release: Release = {
    id: album.id,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    title: album.name,
    label: album.label,
    releaseType: album.type,
    releaseDate: new Date(album.release_date),
    imgUrl: album.images[0]['url'],
    spotifyUri: album.external_urls.spotify,
    artists: artists,
    barcode: barcode,
    userId: null,
    discogsUrl: null,
  };

  // TODO change the userId assignemtn so it doesn't overwrite existing things in the DB.
  return release;
}
