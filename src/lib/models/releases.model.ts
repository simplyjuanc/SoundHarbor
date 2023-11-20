import prisma from '../db';
import discogsColJson from '../mocks/discogs.collection.abridged.json';
import type { Release } from '@prisma/client';
import {
  IDiscogsRelease,
  parseDiscogsRelease,
  searchDiscogs,
  getDiscogsRelease,
  getDiscogsReleasesBasicInfo,
  searchDiscogsAlbum,
} from '../utils/discogsUtils';
import { searchSpotifyAlbum } from '../utils/spotifyUtils';
import { normaliseReleaseData } from '@/lib/utils/releaseUtils';

export const getAllReleases = async () => {
  return await prisma.release.findMany({ orderBy: { artists: 'asc' } });
};

export const getRelease = async (releaseId: string): Promise<Release> => {
  const record = await prisma.release.findUnique({ where: { id: releaseId } });
  if (!record) throw Error('getRelease - no release found in DB');
  return record;
};

export const postRelease = async (release: Release): Promise<Release> => {
  const newRecord = await prisma.release.create({ data: release });
  if (!newRecord) throw Error('getRelease - no release found in DB');
  return newRecord;
};

export const updateRelease = async (
  id: string,
  updateFields: { [k: string]: string | string[] }
): Promise<Release> => {
  return await prisma.release.update({
    where: { id },
    data: { ...updateFields },
  });
};

type BatchPayload = { count: number };
export const postReleases = async (
  releases: Release[]
): Promise<BatchPayload | void> => {
  return await prisma.release.createMany({
    data: releases,
    skipDuplicates: true,
  });
};

// keep for imports path in other use cases
export const getFullReleaseData = async (
  name: string,
  title: string,
  spotifyToken: string
) => {
  const discogsAlbum = await searchDiscogsAlbum(name);
  const spotifyAlbum = await searchSpotifyAlbum(name, title, spotifyToken);
  // console.log('spotifyResult :>> ', spotifyAlbum);

  const fullReleaseData = normaliseReleaseData(discogsAlbum, spotifyAlbum);

  return fullReleaseData;
};

export const deleteRelease = async (id: string) => {
  return await prisma.release.delete({ where: { id } });
};
