import prisma from "../db";
import type { Release } from "@prisma/client";

export const getRelease = async (releaseId: string): Promise<Release | void > => {
  try {
    const record = await prisma.release.findUnique({ where: { id: releaseId } })
    if (record) return record;
  } catch (error) {
    console.log('getRelease - error :>> ', error);
  }
}


export const postRelease = async (release: Release): Promise<Release | void > => {
  try {
    return await prisma.release.create({ data: release })
  } catch (error) {
    console.log('postRelease - error :>> ', error);
  }
}


type BatchPayload = { count: number }
export const postReleases = async (releases: Release[]): Promise<BatchPayload | void > => {
  return await prisma.release.createMany({ data: releases, skipDuplicates:true })
}


