import React from 'react';
import Image from 'next/image';
import { getRelease } from '@/lib/models/releases.model';
import { Release, Track } from '@prisma/client';
import Link from 'next/link';
import TrackList from '@/components/TrackList';
import { getReleaseTracks } from '@/lib/models/tracks.model';

export default async function IndividualRecord({
  params,
}: {
  params: Release['id'];
}) {
  const record = await getRelease(params['id']);
  let tracklist: Track[] = [];
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
            <div className='p-2'>
              <table className='table table-zebra'>
                <thead>
                  <tr>
                    <th aria-colspan={2} className='text-lg'>Release Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='font-semibold text-base'>Artists</td>
                    <td className='text-primary text-lg'>
                      {record.artists.join(' | ')}
                    </td>
                  </tr>
                  <tr>
                    <td className='font-semibold text-base'>Label</td>
                    <td className='text-primary text-lg'>{record.label}</td>
                  </tr>
                  <tr>
                    <td className='font-semibold text-base'>Release Type</td>
                    <td className='text-primary text-lg'>
                      {record.releaseType}
                    </td>
                  </tr>
                  <tr>
                    <td className='font-semibold text-base'>Release Date</td>
                    <td className='text-primary text-lg'>
                      {record.releaseDate?.toDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex flex-row flex-nowrap gap-4 justify-around items-center'>
              {record.spotifyUri && (
                <Link
                  href={record.spotifyUri}
                  target='_blank'
                  className='btn btn-secondary my-8 mx-auto'
                >
                  Listen on Spotify
                </Link>
              )}
              {record.discogsUrl && (
                <Link
                  href={record.discogsUrl}
                  target='_blank'
                  className='btn btn-secondary my-8 mx-auto'
                >
                  Sell on Discogs
                </Link>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
}
