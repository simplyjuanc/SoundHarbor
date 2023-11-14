import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { addNewReleases } from '@/lib/actions/addNewReleases';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const spotifyToken = cookies().get('spotify_access_token')?.value;
  const discogsReleasesOwned: any[] = await addNewReleases(spotifyToken!);
  console.log('discogsReleasesOwned[0] :>> ', discogsReleasesOwned[0]);

  return (
    <article className='mx-8 flex flex-col '>
      <Image
        src='/logo-no-background.svg'
        alt='logo'
        width={1500 / 7}
        height={935 / 7}
        className='m-5 mx-auto mt-16'
      />
      <h1 className='text-2xl my-5 font-extrabold'>Hi, Juan</h1>
      <div>
        <p>We have synced your music collection already!</p>
        <p>
          You can check it here in the app, or you can explore for new goodies
          to add to it.
        </p>
      </div>

      <div className='flex flex-col gap-8 mt-12 '>
        <Link
          href='/collection'
          className='btn bg-gradient-to-r from-primary to-emerald-700 h-16'
        >
          Music Collection
        </Link>
        <Link
          href='/recommendations'
          className='btn bg-gradient-to-r from-secondary to-orange-700  h-16'
        >
          Recommendations
        </Link>
      </div>
      <p className='text-sm mt-16'>
        We will be working in the background so that your music is kept up to
        date with your Discogs collection.
      </p>
    </article>
  );
}
