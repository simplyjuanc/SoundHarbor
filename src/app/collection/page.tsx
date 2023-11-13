import React from 'react';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { addNewReleases } from '../../lib/actions/addNewReleases';

export default async function Collection() {
  // TODO: Add back button
  const spotifyToken = cookies().get('spotify_access_token')?.value;
  const discogsReleasesOwned: any[] = await addNewReleases(spotifyToken!);
  console.log('discogsReleasesOwned[0] :>> ', discogsReleasesOwned[0]);

  return (
    <>
      <Image
        width={4912 / 10}
        height={3264 / 10}
        alt='collection image'
        src={'/record-collection.jpg'}
      />
      <div className='mx-3'>
        <div className='m-4 mt-6 flex flex-row justify-between align-middle'>
          <h1 className='text-3xl'>Collection</h1>
          <Link href={'collection/add-record'}>
            <button className='btn btn-secondary max-h-4'>Add record</button>
          </Link>
        </div>
        <div className='flex flex-wrap mx-auto gap-6 mt-8'>
          {discogsReleasesOwned &&
            discogsReleasesOwned.map((release) => (
              <Link href={`collection/${release.id}`} key={release.id}>
                <RecordCard
                  key={release.id}
                  // release={release.basic_information} TODO Swithc back on once retrieving data
                  release={release}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

