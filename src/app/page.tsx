'use client';
import LoginSpotify from '@/containers/LoginSpotify';
import Login from '@/containers/Login';
import { useAuthStore } from '@/lib/authStore';
import LogoView from '@/components/LogoView';

export default function App() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <div className="text-center">
      <div className="max-w-sm w-9/12 flex flex-col mx-auto mt-10 h-full">
        <LogoView />
        {isLoggedIn ? <LoginSpotify /> : <Login />}
      </div>
    </div>
  );
}
