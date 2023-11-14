import { Release } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import { truncate } from '@/lib/utils/utils';




export default function RecordCard({ release }: { release: Release }) {
  // console.log('release :>> ', release);
  // const artistNames = release.artists.map(artist => artist.name)
  // REMOVE_START
  const artistNames = release.artists;
  // REMOVE_END
  return (
    <article className='card card-compact text-black shadow-xl bg-primary w-[150px] h-[150px] cursor-pointer'>
      <figure>
        <Image src={release.imgUrl!} alt={release.title + ' album cover'} width={150} height={150} />
      </figure>
      <div className='card-body h-16'>
        <h2 className='card-title text-base pb-1'>{truncate(release.title, 27)}</h2>
        {/* <div className='flex gap-1'>
          <div>
            <h3 className='text-sm font-semibold'>Artist</h3>
            <p className='text-xs'>
              {artistNames.join(', ')}
            </p>
          </div>
          <div>
            <h3 className='text-sm font-semibold'>Label</h3>
            <p className='text-xs'>{release.labels[0].name}</p>
          </div>
          <div>
            <h3 className='text-sm font-semibold'>Released</h3>
            <p className='text-xs'>{release.year}</p>
          </div>
        </div> */}
      </div>
    </article>
  );
}
