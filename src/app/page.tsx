'use client';

import Login from '@/containers/Login';
import Image from 'next/image';
import { useState } from 'react';
import Home from '@/containers/Home';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='App'>
      <h1>SoundHarbor Home</h1>
      {isAuthenticated ? (
        <Home />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}
