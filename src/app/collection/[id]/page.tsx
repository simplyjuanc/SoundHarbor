import React from 'react';
import Image from 'next/image';
import { getRelease } from '@/lib/models/releases.model';
import { Release, Track } from '@prisma/client';
import TrackList from '@/components/TrackList';
import { getReleaseTracks } from '@/lib/models/tracks.model';

export default async function IndividualRecord({
  params,
}: {
  params: Release['id'];
}) {
  const record = await getRelease(params['id']);
  let tracklist:Track[] = [];
  if (record) tracklist = await getReleaseTracks(record.id);

  // TODO get tracklist from DB
  // might be necessary to create the record in the DB as well from when the album is fetched from Spotify
  // this should be done when requesting the collection
  console.log('record :>> ', record);
  return (
    <>
      {!record ? (
        'Apologies, something went wrong'
      ) : (
        <>
          <Image
            src={record.imgUrl ? record.imgUrl : 'No image found.'}
            alt={record.title}
            width={428}
            height={428}
          />
          <div className='flex flex-col mt-6 mx-auto px-16 w-full'>
            <h1>{record.title}</h1>
            <p>Artists: {record.artists.join(' | ')}</p>
            {tracklist && <TrackList tracklist={tracklist}></TrackList>}
            <h2>Album Info</h2>
            <div>
              <p>
                Label: <span>{record.label}</span>
              </p>
              <p>
                Release Type: {record.releaseType ? <span>{pascalCaseSingleWord(record.releaseType)}</span> : ''}
              </p>
              <p>
                Release Date: <span>{record.releaseDate ? record.releaseDate.toDateString() : ''}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}



function pascalCaseSingleWord(str:string): string {
  return str[0].toUpperCase() + str.slice(1);
}

