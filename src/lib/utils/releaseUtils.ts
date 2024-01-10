import type { Release } from '@prisma/client';
import { Release as DiscogsRelease } from '@/@types/discogs.types';
import {
  searchDiscogsAlbum,
  searchDiscogsForManualRecord,
} from '@/lib/utils/discogsUtils';
import { searchSpotifyAlbum } from '@/lib/utils/spotifyUtils';
import { ISpotifyAlbum } from '@/@types';

export const parseSpotifyAlbumToRelease = (album: ISpotifyAlbum): Release => {
  const artists = album.artists.map(artist => artist.name);
  const barcode = album.external_ids.upc || album.external_ids.ean;

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
};

export const parseDiscogsAlbumToRelease = (album: DiscogsRelease): Release => {
  const artists: string[] = album.artists.map(
    (artist: { name: string }) => artist.name
  );
  const barcode = album['identifiers'] ? album.identifiers[0].value : '';
  const label = album.labels ? album.labels[0].name : '';
  const releaseType = album.formats ? album.formats[0]['descriptions'][0] : null;
  const releaseDate = album.year ? new Date(album.year) : new Date('1970-01-01');

  const release: Release = {
    id: album.id.toString(),
    title: album.title,
    label,
    artists,
    releaseDate: releaseDate,
    createdAt: null,
    updatedAt: null,
    releaseType,
    discogsUrl: album.uri,
    barcode,
    imgUrl: '',
    spotifyUri: '',
    userId: null,
  };

  return release;
};

export const normaliseReleaseData = (
  discogsAlbum: DiscogsRelease,
  spotifyAlbum: Release
): Release => {
  const { imgUrl, spotifyUri, releaseDate, barcode } = spotifyAlbum;
  const parsedDiscogsRelease = parseDiscogsAlbumToRelease(discogsAlbum);

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

  const fullReleaseData = normaliseReleaseData(discogsAlbum, spotifyAlbum);

  return fullReleaseData;
};

export const getFullReleaseDataForManualRecord = async (
  name: string,
  title: string,
  spotifyToken: string
) => {
  const discogsAlbum = await searchDiscogsForManualRecord(name, title);
  const spotifyAlbum = await searchSpotifyAlbum(name, title, spotifyToken);

  const fullReleaseData = normaliseReleaseData(discogsAlbum, spotifyAlbum);

  return fullReleaseData;
};
