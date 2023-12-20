import querystring from 'querystring';
import discogsColJson from '@/lib/mocks/discogs.collection.abridged.json';
import { IDiscogsAuthToken, IDiscogsMasterRelease, IDiscogsMetadata, IDiscogsRelease, IDiscogsToken } from '@/@types';
import { writeDiscogsAuthBaseHeader } from "@/lib/utils/externalAuthUtils";
import { accessTokenUrl } from '@/app/api/discogs/callback/route';



const baseUrl = 'https://api.discogs.com/';
const redirect_uri = process.env.DISCOGS_REDIRECT_URI!;
const requestTokenUrl = `${baseUrl}oauth/request_token`;
const ACCESS_TOKEN = process.env.DISCOGS_TOKEN;

const CURRENCY = 'GBP';


export async function getDiscogsAuthToken(discogsNonce: string):Promise<IDiscogsAuthToken | null> {
  try {
    let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
    headerString += `,oauth_callback="${redirect_uri}"`;

    const res = await fetch(requestTokenUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: headerString,
      },
    });

    if (!res.ok) throw new Error('Response not ok');

    const {
      oauth_token, oauth_token_secret, oauth_callback_confirmed
    } = querystring.parse(await res.text());

    if (!oauth_token || !oauth_token_secret || !oauth_callback_confirmed) {
      throw new Error('No token in Discogs response');
    }

    return {
      oauth_token: oauth_token as string,
      oauth_token_secret: oauth_token_secret as string,
      oauth_callback_confirmed: oauth_callback_confirmed as string
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDiscogsAccessToken(headerString: string):Promise<IDiscogsToken | null> {
  try {
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

    if (!oauth_token || !oauth_token_secret) throw new Error('No Access Token in Discogs response');
    return {
      oauth_token: oauth_token as string,
      oauth_token_secret: oauth_token_secret as string
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

//TODO currently  working with mock data, need to make sure I can get all the info from both services
export const getDiscogsReleases = ():IDiscogsMetadata[] => {
  const releases = discogsColJson.releases.filter((el): el is IDiscogsMetadata => el !== null);
  return releases;
};

export const fetchDiscogs = async <T>(path: string) => {
  const res = await fetch(baseUrl + path);
  const data: T = await res.json();

  return data;
};

export const fetchDiscogsRelease = async (id: string | number): Promise<IDiscogsRelease | null> => {
  try {
    const query = querystring.stringify({
      curr_abbr: CURRENCY,
      token: ACCESS_TOKEN,
    });
    const path = `releases/${id}?${query}`;
    const data = await fetchDiscogs<IDiscogsRelease>(path);
  
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const fetchDiscogsMasterRelease = async (
  id: number
): Promise<IDiscogsMasterRelease> => {
  const path = `masters/${id}`;
  const data = await fetchDiscogs<IDiscogsMasterRelease>(path);

  return data;
};

export const searchDiscogsRelease = async (
  artist: string,
  album: string
): Promise<IDiscogsRelease[]> => {
  const query = querystring.stringify({
    artist,
    release_title: album,
    token: ACCESS_TOKEN,
  });
  const path = `database/search?${query}`;

  //TODO change for the right type returned
  const { results } = await fetchDiscogs<any>(path);
  
  return results;
};

export const searchDiscogsMasterRelease = async (
  artist: string,
  album: string
  ): Promise<IDiscogsRelease[]> => {
    const query = querystring.stringify({
      artist,
      type: 'master',
      release_title: album,
      token: ACCESS_TOKEN,
    });
    const path = `database/search?${query}`;
    
    //TODO change for the right type returned
  const { results } = await fetchDiscogs<any>(path);

  return results;
};
