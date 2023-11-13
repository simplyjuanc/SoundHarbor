import { type NextRequest } from 'next/server'
import { getRelease, postRelease } from '@/lib/models/releases.model';


export const GET = async (req:NextRequest) => {
  try {
    // make sure i get the release id
    const params = req.nextUrl.searchParams;
    const releaseId = params.get('release');
    const record = await getRelease(releaseId!);
    if (!record) throw new Error("No record found.");
    return record;
  } catch (error) {
    console.log('route.getRelease - error :>> ', error);
  }
}
export const POST = async (req:NextRequest) => {
  try {
    
  } catch (error) {
    console.log('route.postRelease - error :>> ', error);
  }
}