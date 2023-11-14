import React from 'react';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';
import { getAllReleases } from '@/lib/models/releases.model';
import { Release } from '@prisma/client';

export default async function Collection() {

  // const spotifyToken = cookies().get('spotify_access_token')?.value;
  const releases: Release[] = await getAllReleases();
  // console.log('discogsReleasesOwned[0] :>> ', discogsReleasesOwned[0]);

  return (
    <>
      <Image
        width={4912 / 10}
        height={3264 / 10}
        alt='collection image'
        src={'/record-collection.jpg'}
      />
       <Link href='/dashboard' className='link link-secondary font-thin text-sm ml-4 mt-8'>Back to Dashboard</Link>
      <div className='mx-3'>
        <div className='m-4 mt-6 flex flex-row justify-between align-middle'>
          <h1 className='text-3xl font-extrabold'>Collection</h1>
          <Link href={'collection/add-record'}>
            <button className='btn btn-secondary'>Add record</button>
          </Link>
        </div>
        <div className='flex flex-wrap mx-auto gap-6 my-8 justify-center'>
          {releases &&
            releases.map((release) => (
              <Link href={`collection/${release.id}`} key={release.id}>
                <RecordCard
                  key={release.id}
                  //TODO Switch back on once retrieving data
                  // release={release.basic_information} 
                  release={release}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

