import React from 'react';
import Link from 'next/link';
import LoginDiscogs from './LoginDiscogs';
import { useAuthStore } from '@/lib/authStore';
import {parseCookies} from '@/lib/utils/utils';

export default function LoginSpotify() {
  const authStore = useAuthStore();

  if (!authStore.spotifyAccessToken) {
    const cookieJar = parseCookies(document.cookie);
    const spotifyCookie = 'spotify_access_token';

    if (cookieJar && cookieJar[spotifyCookie]) {
      const token = cookieJar[spotifyCookie];
      authStore.setSpotifyAccessToken(token);
    }
  }

  console.log(
    'authStore.spotifyAccessToken :>> ',
    authStore.spotifyAccessToken
  );

  return (
    <>
      {authStore.spotifyAccessToken ? (
        <LoginDiscogs />
      ) : (
        <>
          <div className='mx-12'>
            <h1>Welcome!</h1>
            <p>First things first, we need to get you set up!</p>
            <p>
              This means that we will first need to connect your Spotify account
              so that we can get an idea of what kind of music you like.
            </p>
          </div>
          <Link
            href='/api/auth/spotify-login'
            className='btn btn-primary mx-16 mt-12'
          >
            Connect to Spotify
          </Link>
        </>
      )}
    </>
  );
}
