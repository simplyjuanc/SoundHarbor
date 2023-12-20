import type { Release } from '@prisma/client';
import {
  searchDiscogsAlbum,
  searchDiscogsForManualRecord,
} from '@/lib/utils/discogsUtils';
import { searchSpotifyAlbum } from '@/lib/utils/spotifyUtils';
import { IDiscogsRelease, ISpotifyAlbum } from '@/@types';

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

export const parseDiscogsAlbumToRelease = (album: IDiscogsRelease): Release => {
  const artists: string[] = album.artists.map(
    (artist: { name: string }) => artist.name
  );
  const barcode = album['identifiers'] ? album.identifiers[0].value : '';
  const label = album.labels ? album.labels[0].name : null;
  const releaseType = album.formats
    ? album.formats[0]['descriptions'][0]
    : null;
  const releaseDate = album.year
    ? new Date(album.year)
    : new Date('1970-01-01');

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
  discogsAlbum: IDiscogsRelease,
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
):Promise<Release | null> => {
  try {
    const discogsAlbum = await searchDiscogsAlbum(name);
    const spotifyAlbum = await searchSpotifyAlbum(name, title, spotifyToken);
    
    if (!discogsAlbum || !spotifyAlbum) throw new Error('No release found on external services');

    // TODO: get the full release data from discogs from the album data already fetched
    // start by checking what data is missing
    // then 


    const fullReleaseData = normaliseReleaseData(discogsAlbum, spotifyAlbum);
  
    return fullReleaseData;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFullReleaseDataForManualRecord = async (
  name: string,
  title: string,
  spotifyToken: string
) => {
  try {
    const discogsAlbum = await searchDiscogsForManualRecord(name, title);
    const spotifyAlbum = await searchSpotifyAlbum(name, title, spotifyToken);
    if (!discogsAlbum || !spotifyAlbum) throw new Error('No release found on external services');
    
    const fullReleaseData = normaliseReleaseData(discogsAlbum, spotifyAlbum);
    return fullReleaseData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
