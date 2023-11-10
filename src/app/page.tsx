'use client';

import LoginSpotify from '@/components/LoginSpotify';
import Login from '@/components/Login';
import Image from 'next/image';
import { useAuthStore } from '@/lib/authStore';

export default function App() {

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <div className='flex flex-col justify-center align-middle'>
      <Image
        src='/logo-no-background.svg'
        alt='logo'
        width={1500/7}
        height={935/7}
        className='m-5 mx-auto mt-16'
      />
      {isLoggedIn ? <LoginSpotify/> : <Login /> }
    </div>
  );
}
