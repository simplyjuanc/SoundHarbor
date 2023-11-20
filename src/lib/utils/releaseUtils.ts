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
