import axios from 'axios';
import { generateRandomString } from "../utils/generateRandomString";


const authUrl = 'https://api.discogs.com/oauth';
const requestTokenUrl = authUrl + '/request_token';
const accessTokenUrl = authUrl + '/access_token';

const consumer_key = process.env.DISCOGS_CONSUMER_KEY!;
const client_secret = process.env.DISCOGS_CLIENT_SECRET!;
const redirect_uri = process.env.DISCOGS_REDIRECT_URI!;
const discogsCode = generateRandomString();

type OathResponse = {
  oauth_token: string,
  oauth_token_secret: string,
  oauth_callback_confirmed: boolean
}


function writeBaseHeaderString(timestamp: number) {
  return `OAuth oauth_consumer_key="${consumer_key}", ` +
    `oauth_nonce="${discogsCode}", ` +
    `oauth_signature="${client_secret}&", ` +
    `oauth_signature_method="PLAINTEXT", ` +
    `oauth_timestamp="${timestamp}"`
}


export async function login() {
  let headerString = writeBaseHeaderString(Date.now());
  headerString += `, oauth_callback="${redirect_uri}"`

  try {
    const response = await axios.get(requestTokenUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: headerString
      }
    })
    console.log(response);
    if (response.status !== 200) throw new Error('Denied')
  
    console.log('response.data :>> ', response.data);
    return response.data

  } catch (e) {
    console.log('Error 500 at login function')
  }
}


export async function getDiscogsTokens(token: string, verifier: string) {
  let headerString = writeBaseHeaderString(Date.now());
  headerString += `,oauth_token="${token}",oauth_verifier="${verifier}"`;
  console.log('headerString :>> ', headerString);
  
  try {
    const response = await axios.post(accessTokenUrl, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': headerString
      }
    })
    console.log('response :>> ', response);
    return response.data;
  } catch (e) {
    console.log('Error on server-side getAccessTokens');
    return e;
  }
}


