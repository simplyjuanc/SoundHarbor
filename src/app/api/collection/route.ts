import { type NextRequest } from 'next/server'
import { findUserReleases, addUserRelease } from '@/lib/models/users.model';
import { fetchReleaseData } from '@/lib/services/discogsClient';


export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const userId = Number(params.get('user'));
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
    const userId = Number(params.get('user'));
    const releaseId = Number(params.get('releaseId'));
    
    const releaseData = await fetchReleaseData(releaseId)
    if (!releaseData) throw new Error("Release not found in Discogs.");
    
    return addUserRelease(userId, releaseData)
  } catch (error) {
    console.log('POST/collection - error :>> ', error);
  }
}
