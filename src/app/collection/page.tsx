import React from 'react';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';
import Link from 'next/link';
import { getAllReleases } from '@/lib/models/releases.model';
import { Release } from '@prisma/client';
import LogoView from '@/components/LogoView';
import Button from '@/components/Button';
import Header from '@/components/Header';

export default async function Collection() {
  // const spotifyToken = cookies().get('spotify_access_token')?.value;
  const releases: Release[] = await getAllReleases();
  // console.log('discogsReleasesOwned[0] :>> ', discogsReleasesOwned[0]);

  const imgInfo = {
    width: 4912 / 10,
    height: 3264 / 10,
    alt: 'collection image',
    src: '/record-collection.jpg',
  };

  return (
    <>
      <Header img={imgInfo} type="dashboard" />
      <div className="mx-3">
        <div className="m-4 mt-6 flex flex-row justify-between align-middle">
          <h1 className="text-3xl font-extrabold">Collection</h1>
          <Button
            secondary
            text="Add record"
            link
            href="collection/add-record"
          />
        </div>
        <div className="flex flex-wrap mx-auto gap-6 my-8 justify-center">
          {releases &&
            releases.map(release => (
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
      <LogoView></LogoView>
    </>
  );
}
