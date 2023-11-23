import { cookies } from 'next/headers';
import createRecord from '@/lib/actions/createManualRecord';
import Button from '@/components/Button';
import LogoView from '@/components/LogoView';

export default function AddRecord() {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  const boundCreateRecord = createRecord.bind(null, spotifyToken!);

  return (
    <div className="h-screen overflow-y-hidden items-center flex flex-col p-6">
      <h1 className="text-2xl my-5 font-extrabold">Add Record</h1>
      <div className="text-center">
        <p>
          Please input the artist and record title, we will retrieve it from
          Discogs and add it to your collection
        </p>
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          The more data you put in the easier it will be for us to find the
          right record.
          <br />
          <span className="text-xs">(Don't worry, you can edit it later)</span>
        </p>
      </div>
      <form
        action={boundCreateRecord}
        className="flex flex-col items-center gap-4 mt-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="min-w-[20%] max-w-[20%]">
            Title*
          </label>
          <input type="text" name="title" className="rounded px-2 " required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="artist" className="min-w-[20%] max-w-[20%]">
            Artist*
          </label>
          <input type="text" name="artist" className="rounded px-2 " required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="label" className="min-w-[20%] max-w-[20%]">
            Label
          </label>
          <input type="text" name="label" className="rounded px-2 " />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="releaseDate" className="min-w-[20%] max-w-[20%]">
            Released
          </label>
          <input type="text" name="releaseDate" className="rounded px-2 " />
        </div>
        <div className="flex flex-row flex-nowrap gap-4 w-full justify-center">
          <Button
            info
            text="Back"
            btnClasses="max-h-4 mt-8"
            link
            href="/collection"
          />
          <Button
            secondary
            text="Add"
            type="submit"
            btnClasses="max-h-4 mt-8"
          />
        </div>
      </form>
      <LogoView />
    </div>
  );
}
