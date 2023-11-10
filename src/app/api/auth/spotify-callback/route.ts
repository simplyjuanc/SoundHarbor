import { getAuthToken } from "@/lib/auth/spotify.auth";
import { type NextRequest } from "next/server";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { useStore } from "@/lib/store";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  if (!code) return 'Error retrieving code in Spotify Callback URL';

  const state = params.get('state');
  if (state) cookies().set('state', state);


  const tokenResponse = await getAuthToken(code);
  if (tokenResponse) {
    const { access_token, refresh_token } = tokenResponse;
    cookies().set('spotify_access_token', access_token);
    cookies().set('spotify_refresh_token', refresh_token);
    useStore.setState({spotifyAccessToken: access_token, spotifyRefreshToken: refresh_token})
  }
  redirect('/');
}