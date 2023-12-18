import { type NextRequest } from 'next/server'
import { findUserReleases } from '@/lib/models/users.model';
import { getDiscogsRelease } from '@/lib/utils/discogsUtils';
import { getServerApiAuthToken } from '@/lib/auth/api.auth';

export const GET = async (req: NextRequest) => {
  const token = await getServerApiAuthToken(req);
  if (!token) return Response.json({ status: 401, message: 'GET/collection - ERROR :>> No token found' });
  console.log('GET/collection - token', token)
  
  const params = req.nextUrl.searchParams;
  const userId = params.get('user');
  const records =  userId ? await findUserReleases(userId) : '';
  if (!records) return Response.json({ status: 404, message: 'GET/collection - ERROR :>> Empty record response' });
  return Response.json(records);
}


export const POST = async (req: NextRequest) => {
  const token = await getServerApiAuthToken(req);
  if (!token) return Response.json({ status: 401, message: 'POST/collection - ERROR :>> No token found' });

  const params = req.nextUrl.searchParams;
  const releaseId = params.get('releaseId');
  if (!releaseId) return Response.json({ message: 'POST/collection - ERROR :>> Release ID found in Discogs.' })
  const releaseData = await getDiscogsRelease(releaseId);
  if (!releaseData) return Response.json({ message: 'POST/collection - ERROR :>> Release Data found in Discogs.' })

  return releaseData;
}


