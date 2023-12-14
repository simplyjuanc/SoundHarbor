'use client';
import { useAuthStore } from '@/lib/authStore';
// import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { ChangeEvent, useState } from 'react';
import { baseUrl } from '@/lib/config';

export default function Login() {
  // const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
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

      if (!res.ok) throw new Error('No valid server response.')

      const data = await res.json();
      console.log('registerUser - data :>> ', data);
      // TODO store user info and session
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  const loginUser = async () => {

  }

  const handleUsernameChange = async (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(value)) {
      if (showUsernameWarning) setShowUsernameWarning(false);
      setUserData({ ...userData, username: value });
    } else setShowUsernameWarning(true);
  }



  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mt-12 justify-evenly ">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="RickAstley001"
          required
          className="p-2 rounded"
          value={userData.username}
          onChange={handleUsernameChange}
          />

        {showUsernameWarning && <p>Username can only contain alphanumeric characters!</p>}
        
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
