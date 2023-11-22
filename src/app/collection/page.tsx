import React from 'react';
import { getAllReleases } from '@/lib/models/releases.model';
import { Release } from '@prisma/client';
import LogoView from '@/components/LogoView';
import Button from '@/components/Button';
import Header from '@/components/Header';
import CollectionList from '@/components/CollectionList';

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
        <div className="flex flex-wrap px-2 mx-auto gap-6 my-8 justify-center">
          {releases && <CollectionList releases={releases} />}
        </div>
      </div>
      <LogoView />
    </>
  );
}
