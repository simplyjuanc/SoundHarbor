import React from 'react';
import { findUserReleases } from '@/lib/models/users.model';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';

export default async function Collection() {
  const releasesOwned = await findUserReleases('testUser');

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

/* (
  <div
    key={release.id}
    className='card card-compact text-black shadow-xl bg-primary w-[250px]'
  >
    <figure>
      <Image
        src='/folamour-test.jpeg'
        alt='Music!'
        width={250}
        height={250}
      />
    </figure>
    <div className='card-body'>
      <h2 className='card-title'>{release.label}</h2>
      <p className='text-xs'>
        If a dog chews shoes whose shoes does he choose?
      </p>
    </div>
  </div>
) */
