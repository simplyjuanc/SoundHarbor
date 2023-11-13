
import createRecord from '@/lib/actions/createManualRecord';
// import { getSpotifyCookie } from '@/lib/utils/utils';
import { cookies } from 'next/headers';
import React from 'react';


export default function AddRecord () {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  const boundCreateRecord = createRecord.bind(null, spotifyToken!)


  return (
    <div className='items-center flex flex-col p-8'>
      <h1 className='my-8'>Add record</h1>
      <p className='mx-8'>
        Please input the artist and record title, we will retrieve it from Discogs and add it to your collection
      </p>
      <p className='mx-8'>
        The more data you put in the easier it will be for us to find the right record.
      </p>
      <form
        action={boundCreateRecord}
        className='flex flex-col w-4/5 items-center gap-4 mt-12'
      >
        <div className='flex flex-nowrap justify-around gap-2'>
          <label htmlFor='title' className='min-w-[20%] max-w-[20%]'>Title*</label>
          <input type='text' name='title' className='rounded px-2 ' required/>
        </div>
        
        <div className='flex flex-nowrap justify-around gap-2'>
          <label htmlFor='artist' className='min-w-[20%] max-w-[20%]'>Artist*</label>
          <input type='text' name='artist' className='rounded px-2 ' required/>
        </div>
        
        <div className='flex flex-nowrap justify-around gap-2'>
          <label htmlFor='label' className='min-w-[20%] max-w-[20%]'>Label</label>
          <input type='text' name='label' className='rounded px-2 '/>
        </div>
        
        <div className='flex flex-nowrap justify-around gap-2'>
          <label htmlFor='releaseDate' className='min-w-[20%] max-w-[20%]'>Released</label>
          <input type='text' name='releaseDate' className='rounded px-2 '/>
        </div>

        <button type='submit' className='btn btn-secondary max-h-4 mt-8'> 
          Add record
        </button>
      </form>
    </div>
  );
}
