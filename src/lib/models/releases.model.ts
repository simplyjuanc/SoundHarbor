import prisma from "../db";
import type { Release, User } from "@prisma/client";

export const getRelease = async (releaseId: number): Promise<Release | null | undefined> => {
  try {
    const record = await prisma.release.findUnique({ where: { id: releaseId } })
    console.log('getRelease :>> ', record);
    return record;
  } catch (error) {
    console.log('getRelease - error :>> ', error);
  }
}


export const postRelease = async (release: Release): Promise<Release | null | undefined> => {
  try {
    return await prisma.release.create({ data: release })
  } catch (error) {
    console.log('postRelease - error :>> ', error);
  }
}


type BatchPayload = { count: number }
export const postReleases = async (
  releases: Release[]):
  Promise<BatchPayload | null | undefined> => {
  try {
    return await prisma.release.createMany({ data: releases })
  } catch (error) {
    console.log('postReleases - error :>> ', error);
  }
}