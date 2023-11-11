import Link from 'next/link';
import React, { useState } from 'react';



export default function LoginDiscogs() {
  const [isDiscogsConnected, setIsDiscogsConnected] = useState(false);

  function connectDiscogs() {
    setIsDiscogsConnected(true);
  }

  return (
    <>
      <div className='mx-12'>
        <h1>Fantastic!</h1>{' '}
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Now that we have connected to your Spotify account, let's get you set
          up with Discogs so that we can find music you might want to add to
          your collection!
        </p>
      </div>
      <Link href='/api/auth/discogs-login' className='btn btn-primary mx-16 mt-12' onClick={connectDiscogs}>
        Connect to Discogs
      </Link>
    </>
  );
}
