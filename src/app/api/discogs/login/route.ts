import querystring from 'querystring';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateRandomString } from '@/lib/utils/externalAuthUtils';
import { NextResponse } from 'next/server';
import { getDiscogsAuthToken } from '@/lib/services/discogsServices';



export const GET = async (req: Request) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const discogsNonce = generateRandomString();
  cookies().set('discogsNonce', discogsNonce, {
    expires: new Date(Date.now() + oneDay),
  });

  const tokenPayload = await getDiscogsAuthToken(discogsNonce);

  if (!tokenPayload) {
    return NextResponse.json({ 
    status: 500, 
    message: 'Error retrieving Discogs auth token' 
    })
  }

  const { oauth_token, oauth_token_secret } = tokenPayload

  cookies().set('discogs_secret', oauth_token_secret, {
    expires: new Date(Date.now() + oneDay),
  });
  const accessTokenUrl =
    'https://discogs.com/oauth/authorize?' +
    querystring.stringify({ oauth_token });

  redirect(accessTokenUrl);
};



