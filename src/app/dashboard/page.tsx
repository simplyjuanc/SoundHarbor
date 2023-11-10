import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <h1>Hi, [USER]</h1>
      <div className='flex flex-col gap-5 mt-12'>
        <Link href='/collection' className='btn btn-primary h-16 mx-4'>
          Music Collection
        </Link>
        <Link href='/market' className='btn btn-secondary h-16 mx-4'>
          Marketplace
        </Link>
      </div>
    </>
  );
}
