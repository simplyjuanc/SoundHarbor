import querystring from 'querystring';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  generateRandomString,
  writeDiscogsAuthBaseHeader,
} from '@/lib/utils/externalAuthUtils';

const authUrl = 'https://api.discogs.com/oauth/';
const requestTokenUrl = authUrl + 'request_token';

const redirect_uri = process.env.DISCOGS_REDIRECT_URI!;

export const GET = async (req: Request) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const discogsNonce = generateRandomString();
  cookies().set('discogsNonce', discogsNonce, {
    expires: new Date(Date.now() + oneDay),
  });

  let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
  headerString += `,oauth_callback="${redirect_uri}"`;

  const res = await fetch(requestTokenUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: headerString,
    },
  });

  if (res.status !== 200) return Response.json({ message: 'Response not ok' });

  const { oauth_token, oauth_token_secret, oauth_callback_confirmed } =
    querystring.parse(await res.text());

  if (!oauth_token || !oauth_token_secret || !oauth_callback_confirmed) {
    return Response.json({
      status: 500,
      message: 'No token in discogs response',
    });
  }

  cookies().set('discogs_secret', oauth_token_secret as string, {
    expires: new Date(Date.now() + oneDay),
  });
  const authUrl =
    'https://discogs.com/oauth/authorize?' +
    querystring.stringify({ oauth_token });

  redirect(authUrl);
};
