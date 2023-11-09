import { generateRandomString } from "@/lib/utils/externalAuthUtils";
import { redirect } from 'next/navigation';
import querystring from 'querystring';


export async function GET(req: Request) {
  const authRequestBody = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: process.env.SPOTIFY_SCOPE,
    state: generateRandomString()
  }

  redirect(
    'https://accounts.spotify.com/authorize?' + querystring.stringify(authRequestBody)
  );
}

