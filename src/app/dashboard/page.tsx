import React from 'react';
import Link from 'next/link';
import { postUser } from '@/lib/models/users.model';
import { User } from '@prisma/client';
import { getSpotifyUserAlbums } from '@/lib/actions/getSpotifyUserAlbums';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function Dashboard() {
  
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  if (!spotifyToken) redirect('/');
  const userAlbums = await getSpotifyUserAlbums(spotifyToken)
  
  return (
    <>
      <h1>Hi, Juan</h1>
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


async function addNewUser() {
  const newUser:User = {
    id: generateRandomId(8),
    username: generateRandomUsername(10),
    firstName: 'Juan',
    lastName: 'Vasquez',
    createdAt: null,
    updatedAt: null
  }

  return postUser(newUser);
}


function generateRandomId(length:number) {
  const characters = '0123456789';
  let identifier = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    identifier += characters.charAt(randomIndex);
  }

  return Number(identifier);
}

function generateRandomUsername(length:number):string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let identifier = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    identifier += characters.charAt(randomIndex);
  }

  return identifier;
}
