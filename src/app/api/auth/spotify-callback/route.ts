import { getAuthToken } from "@/lib/auth/spotify.auth";
import { type NextRequest } from "next/server";


export function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const code = params.get('code');
  if (!code) return 'Error retrieving code in Spotify Callback URL';
  
  const state = params.get('state');
  

  //ASK: How to save the token in state? 
  let spotifyToken = 
  getAuthToken(code).then(res => console.log(res));
}