'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';
import Login from '@/components/Login';
import LoginDiscogs from '@/components/LoginDiscogs';
import LoginSpotify from '@/components/LoginSpotify';
import LogoView from '@/components/LogoView';
import { useSession } from 'next-auth/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    isLoggedIn,
    setJwt,
    setIsLoggedIn,
    spotifyAccessToken,
    setSpotifyAccessToken,
    discogsAccessToken,
    setDiscogsAccessToken,
  } = useAuthStore();
  // const { data: session, status } = useSession();


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
      }
      /* 
      if (status === 'authenticated') {
        // setJwt(session?.user?.jwt);
        setIsLoggedIn(true);
      } */
    }

    setIsLoading(false);
  }, [discogsAccessToken, setDiscogsAccessToken, setIsLoggedIn, setSpotifyAccessToken, spotifyAccessToken]);

  if (isLoading) return null;

  return (
    <div className="text-center">
      <div className="flex flex-col w-9/12 h-full max-w-sm mx-auto mt-10">
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
