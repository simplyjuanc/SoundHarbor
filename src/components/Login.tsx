'use client';
import { useAuthStore } from '@/lib/authStore';
import Button from '@/components/Button';
import { useState } from 'react';
import { baseUrl } from '@/lib/config';
import { signIn } from 'next-auth/react';
import { User } from '@prisma/client';


export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [showUsernameWarning, setShowUsernameWarning] = useState(false);

  const { setIsLoggedIn } = useAuthStore();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent.submitter as HTMLButtonElement).name 

    if (submitter === 'log-in') {
      loginUser()

    } else {
      registerUser();

    }

    setIsLoggedIn(true);
  };

  const registerUser = async () => {
    try {
      console.log('userData :>> ', userData);
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (res.status >= 400) throw new Error(res.statusText)
      
      const data:User = await res.json();

      console.log('registerUser - data :>> ', data);
      signIn('credentials', {...userData, redirect: false})
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  const loginUser = async () => {
    signIn('credentials', {...userData, redirect: false})
    setIsLoggedIn(true);
  }


  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mt-12 justify-evenly ">

        <input
          type="email"
          name="email"
          id="email"
          placeholder="rick.astley@soundharbor.live"
          required
          className="p-2 rounded"
          value={userData.email}
          onChange={(e) =>  {setUserData({ ...userData, email: e.target.value })}}
          />
        
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Never gonna..."
          required
          className="p-2 rounded"
          value={userData.password}
          onChange={(e) =>  {setUserData({ ...userData, password: e.target.value })}}
        />
        
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4 mt-12 ">
        <Button primary name='log-in' text="Log In" type="submit" btnClasses="w-10/12 h-6" />
        <Button primary name='sign-up'  text="Sign Up" type="submit" btnClasses="w-10/12 h-8" />
      </div>
    </form>
  );
}
