import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

type LoginProps = {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};



export default function Login({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsAuthenticated(_ => true);
  }

  function handleEmail(e:ChangeEvent) {
    setEmail(e.target.value);
  }

  function handlePassword(e:ChangeEvent) {
    setPassword(e.target.value);
  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={handleEmail}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={handlePassword}
          required
          minLength={8}
        />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}