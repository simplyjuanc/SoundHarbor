import prisma from "../db"





async function postDiscogsTokens(userId: string, discogs_oauth_token: string, discogs_oauth_token_secret: string) {
  try {
    const userData = await prisma.userAccount.updateMany({
      where: { userId },
      data: { discogs_oauth_token, discogs_oauth_token_secret }
    });

    if (!userData) throw Error('No user data found');

    return userData.count;
  } catch (error) {
    console.log(error);
  }
}

async function getDiscogsTokens(userId: string) {
  try {
    const userData = await prisma.userAccount.findFirst({
      where: { userId },
      select: { discogs_oauth_token: true, discogs_oauth_token_secret: true }
    });

    if (!userData) throw Error('No user data found');
    return userData;

  } catch (error) {
    console.log(error);
  }
}




export {
  getDiscogsTokens,
  postDiscogsTokens,
}