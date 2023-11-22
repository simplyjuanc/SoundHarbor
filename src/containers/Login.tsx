import React from 'react';
import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';
import Button from '@/components/Button';

export default function Login() {
  const authStore = useAuthStore();

  const spotifyCookie = 'spotify_access_token';
  const discogsCookie = 'discogs_secret';
  const cookieJar = parseCookies(document.cookie);

  function logIn() {
    authStore.setIsLoggedIn(true);
  }

  if (!authStore.discogsAccessToken && cookieJar) {
    if (cookieJar[discogsCookie])
      authStore.setDiscogsAccessToken(cookieJar[discogsCookie]);
  }
  if (!authStore.spotifyAccessToken && cookieJar) {
    if (cookieJar[spotifyCookie]) {
      authStore.setSpotifyAccessToken(cookieJar[spotifyCookie]);
      authStore.setIsLoggedIn(true);
    }
  }

  //   if (cookieJar && cookieJar[discogsCookie]) {
  //     authStore.setSpotifyAccessToken(cookieJar[discogsCookie]);
  //   }
  // }

  console.log(
    'authStore.spotifyAccessToken :>> ',
    authStore.spotifyAccessToken
  );

  return (
    <form className="w-full" onSubmit={logIn}>
      <div className="flex flex-col gap-6 mt-12 justify-evenly">
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
