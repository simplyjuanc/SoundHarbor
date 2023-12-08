import type { Release } from '@prisma/client';
import TableRow from '@/components/TableRow';

type Props = {
  title: string;
  record: Release;
};

const RecordTable = ({ title, record }: Props) => {
  const { artists, label, releaseType, releaseDate } = record;

  return (
    <div className="p-2">
      <table className=" p-2 table table-zebra">
        <thead>
          <TableRow head title={title} />
        </thead>
        <tbody>
          <TableRow title="Artist" content={artists.join(' | ')} />
          <TableRow title="Label" content={label} />
          <TableRow title="Release Type" content={releaseType} />
          <TableRow
            title="Release Date"
            content={releaseDate?.toDateString()}
          />
        </tbody>
      </table>
    </div>
  );
};
export default RecordTable;
