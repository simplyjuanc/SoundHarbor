import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthToken } from '@/lib/auth/spotify.auth';

export async function GET(req: NextRequest) {
  const oneDay = 24 * 60 * 60 * 1000;

  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  const state = params.get('state');
  if (!code || !state) {
    return NextResponse.json(
      {status: 500, message: 'Error retrieving code or state in Spotify Callback URL'}
    );
  }

  cookies().set('state', state, { expires: new Date(Date.now() + oneDay) });
  const tokenResponse = await getAuthToken(code);

  if (!tokenResponse) {
    return NextResponse.json(
      {status: 500, message: 'Error retrieving access token from Spotify'}
    );
  }

  const { access_token, refresh_token } = tokenResponse;
  cookies().set('spotify_access_token', access_token, {
    expires: new Date(Date.now() + oneDay),
  });
  cookies().set('spotify_refresh_token', refresh_token, {
    expires: new Date(Date.now() + oneDay),
  });
  redirect('/');
}
