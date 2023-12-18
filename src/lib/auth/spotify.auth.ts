import { ISpotifyToken } from "@/@types";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;


export async function getAuthToken(code: string) {
  try {
    const authTokenResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            client_id + ':' + client_secret
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code',
        }),
      }
    );

    const authToken: ISpotifyToken = await authTokenResponse.json();
    return authToken;
  } catch (e) {
    console.log(e);
  }
}

export async function refreshToken(refresh_token: string) {

  try {
    const refreshResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            client_id + ':' + client_secret
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        }),
      }
    );

    const data = await refreshResponse.json();

    return { access_token: data.access_token };
  } catch (e) {
    console.log(e);
  }
}
