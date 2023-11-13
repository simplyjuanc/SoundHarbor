import React from 'react';
import { IDiscogsRelease } from '@/lib/utils/discogsUtils';


export default function Recommendation({ recommendation }:{recommendation:IDiscogsRelease}) {
  return (
    <div className='flex flex-row flex-nowrap flex-shrink bg-slate-800 justify-between items-center p-3 rounded-l'>
      <p className='w-ma'>{truncate(recommendation.title, 40)}</p>
      <button className='btn btn-secondary max-w-[80%]'>
        <a
          target='_blank'
          href={'https://www.discogs.com' + recommendation.uri}
        >
          Buy
        </a>
      </button>
    </div>
  );
}


function truncate(str:string, maxLength: number) {
  return str.length > maxLength ? str.substring(0, maxLength-3) + "..." : str;
}