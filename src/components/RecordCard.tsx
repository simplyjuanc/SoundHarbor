import { Release } from '@prisma/client';
import React from 'react';
import Image from 'next/image';




export default function RecordCard({ release }: { release: DiscogsItem }) {
  // console.log('release :>> ', release);
  const artistNames = release.artists.map(artist => artist.name)
  return (
    <article className='card card-compact text-black shadow-xl bg-primary w-[150px] h-[150px] cursor-pointer'>
      <figure>
        <Image src={release.cover_image} alt='Music!' width={150} height={150} />
      </figure>
      <div className=' pb-0 card-body'>
        <h2 className='card-title text-base '>{release.title}</h2>
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
