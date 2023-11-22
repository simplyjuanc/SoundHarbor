'use client';
import { useEffect, useState } from 'react';
import LoginSpotify from '@/containers/LoginSpotify';
import LoginDiscogs from '@/containers/LoginDiscogs';
import Login from '@/containers/Login';
import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';

import LogoView from '@/components/LogoView';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    isLoggedIn,
    setIsLoggedIn,
    spotifyAccessToken,
    setSpotifyAccessToken,
    discogsAccessToken,
    setDiscogsAccessToken,
  } = useAuthStore();

  useEffect(() => {
    const cookieJar = parseCookies(document.cookie);

    if (cookieJar) {
      const {
        spotify_access_token: spotifyCookie,
        discogs_secret: discogsCookie,
      } = cookieJar;

      if (!discogsAccessToken && discogsCookie) {
        setDiscogsAccessToken(discogsCookie);
      }

      if (!spotifyAccessToken && spotifyCookie) {
        setSpotifyAccessToken(spotifyCookie);
        setIsLoggedIn(true);
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="text-center">
      <div className="max-w-sm w-9/12 flex flex-col mx-auto mt-10 h-full">
        <LogoView />
        {isLoggedIn ? (
          spotifyAccessToken ? (
            <LoginDiscogs />
          ) : (
            <LoginSpotify />
          )
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
