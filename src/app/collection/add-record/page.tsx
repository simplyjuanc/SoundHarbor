
import LogoView from '@/components/LogoView';
import createRecord from '@/lib/actions/createManualRecord';
// import { getSpotifyCookie } from '@/lib/utils/utils';
import { cookies } from 'next/headers';
import React from 'react';
import Button from '@/components/Button'


export default function AddRecord () {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  const boundCreateRecord = createRecord.bind(null, spotifyToken!)


  return (
    <div className='items-center flex flex-col p-8'>
      <h1 className='text-2xl my-5 font-extrabold'>Add Record</h1>
      <p className='mx-8'>
        Please input the artist and record title, we will retrieve it from Discogs and add it to your collection
      </p>
      <p className='mx-8'>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        The more data you put in the easier it will be for us to find the right record.<span className='text-xs'>(Don't worry, you can edit it later)</span>
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
        <div className='flex flex-row flex-nowrap gap-4 w-full justify-center'>
        <Button
            info
            text="Back"
            btnClasses="max-h-4 mt-8"
            link
            href="/collection"
          />
        <button type='submit' className='btn btn-secondary max-h-4 mt-8 w-[30%]'>
          Add
        </button>
        </div>
      </form>
      <LogoView></LogoView>
    </div>
  );
}
