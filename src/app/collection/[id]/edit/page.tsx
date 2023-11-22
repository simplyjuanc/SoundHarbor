import { getRelease, updateRelease } from '@/lib/models/releases.model';
import React from 'react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Button from '@/components/Button';

type Props = {
  params: { id: string };
};

const RecordEdit = async ({ params }: Props) => {
  const { id } = params;
  const record = await getRelease(id);

  const releaseDate = record.releaseDate
    ? record.releaseDate.toDateString()
    : '';

  const releaseType = record.releaseType || '';
  const { title, label, artists } = record;

  const updateRecord = async (args: FormData) => {
    'use server';

    const updateFields: { [k: string]: string | string[] } = {};

    for (const pair of args.entries()) {
      if (!pair[1]) {
        continue;
      }

      if (pair[0] === 'artists') {
        updateFields[pair[0]] = pair[1].toString().split(',');
      } else {
        updateFields[pair[0]] = pair[1].toString();
      }
    }

    // console.log('RecordEdit - updateRecord - updateFields :>> ', updateFields);
    await updateRelease(id, updateFields);

    redirect(`/collection/${id}`);
  };

  const imgInfo = {
    width: 428,
    height: 428,
    alt: record.title,
    src: record.imgUrl || '/record-generic.jpg',
  };

  return (
    <>
      <Header img={imgInfo} type="record" backTo={`collection/${id}`} />
      <div className="max-w-md mx-auto px-12">
        <h1 className="text-2xl mt-4 mb-2 font-extrabold">{title}</h1>
        <form action={updateRecord} className="flex flex-col flex-nowrap gap-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="artists"
              className="min-w-[20%] max-w-[20%] mr-auto"
            >
              Artists
            </label>
            <input
              type="text"
              name="artists"
              id="artists"
              placeholder={artists.join(', ')}
              className="rounded w-full p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="label" className="min-w-[20%] max-w-[20%] mr-auto">
              Label
            </label>
            <input
              type="text"
              name="label"
              id="label"
              placeholder={label}
              className="rounded w-full p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="releaseType"
              className="min-w-[20%] max-w-[20%] mr-auto"
            >
              Type
            </label>
            <input
              type="text"
              name="releaseType"
              id="releaseType"
              placeholder={releaseType}
              className="rounded w-full p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="releaseDate"
              className="min-w-[20%] max-w-[20%] mr-auto"
            >
              Date
            </label>
            <input
              type="date"
              name="releaseDate"
              id="releaseDate"
              placeholder={releaseDate}
              className="rounded w-full p-2"
            />
          </div>
          <Button
            secondary
            text="Save Record"
            type="submit"
            btnClasses="mt-8 w-4/5 mx-auto"
          />
        </form>
      </div>
    </>
  );
};

export default RecordEdit;
