import prisma from "../db";
import type { User, Release } from "@prisma/client";

export const postUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: user
  })

  if (newUser) return newUser;
  else throw new Error("Issues in error creation");
};


export const getUser = async (username: string) => {
  const user = await prisma.user.findFirst({ where: { username } })
  if (user) return user;
  else throw new Error("Issue retrieving user");
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