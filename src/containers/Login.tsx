import React from 'react';
import { useAuthStore } from '@/lib/authStore';
import {parseCookies} from '@/lib/utils/utils';


export default function Login() {

  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)

  function logIn() {
    setIsLoggedIn(true);
  }

  return (
    <form onSubmit={logIn}>
      <div className='flex flex-col gap-5 mt-12 justify-evenly  '>
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
      <div className='flex flex-row mt-12 w-full items-center justify-around gap-4'>
        <button type='submit' className='btn btn-primary h-16'>
          Log In
        </button>
        <button type='submit' className='btn btn-primary h-16'>
          Sign Up
        </button>
      </div>
    </form>
  );
}
