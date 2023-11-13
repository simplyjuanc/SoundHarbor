import React from 'react';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';
import {
  getDiscogsRelease,
  getDiscogsReleasesThrottled,
  getUserItems,
  parseDiscogsRelease,
} from '@/lib/utils/discogsUtils';
import { getAllReleases, postReleases } from '@/lib/models/releases.model';
import { searchQuery, searchSpotify } from '@/lib/utils/spotifyUtils';
import { cookies } from 'next/headers';

export default async function Collection() {
  // TODO: Add back button

  const releasesOwned = await getAllReleases();
  const releasesIds: string[] = releasesOwned.map((release) => release.id);
  const discogsReleasesOwned: any[] = JSON.parse(getUserItems).releases;
  const discogsReleasesIds: string[] = discogsReleasesOwned.map(
    (release) => release.id
  );

  const newReleasesIds = discogsReleasesIds.filter(
    (id) => releasesIds.indexOf(id) === -1
  );
  const newReleasesOwned = await getDiscogsReleasesThrottled(newReleasesIds);
  const parsedReleases = newReleasesOwned.map((release) =>
    parseDiscogsRelease(release)
  );

  const spotifyToken = cookies().get('spotify_access_token')?.value;
  // const spotifyData = await Promise.all(
  //   parsedReleases.map((release) => {
  //     const query: searchQuery = {
  //       artist: release.artists[0],
  //       album: release.title,
  //       // upc: release.barcode,
  //     };
  //     return searchSpotify(query, ['album'], spotifyToken!);
  //   })
  // );
  const spotifyData = await searchSpotify({artist:'Taylor Swift', album: '1989'}, ['album'], spotifyToken!)
  console.log('spotifyData :>> ', spotifyData[0]);
  // console.log('Collection - newReleasesIds :>> ', newReleasesIds);

  // upsertReleases(parsedReleases);

  // NEXT STEPS: and then search for the SPotify complementary data

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
                  release={release.basic_information}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
