import querystring from 'querystring';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { writeDiscogsAuthBaseHeader } from '@/lib/utils/externalAuthUtils';

const authUrl = 'https://api.discogs.com/oauth/';
const accessTokenUrl = authUrl + 'access_token';

// TODO althought implemented properly, this is currently not necessary as the app is using a personal token to access only a single account
// need to enable to incorporate multiple users
export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const token = params.get('oauth_token');
  const verifier = params.get('oauth_verifier');
  const discogsNonce = cookies().get('discogsNonce')!.value;
  const discogsSecret = cookies().get('discogs_secret')!.value;

  if (!token || !verifier) {
    return Response.json({ message: 'No Auth Token in Discogs response' });
  }

  // Refer to this for the below: https://www.discogs.com/forum/thread/785104?message_id=8307207#7793236
  const incompleteSignature = process.env.DISCOGS_CLIENT_SECRET! + '&';
  let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
  headerString += `,oauth_token="${token}",oauth_verifier="${verifier}"`;
  headerString = headerString.replace(
    incompleteSignature,
    incompleteSignature + discogsSecret
  );

  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: headerString,
    },
  });

  // Discogs
  const { oauth_token, oauth_token_secret } = querystring.parse(
    await response.text()
  );

  if (!oauth_token || !oauth_token_secret) {
    return Response.json({
      status: 500,
      message: 'No Access Token in Discogs response',
    });
  }

  const oneDay = 24 * 60 * 60 * 1000;

  cookies().set('discogs_access_token', oauth_token as string, {
    expires: new Date(Date.now() + oneDay),
  });
  cookies().set('discogs_token_secret', oauth_token_secret as string, {
    expires: new Date(Date.now() + oneDay),
  });
  redirect('/dashboard');
};
