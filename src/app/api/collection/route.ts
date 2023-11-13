import { type NextRequest } from 'next/server'
import { findUserReleases, addUserRelease } from '@/lib/models/users.model';
import { getDiscogsRelease } from '@/lib/utils/discogsUtils';
import { Track } from '@prisma/client';


export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const userId = params.get('user');
    const records = await findUserReleases(userId);
    if (!records) throw new Error('empty record response')
    return Response.json(records);
  } catch (error) {
    console.log('GET/collection - error :>> ', error);
  }
}


export const POST = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const userId = params.get('user');
    const releaseId = params.get('releaseId');
    
    let releaseData:Track;
    if (releaseId) releaseData = await getDiscogsRelease(releaseId)
    if (!releaseData) throw new Error("Release not found in Discogs.");
    if (userId) return addUserRelease(userId, releaseData)
  } catch (error) {
    console.log('POST/collection - error :>> ', error);
  }
}
