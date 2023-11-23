import type { Release } from '@prisma/client';
import RecordTable from '@/components/RecordTable';

type Props = {
  record: Release;
};

export default function RecordView({ record }: Props) {
  const { title } = record;

  return (
    <div className="px-6 mb-10">
      <h1 className="text-center text-2xl my-5 font-extrabold">{title}</h1>
      <RecordTable title="Release Info" record={record} />
    </div>
  );
}
