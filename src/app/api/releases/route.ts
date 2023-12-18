import { type NextRequest } from 'next/server'
import { getRelease } from '@/lib/models/releases.model';
import { getServerApiAuthToken } from '@/lib/auth/api.auth';


export const GET = async (req:NextRequest) => {
    const token = await getServerApiAuthToken(req);
    if (!token) return Response.json({ status: 401, message: 'GET/collection - ERROR :>> No token found' });
    const params = req.nextUrl.searchParams;
    const releaseId = params.get('release');
    const record = await getRelease(releaseId!);
    if (!record) return Response.json({ message: 'GET/releases - error :>> No record found' });
    return Response.json(record);
}
