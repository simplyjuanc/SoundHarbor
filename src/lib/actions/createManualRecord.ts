'use server';

import { redirect } from 'next/navigation';
import { postRelease } from '../models/releases.model';
import { getFullReleaseDataForManualRecord } from '@/lib/utils/releaseUtils';

export default async function createRecord(
  spotifyToken: string,
  data: FormData
) {
  const title = data.get('title')?.toString();
  const artist = data.get('artist')?.toString();
  console.log('artist :>> ', artist);
  /*
  TODO: These two are currently just for show, need to integrate them into the Discogs search method
  const label = data.get('label')?.toString();
  const releaseDate = data.get('releaseDate')?.toString();
  */
  if (!title || !artist) return;
  const release = await getFullReleaseDataForManualRecord(
    artist,
    title,
    spotifyToken
  );
  // console.log('release :>> ', release);
  postRelease(release);
  redirect('/collection');
}
