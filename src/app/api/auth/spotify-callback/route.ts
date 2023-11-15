import { getAuthToken } from "@/lib/auth/spotify.auth";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";


export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  if (!code) return Response.json({message: 'Error retrieving code in Spotify Callback URL'});

  const state = params.get('state');
  if (state) cookies().set('state', state);


  const tokenResponse = await getAuthToken(code);
  if (tokenResponse) {
    const { access_token, refresh_token } = tokenResponse;
    cookies().set('spotify_access_token', access_token);
    cookies().set('spotify_refresh_token', refresh_token);
  }
  redirect('/');
}