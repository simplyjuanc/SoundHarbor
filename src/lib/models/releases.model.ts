import prisma from "../db";
import type { Release, User } from "@prisma/client";

export const getRelease = async (releaseId: number):Promise<Release | null | undefined>  => {
  try {
    const record = await prisma.release.findUnique({ where: { id: releaseId } })
    console.log('getRelease :>> ', record);
    return record;
  } catch (error) {
    console.log('getRelease - error :>> ', error);
  }
}


export const postRelease = async (release: Release):Promise<Release | null | undefined> => {
  try {
    return await prisma.release.create({data: release})
  } catch (error) {
    console.log('postRelease - error :>> ', error);
  }
}


export const findUserReleases = async (userId: number):Promise<Release[] | null | undefined> => {
  try {
    const userRecords = await prisma.release.findMany({where: {userId}})
    
    console.log('findUserReleases :>> ', userRecords);
    
    if (!userRecords) throw new Error("No releases");    
    return userRecords
  } catch (error) {
    console.log('findUserReleases - error :>> ', error);
  }
}

export const addUserRelease = async (userId: number, release: Release):Promise<User | null | undefined> => {
  try {
    const releaseId = release.id;
    return await prisma.user.update({
      where: { id: userId },
      data: {
        releasesOwned: {
          connect: { id: releaseId }
        }
      }
    });
  } catch (error) {
    console.log('addUserRelease - error :>> ', error);
  }
}
