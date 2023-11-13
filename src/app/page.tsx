'use client';
import LoginSpotify from '@/containers/LoginSpotify';
import Login from '@/containers/Login';
import Image from 'next/image';
import { useAuthStore } from '@/lib/authStore';
import {parseCookies} from '@/lib/utils/utils';


export default function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  
  
  
  // TODO next step is to avoid Spotify to show up after log in
  // useEffect(() => {
  //   const cookieJar = parseCookies(document.cookie);

  //   let spotifyCookie;
  //   if (cookieJar) spotifyCookie = cookieJar['spotify_access_token'];

  //   console.log('cookieJar :>> ', cookieJar);
  //   if (!isLoggedIn || !spotifyCookie) {
  //     setIsLoggedIn(false);
  //   }
  // }, [isLoggedIn, setIsLoggedIn]);

  return (
    <div className='flex flex-col mx-8 h-full'>
      <Image
        src='/logo-no-background.svg'
        alt='logo'
        width={1500 / 7}
        height={935 / 7}
        className='m-5 mx-auto mt-16'
      />
      <article className=''>
      {isLoggedIn ? <LoginSpotify /> : <Login />}
      </article>
    </div>
  );
}
