import { useAuthStore } from '@/lib/authStore';
import { parseCookies } from '@/lib/utils/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginDiscogs() {
  const authStore = useAuthStore();

  if (!authStore.discogsAccessToken) {
    const cookieJar = parseCookies(document.cookie);
    const discogsCookie = 'discogs_secret';

    if (cookieJar && cookieJar[discogsCookie]) {
      const token = cookieJar[discogsCookie];
      authStore.setDiscogsAccessToken(token);
    }
  }

  const [isDiscogsConnected, setIsDiscogsConnected] = useState(false);

  function connectDiscogs() {
    setIsDiscogsConnected(true);
  }

  return (
    <>
      {authStore.discogsAccessToken ? (
        redirect('/dashboard')
      ) : (
        <div className='flex flex-col mx-8'>
          <h1>Fantastic!</h1>{' '}
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Now that we have connected to your Spotify account, let's get you
            set up with Discogs so that we can find music you might want to add
            to your collection!
          </p>
          <Link
            href='/api/auth/discogs-login'
            className='btn btn-primary mt-12 mx-auto self-center'
            onClick={connectDiscogs}
          >
            Connect to Discogs
          </Link>
        </div>
      )}
    </>
  );
}
