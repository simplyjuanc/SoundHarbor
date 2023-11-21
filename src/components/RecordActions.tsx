'use client';

import Button from '@/components/Button';

type Props = {
  spotifyUri: string | null;
  id: string;
  deleteRecord: Function;
};

const RecordActions = ({ spotifyUri, id, deleteRecord }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-6 justify-center mb-12">
      {spotifyUri && (
        <Button
          secondary
          text="Listen on Spotify"
          link
          href={spotifyUri}
          blank
        />
      )}
      {/* break line */}
      <div className="h-0 basis-full" />
      <Button warning text="Edit Record" link href={`/collection/${id}/edit`} />
      <Button error text=" Delete Record" onClick={deleteRecord} />
    </div>
  );
};

export default RecordActions;
