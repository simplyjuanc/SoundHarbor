import { redirect } from "next/navigation";
import { generateRandomString, writeDiscogsAuthBaseHeader } from "@/lib/utils/externalAuthUtils";
import querystring from 'querystring'
import { useStore } from "@/lib/store";

const authUrl = 'https://api.discogs.com/oauth/';
const requestTokenUrl = authUrl + 'request_token';


const redirect_uri = process.env.DISCOGS_REDIRECT_URI!;

type OathResponse = {
  oauth_token: string,
  oauth_token_secret: string,
  oauth_callback_confirmed: boolean
}

export const GET = async (req: Request) => {

  const discogsNonce = generateRandomString()
  let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
  headerString += `,oauth_callback="${redirect_uri}"`
  console.log('headerString: auth :>> ', headerString);
  useStore.setState({discogsNonce});

  const res = await fetch(requestTokenUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': headerString
    }
  });

  if (res.status !== 200) return Response.json({status:500, message: 'Response not ok'});

  const { 
    oauth_token, 
    oauth_token_secret,
    oauth_callback_confirmed 
  } = querystring.parse(await res.text());


  if (!oauth_token || !oauth_token_secret || !oauth_callback_confirmed ) {
    return Response.json({status:500, message: 'No token in discogs response'});
  }

  useStore.setState({discogsAccessToken: oauth_token as string});
  const authUrl  = 'https://discogs.com/oauth/authorize?' + querystring.stringify({oauth_token});
  
  console.log('authUrl :>> ', authUrl);
  redirect(authUrl);
}






