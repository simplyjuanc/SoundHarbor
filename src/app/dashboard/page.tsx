import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { syncReleases } from '@/lib/actions/syncReleases';
import { cookies } from 'next/headers';
import LogoView from '@/components/LogoView';

export default async function Dashboard() {
  const spotifyToken = cookies().get('spotify_access_token')?.value;
  const discogsReleasesOwned: any[] = await syncReleases(spotifyToken!);
  // console.log('discogsReleasesOwned[0] :>> ', discogsReleasesOwned[0]);

  return (
    <article className='mx-8 flex flex-col '>
      <LogoView></LogoView>
      <h1 className='text-2xl my-5 font-extrabold'>Hi, Juan</h1>
      <div>
        <p>We have synced your music collection already!</p>
        <p>
          You can check it here in the app, or you can explore for new goodies
          to add to it.
        </p>
      </div>

      <div className='flex flex-col gap-8 mt-12 mx-10'>
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
