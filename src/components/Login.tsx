import React, { Dispatch, SetStateAction } from 'react';

export default function Login({setLoggedIn}:{setLoggedIn: Dispatch<SetStateAction<boolean>>}) {


  function logIn() {
    setLoggedIn(true)
  }


  return (
    <form onSubmit={logIn}>
      <div className='flex flex-col gap-5 mt-12 justify-evenly mx-12'>
        <input
          type='email'
          name='email'
          id='email'
          required
          className='rounded'
        />
        <input
          type='password'
          name='password'
          id='password'
          required
          className='rounded'
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
