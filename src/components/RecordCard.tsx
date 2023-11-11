import { Release } from '@prisma/client';
import React from 'react';
import Image from 'next/image';

export default function RecordCard({ release }: { release: Release }) {
  return (
    <article className='card card-compact text-black shadow-xl bg-primary w-[250px] cursor-pointer'>
      <figure>
        <Image src={release.spotifyUri} alt='Music!' width={250} height={250} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{release.label}</h2>
        <div className='flex gap-1'>
          <div>
            <h3 className='text-sm'>Artist</h3>
            <p className='text-xs'>
              Artist Value
              {/* {release.artist} */}
            </p>
          </div>
          <div>
            <h3 className='text-sm'>Label</h3>
            <p className='text-xs'>Label Value</p>
          </div>
          <div>
            <h3 className='text-sm'>Release Date</h3>
            <p className='text-xs'>Release value</p>
          </div>
        </div>
      </div>
    </article>
  );
}
