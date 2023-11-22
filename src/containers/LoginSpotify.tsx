import { useEffect } from 'react';
import LoginDiscogs from './LoginDiscogs';
import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';
import Button from '@/components/Button';

export default function LoginSpotify() {
  const { spotifyAccessToken, setSpotifyAccessToken } = useAuthStore();

  useEffect(() => {
    const cookieJar = parseCookies(document.cookie);

    if (cookieJar) {
      const { spotify_access_token: spotifyCookie } = cookieJar;

      if (!spotifyAccessToken && spotifyCookie) {
        setSpotifyAccessToken(spotifyCookie);
      }
    }
  }, []);

  return (
    <>
      {spotifyAccessToken ? (
        <LoginDiscogs />
      ) : (
        <div className="flex flex-col">
          <div className="mx-8">
            <h1 className="my-8 font-semibold">Welcome!</h1>
            <p className="my-6">
              First things first, we need to get you set up!
            </p>
            <p className="my-6">
              This means that we will first need to connect your Spotify account
              so that we can get an idea of what kind of music you like.
            </p>
          </div>
          <Button
            text="Connect to Spotify"
            primary
            btnClasses="mt-12 mx-auto self-center"
            link
            href="/api/auth/spotify-login"
          />
        </div>
      )}
    </>
  );
}
