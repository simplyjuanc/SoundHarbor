import Image from 'next/image';
import type { Release } from '@prisma/client';
import { truncate } from '@/lib/utils/utils';

export default function RecordCard({ release }: { release: Release }) {
  return (
    <article className="card card-compact text-black shadow-xl bg-primary w-[150px] h-[150px] cursor-pointer">
      <figure>
        <Image
          src={release.imgUrl!}
          alt={release.title + ' album cover'}
          width={150}
          height={150}
        />
      </figure>
      <div className="card-body h-16">
        <h2 className="card-title text-base pb-1">
          {truncate(release.title, 27)}
        </h2>
      </div>
    </article>
  );
}
