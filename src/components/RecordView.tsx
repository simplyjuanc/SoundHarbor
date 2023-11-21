import { Release } from '@prisma/client';
import React from 'react';
import RecordTable from '@/components/RecordTable';

type Props = {
  record: Release;
};

export default function RecordView({ record }: Props) {
  const { title } = record;

  return (
    <div className="px-6 mb-10">
      <h1 className="text-2xl my-5 font-extrabold">{title}</h1>
      <RecordTable title="Release Info" record={record} />
    </div>
  );
}
