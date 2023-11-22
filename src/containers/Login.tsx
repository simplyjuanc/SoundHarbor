'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';
import Button from '@/components/Button';

export default function Login() {
  const {
    spotifyAccessToken,
    setSpotifyAccessToken,
    discogsAccessToken,
    setDiscogsAccessToken,
    setIsLoggedIn,
  } = useAuthStore();

  const handleSubmit = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const cookieJar = parseCookies(document.cookie);

    if (!cookieJar) {
      return;
    }

    const { spotifyCookie, discogsCookie } = cookieJar;

    if (!discogsAccessToken && discogsCookie) {
      setDiscogsAccessToken(discogsCookie);
    }

    if (!spotifyAccessToken && spotifyCookie) {
      setSpotifyAccessToken(spotifyCookie);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mt-12 justify-evenly  ">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="rick.astley@soundharbor.music"
          required
          className="rounded p-2"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Never gonna..."
          required
          className="rounded p-2"
        />
      </div>
      <div className="flex flex-col gap-4 mt-12 w-full items-center justify-center ">
        <Button primary text="Log In" type="submit" btnClasses="w-10/12 h-6" />
        <Button primary text="Sign Up" type="submit" btnClasses="w-10/12 h-8" />
      </div>
    </form>
  );
}
