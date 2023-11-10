'use client';

import Home from '@/components/Home';
import Login from '@/components/Login';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  



  return (
    <div className='flex flex-col justify-center align-middle'>
      <Image
        src='/logo-no-background.svg'
        alt='logo'
        width={1500/7}
        height={935/7}
        className='m-5 mx-auto mt-16'
      />

      {loggedIn ? <Home/> : <Login setLoggedIn={setLoggedIn}/> }
    </div>
  );
}
