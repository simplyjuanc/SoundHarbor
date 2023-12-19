import type { User, Release } from '@prisma/client';
import prisma from '@/lib/db';

export const postUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: user,
  });

  if (newUser) return newUser;
  else throw new Error('Issues in error creation');
};

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email }});
  if (user) return user;
  else throw new Error('Issue retrieving user');
};


export const getUserIdFromEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true }});
  if (user) return user;
  else throw new Error('Issue retrieving user');
};

export const addUserRelease = async (
  userId: string,
  release: Release
): Promise<User | null | undefined> => {
  try {
    const releaseId = release.id;
    return await prisma.user.update({
      where: { id: userId },
      data: {
        releasesOwned: {
          connect: { id: releaseId },
        },
      },
    });
  } catch (error) {
    console.log('addUserRelease - error :>> ', error);
  }
};

export const findUserReleases = async (
  userId: string
): Promise<Release[] | null | undefined> => {
  try {
    const userRecords = await prisma.release.findMany({ where: { userId } });
    if (!userRecords) throw new Error('No releases');
    return userRecords;
  } catch (error) {
    console.log('findUserReleases - error :>> ', error);
  }
};
