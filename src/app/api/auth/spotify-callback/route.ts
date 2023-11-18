import { getAuthToken } from "@/lib/auth/spotify.auth";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";


export async function GET(req: NextRequest) {
  
  const oneDay = 24 * 60 * 60 * 1000

  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  if (!code) return Response.json({message: 'Error retrieving code in Spotify Callback URL'});

  const state = params.get('state');
  if (state) cookies().set('state', state, {expires: new Date(Date.now() + oneDay)});


  const tokenResponse = await getAuthToken(code);
  if (tokenResponse) {
    const { access_token, refresh_token } = tokenResponse;
    cookies().set('spotify_access_token', access_token, {expires: new Date(Date.now() + oneDay)});
    cookies().set('spotify_refresh_token', refresh_token, {expires: new Date(Date.now() + oneDay)});
  }
  redirect('/');
}