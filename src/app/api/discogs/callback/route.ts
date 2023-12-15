import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { writeDiscogsAuthFullHeader } from '@/lib/utils/externalAuthUtils';
import { getDiscogsAccessToken } from '@/lib/services/discogsServices';

const authUrl = 'https://api.discogs.com/oauth/';
export const accessTokenUrl = authUrl + 'access_token';

// TODO althought implemented properly, this is currently not necessary as the app is using a personal token to access only a single account
// need to enable to incorporate multiple users


// NEXT: Need to make sure I'm actually using the Oauth workflow rather than the personal token one
// Check the env file to understand if the token is coming from there or what changes are needed

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const token = params.get('oauth_token');
  const verifier = params.get('oauth_verifier');
  const discogsNonce = cookies().get('discogsNonce')?.value;
  const authSecret = cookies().get('discogs_secret')?.value;

  if (!token || !verifier || !discogsNonce || !authSecret) {
    return NextResponse.json({ message: 'Incomplete params in Discogs response' });
  }

  const headerString = writeDiscogsAuthFullHeader(discogsNonce, token, verifier, authSecret);
  const tokenPayload = await getDiscogsAccessToken(headerString);
  if (!tokenPayload) {
    return Response.json({
      status: 500,
      message: 'No Access Token in Discogs response',
    });
  }
  
  const {oauth_token, oauth_token_secret} = tokenPayload;
  const oneDay = 24 * 60 * 60 * 1000;

  cookies().set('discogs_access_token', oauth_token as string, {
    expires: new Date(Date.now() + oneDay),
  });
  cookies().set('discogs_token_secret', oauth_token_secret as string, {
    expires: new Date(Date.now() + oneDay),
  });
  redirect('/dashboard');
};
