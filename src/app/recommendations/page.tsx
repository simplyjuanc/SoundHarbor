import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getSpotifyToken } from '@/lib/utils/spotifyUtils';
import LogoView from '@/components/LogoView';
import LogoViewSpinner from '@/components/LogoViewSpinner';
import Header from '@/components/Header';
import RecommendationList from '@/components/RecommendationList';

export default async function Recommendations() {
  const spotifyToken = getSpotifyToken();
  if (!spotifyToken) {
    redirect('/');
  }

  const imgInfo = {
    width: 4912 / 10,
    height: 3264 / 10,
    alt: 'Collection image',
    src: '/record-recommendations.jpg',
  };

  return (
    <>
      <Header img={imgInfo} type="dashboard" />
      <div className="mx-12 mt-6 flex flex-col justify-between items-center">
        <h1 className="text-3xl font-extrabold">Recommendations</h1>
        <Suspense fallback={<LogoViewSpinner />}>
          <div className="w-full flex flex-col gap-3 mt-8">
            <RecommendationList />
          </div>
          <LogoView />
        </Suspense>
      </div>
    </>
  );
}
