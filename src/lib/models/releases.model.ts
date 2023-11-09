import prisma from "../db";


export const findUserReleases = async (userId: number) => {
  const userRecords = await prisma.user.findUnique({
    where: { id: userId },
    select: { recordsOwned: true }
  })

  console.log('userRecords :>> ', userRecords);
  /* 
    const collection = await prisma.records.findMany({
      where: {
        OR: [
          // TODO: How do get multiple records with multiple ids?
        ]
      }
    })
   */
  // return collection;
}


export const getRelease = async (releaseId: number) => {
  try {
    return ''
  } catch (error) {
    console.log('gettRelease - error :>> ', error);
  }
}

export const postRelease = async (releaseId: number) => {
  try {

  } catch (error) {
    console.log('postRelease - error :>> ', error);
  }
}



export const addUserRelease = async (userId: number, releaseId: number) => {
  try {
    const release = await getRelease(releaseId);
    if (!release) await postRelease(releaseId);

    await prisma.user.update({
      where: { id: userId },
      include: [recordsOwned]
    });
  } catch (error) {
    console.log('addUserRelease - error :>> ', error);
  }
}
