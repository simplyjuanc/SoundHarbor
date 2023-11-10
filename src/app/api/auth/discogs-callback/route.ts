import { NextRequest } from "next/server";
import { writeDiscogsAuthBaseHeader } from "@/lib/utils/externalAuthUtils";
import { useAuthStore } from "@/lib/authStore";
import { redirect } from "next/navigation";



const authUrl = 'https://api.discogs.com/oauth/';
const accessTokenUrl = authUrl + 'access_token';


export const GET = async (req:NextRequest) => {
  const params = req.nextUrl.searchParams;
  const token = params.get('oauth_token');
  const verifier = params.get('oauth_verifier');
  const discogsNonce = useAuthStore(state => state.discogsNonce);
  
  if (!token || !verifier) return new Error('Not token received in callback');
  
  let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
  headerString += `,oauth_token="${token}",oauth_verifier="${verifier}"`;
  
  console.log('headerString: callback :>> ', headerString);
  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': headerString
    }
  })
  console.log(await response.text());
  redirect('/');
}


// export async function getAccessTokens(token: string, verifier: string) {
  
//   console.log('headerString :>> ', headerString);

//   try {

//   } catch (e) {
//     console.log('Error on server-side getAccessTokens');
//     return e;
//   }
// }