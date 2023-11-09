import { getAuthToken } from "@/lib/auth/spotify.auth";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  if (!code) return 'Error retrieving code in Spotify Callback URL';

  const state = params.get('state');


  //ASK: How to save the token in state? 
  const tokenResponse = await getAuthToken(code);
  if (tokenResponse) {
    const { access_token, refresh_token } = tokenResponse;
    cookies().set('spotify_access_token', access_token);
    cookies().set('spotify_refresh_token', refresh_token);
  }
  redirect('/');
}