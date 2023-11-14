import React from 'react';
import Image from 'next/image';
import { deleteRelease, getRelease } from '@/lib/models/releases.model';
import { Release, Track } from '@prisma/client';
import Link from 'next/link';
// import TrackList from '@/components/TrackList';
import { getReleaseTracks } from '@/lib/models/tracks.model';
import RecordView from '@/components/RecordView';
import { redirect } from 'next/navigation';

export default async function IndividualRecord({
  params,
}: {
  params: Release['id'];
}) {
  const record: Release = await getRelease(params['id']);
  let tracklist: Track[] = [];
  if (record) tracklist = await getReleaseTracks(record.id);

  const deleteRecord = async () => {
    'use server';
    const deleted =  await deleteRelease(record.id);
    if (deleted) redirect('/collection')
  }

  return (
    <>
      {!record ? (
        'Apologies, something went wrong'
      ) : (
        <article>
          <Image
            src={record.imgUrl ? record.imgUrl : '/record-generic.jpg'}
            alt={record.title}
            width={428}
            height={428}
          />
          <Link
            href='/collection'
            className='link link-secondary font-thin text-sm ml-4 mt-8'
          >
            Back to Collection
          </Link>
          <div className='px-12'>
            <h1 className='text-2xl my-5 font-extrabold'>{record.title}</h1>
            <RecordView record={record}></RecordView>
          </div>
          <div className='flex flex-row flex-nowrap gap-4 justify-center mb-12'>
            <Link
              className='btn btn-warning'
              href={`/api/collection/${record.id}/edit`}
            >
              Edit Record
            </Link>
            {/* TODO: non-priority - there has to be a better way to do this */}
            <form action={deleteRecord}>  
              <button type='submit' className='btn btn-error'>
                Delete Record
              </button>
            </form>
          </div>
        </article>
      )}
    </>
  );
}

/* 
  TODO get tracklist from DB
  might be necessary to create the record in the DB as well from when the album is fetched from Spotify
  this should be done when requesting the collection 
  */
