import React from 'react';
import Link from 'next/link';
import { getSpotifyUserAlbums } from '@/lib/actions/getSpotifyUserAlbums';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { postReleases } from '@/lib/models/releases.model';

export default async function Dashboard() {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  if (!spotifyToken) redirect('/');
  
  let userAlbums = await getSpotifyUserAlbums(spotifyToken);
  if (userAlbums) {
    postReleases(userAlbums).then(res =>  console.log('CREATE Album'));
  }
  
  return (
    <>
      {!userAlbums ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>Sherlock there's trouble</p>
      ) : (
        <>
          <h1>Hi, Juan</h1>
          <div className='flex flex-col gap-5 mt-12'>
            <Link href='/collection' className='btn btn-primary h-16 mx-4'>
              Music Collection
            </Link>
            <Link href='/market' className='btn btn-secondary h-16 mx-4'>
              Recommendations
            </Link>
          </div>
        </>
      )}
    </>
  );
}

