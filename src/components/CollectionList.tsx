import type { Release } from '@prisma/client';
import Link from 'next/link';
import RecordCard from '@/components/RecordCard';

type Props = {
  releases: Release[];
};

const CollectionList = ({ releases }: Props) => {
  return (
    <>
      {releases.map(release => {
        const { id } = release;

        return (
          <Link href={`collection/${id}`} key={id}>
            <RecordCard key={id} release={release} />
          </Link>
        );
      })}
    </>
  );
};

export default CollectionList;
