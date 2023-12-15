import { type NextRequest } from 'next/server'
import { findUserReleases } from '@/lib/models/users.model';
import { getDiscogsRelease } from '@/lib/utils/discogsUtils';


export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const userId = params.get('user');
  const records =  userId ? await findUserReleases(userId) : '';
  if (!records) return Response.json({ message: 'GET/collection - error :>> Empty record response' });
  return Response.json(records);
}


export const POST = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const releaseId = params.get('releaseId');
  if (!releaseId) return Response.json({ message: 'GET/collection - error :>> Release ID found in Discogs.' })
  const releaseData = await getDiscogsRelease(releaseId);
  if (!releaseData) return Response.json({ message: 'GET/collection - error :>> Release Data found in Discogs.' })
}
