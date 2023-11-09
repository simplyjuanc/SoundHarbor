import { type NextRequest } from 'next/server'
import {
  findUserReleases,
  addUserRelease,
  getRelease,
  postRelease
} from '@/lib/models/releases.model';


export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const userId = Number(params.get('user'));
    const records = await findUserReleases(userId);
    return Response.json({ records });
  } catch (error) {
    console.log('GET/collection - error :>> ', error);
  }
}


export const POST = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const userId = Number(params.get('user'));
    const releaseId = Number(params.get('release'));
    await addUserRelease(userId, releaseId)
    return Response;
  } catch (error) {
    console.log('POST/collection - error :>> ', error);
  }
}
