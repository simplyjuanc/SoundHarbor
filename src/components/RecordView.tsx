import { Release } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

export default function RecordView({ record }: { record: Release }) {
  return (
    <>
      <div className='p-2'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th aria-colspan={2} className='text-lg'>
                Release Info
              </th>
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
              <td className='text-primary text-lg'>{record.releaseType}</td>
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
      </div>
    </>
  );
}
