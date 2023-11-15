import { type NextRequest } from 'next/server'
import { getRelease } from '@/lib/models/releases.model';


export const GET = async (req:NextRequest) => {
    const params = req.nextUrl.searchParams;
    const releaseId = params.get('release');
    const record = await getRelease(releaseId!);
    if (!record) return Response.json({ message: 'GET/releases - error :>> No record found' });
    return Response.json(record);
}
