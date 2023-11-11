import { Release } from '@prisma/client';
import React from 'react';
import Image from 'next/image';

export default function RecordCard({ release }: { release: Release }) {
  return (
    <article className='card card-compact text-black shadow-xl bg-primary w-[250px] cursor-pointer'>
      <figure>
        <Image src={release.imgUrl} alt='Music!' width={250} height={250} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{release.title}</h2>
        <div className='flex gap-1'>
          <div>
            <h3 className='text-sm font-semibold'>Artist</h3>
            <p className='text-xs'>
              {release.artists.join(', ')}
            </p>
          </div>
          <div>
            <h3 className='text-sm font-semibold'>Label</h3>
            <p className='text-xs'>{release.label}</p>
          </div>
          <div>
            <h3 className='text-sm font-semibold'>Released</h3>
            <p className='text-xs'>{release.releaseDate.toDateString()}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
