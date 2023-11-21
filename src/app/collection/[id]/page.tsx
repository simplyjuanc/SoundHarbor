import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { deleteRelease, getRelease } from '@/lib/models/releases.model';
import RecordView from '@/components/RecordView';
import RecordActions from '@/components/RecordActions';

type Props = {
  params: {
    id: string;
  };
};

const IndividualRecord = async ({ params: { id: recordId } }: Props) => {
  const record = await getRelease(recordId);

  if (!record) {
    return <p>Apologies, something went wrong</p>;
  }

  const { id, imgUrl, title, spotifyUri } = record;

  const deleteRecord = async () => {
    'use server';
    const deleted = await deleteRelease(id);

    if (deleted) {
      redirect('/collection');
    }
  };

  return (
    <>
      <Image
        src={imgUrl || '/record-generic.jpg'}
        alt={title}
        width={428}
        height={428}
      />
      <Link
        href="/collection"
        className="link link-secondary font-thin text-sm ml-4 mt-8"
      >
        Back to Collection
      </Link>
      <RecordView record={record} />
      <RecordActions
        spotifyUri={spotifyUri}
        id={id}
        deleteRecord={deleteRecord}
      />
    </>
  );
};

export default IndividualRecord;

/*
  TODO (juan) get tracklist from DB
  might be necessary to create the record in the DB as well from when the album is fetched from Spotify
  this should be done when requesting the collection
  */
