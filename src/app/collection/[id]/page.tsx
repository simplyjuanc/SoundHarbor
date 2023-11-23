import { redirect } from 'next/navigation';
import { deleteRelease, getRelease } from '@/lib/models/releases.model';
import Header from '@/components/Header';
import RecordActions from '@/components/RecordActions';
import RecordView from '@/components/RecordView';

type Props = {
  params: {
    id: string;
  };
};

const IndividualRecord = async ({ params: { id: recordId } }: Props) => {
  const record = await getRelease(recordId);

  if (!record) {
    return <p>Apologies, something went wrong</p>;
  }

  const { id, imgUrl, title, spotifyUri } = record;

  const deleteRecord = async () => {
    'use server';
    const deleted = await deleteRelease(id);

    if (deleted) {
      redirect('/collection');
    }
  };

  const imgInfo = {
    width: 428,
    height: 428,
    alt: title,
    src: imgUrl || '/record-generic.jpg',
  };

  return (
    <>
      <Header img={imgInfo} type="collection" />
      <div className="max-w-md mx-auto">
        <RecordView record={record} />
        <RecordActions
          spotifyUri={spotifyUri}
          id={id}
          deleteRecord={deleteRecord}
        />
      </div>
    </>
  );
};

export default IndividualRecord;

/*
  TODO (juan) get tracklist from DB
  might be necessary to create the record in the DB as well from when the album is fetched from Spotify
  this should be done when requesting the collection
  */
