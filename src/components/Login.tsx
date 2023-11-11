import React from 'react';
import { useAuthStore } from '@/lib/authStore';
import parseCookies from '@/lib/utils/parseCookies';


export default function Login() {

  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)

  function logIn() {
    setIsLoggedIn(true);
  }

  return (
    <form onSubmit={logIn}>
      <div className='flex flex-col gap-5 mt-12 justify-evenly mx-12'>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='rick.astley@sh.music'
          required
          className='rounded px-2'
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Never gonna...'
          required
          className='rounded px-2'
        />
      </div>
      <div className='flex flex-row mt-12 w-full justify-evenly'>
        <button type='submit' className='btn btn-primary h-16 mx-2'>
          Log In
        </button>
        <button type='submit' className='btn btn-primary h-16 mx-2'>
          Sign Up
        </button>
      </div>
    </form>
  );
}
