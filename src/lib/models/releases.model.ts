import fs from 'fs';
import prisma from "../db";
import type { Release } from "@prisma/client";
import { IDiscogsRelease, parseDiscogsRelease, searchDiscogs, getDiscogsRelease } from "../utils/discogsUtils";
import { searchSpotifyAlbum } from "../utils/spotifyUtils";



export const getAllReleases = async () => {
  return await prisma.release.findMany({ orderBy: { artists: 'asc' } });
}



export const getRelease = async (releaseId: string): Promise<Release> => {
  const record = await prisma.release.findUnique({ where: { id: releaseId } })
  if (!record) throw Error('getRelease - no release found in DB')
  return record;
}


export const postRelease = async (release: Release): Promise<Release> => {
  const newRecord = await prisma.release.create({ data: release })
  if (!newRecord) throw Error('getRelease - no release found in DB')
  return newRecord
}


export const updateRelease = async (id: string, updateFields: { [k: string]: string | string[] }): Promise<Release> => {
  return await prisma.release.update({
    where: { id },
    data: { ...updateFields }
  })
}


type BatchPayload = { count: number }
export const postReleases = async (releases: Release[]): Promise<BatchPayload | void> => {
  return await prisma.release.createMany({ data: releases, skipDuplicates: true })
};


const normaliseReleaseData = (discogsAlbum: IDiscogsRelease, spotifyAlbum: Release): Release => {
  const { imgUrl, spotifyUri, releaseDate, barcode } = spotifyAlbum;
  return Object.assign(parseDiscogsRelease(discogsAlbum), { imgUrl, spotifyUri, releaseDate, barcode });
};



//TODO currently  working with mock data, need to amke sure I can get all the info from both services
export const getFullReleaseData = async (artist: string, title: string, spotifyToken: string) => {
  // const discogsId = (await searchDiscogs(artist, title)).id;
  // const discogsResult = await getDiscogsRelease(discogsId);
  // const spotifyResult = await searchSpotifyAlbum(discogsResult.artists[0], discogsResult.title, spotifyToken);
  // return normaliseReleaseData(discogsResult, spotifyResult);

  // REMOVE_START
  const releasesMock = JSON.parse(fs.readFileSync('/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/discogs.collection.abridged.json', 'utf-8')).releases
  const discogsResults: any[] = releasesMock.map((i: { basic_information: any; }) => i.basic_information);
  const discogInfo = discogsResults.filter(i => i.artists[0].name === artist)[0]
  // console.log('discogInfo :>> ', discogInfo);
  // discogInfo.artists = {name: discogInfo[0].artists};
  // console.log('discogInfo.artists :>> ', discogInfo.artists);
  const spotifyResult = await searchSpotifyAlbum(discogInfo.artists[0].name, discogInfo.title, spotifyToken);
  // console.log('spotifyResult :>> ', spotifyResult);
  return normaliseReleaseData(discogInfo, spotifyResult);
  // REMOVE_END
}

export const deleteRelease = async (id: string) => {
  return await prisma.release.delete({ where: { id } })
}