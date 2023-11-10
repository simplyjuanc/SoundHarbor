'use client';
import { useStore } from '@/lib/store';

export default function App() {
  const isAuthenticated = useStore(state => state.isLoggedIn);

  return (
    <div className='App'>
      <h1>SoundHarbor Home</h1>
    </div>
  );
}
