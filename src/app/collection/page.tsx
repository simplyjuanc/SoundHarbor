import React from 'react';
import { findUserReleases } from '@/lib/models/users.model';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';

export default async function Collection() {
  const releasesOwned = await findUserReleases('testUser');
  // TODO: GET DISCOGS USER RECORDS
  // TODO: Add back button
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
          <button className='btn btn-secondary max-h-4'>Add record</button>
        </div>
        <div className='flex flex-col items-center gap-6 mt-8'>
          {releasesOwned &&
            releasesOwned.map((release) => (
              <Link href={`collection/${release.id}`} key={release.id}>
                <RecordCard key={release.id} release={release} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

