import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSpotifyUserAlbums } from '@/lib/actions/getSpotifyUserAlbums';
import { getDiscogsRecommendations } from '@/lib/utils/discogsUtils';
import { Release } from '@prisma/client';
import Recommendation from '@/components/Recommendation';
import { parseCookies } from '@/lib/utils/utils';

export default async function Recommendations() {
  const spotifyToken = getSpotifyCookie();
  // const spotifyToken = parseCookies(document.cookie)?.spotify_access_token;
  if (!spotifyToken) redirect('/');
  let userAlbums = await getSpotifyUserAlbums(spotifyToken);
  // console.log('userAlbums[0] :>> ', userAlbums[0]);

  let discogsRecommendations: Release[] = [];
  if (userAlbums) discogsRecommendations = await getDiscogsRecommendations(userAlbums);

  console.log('discogsRecommendations[0] :>> ', discogsRecommendations[0]);

  return (
    <div className='p-8'>
      <h1 className='mb-8'>Recommendations</h1>
      <div className='flex flex-col gap-3'>
        {discogsRecommendations &&
          discogsRecommendations.map((reco, index) => (
            <Recommendation
              key={reco.id || index}
              recommendation={reco}
            ></Recommendation>
          ))}
      </div>
    </div>
  );
}


function getSpotifyCookie(): string | undefined {
  const cookieJar = cookies();
  const spotifyToken = cookieJar.get('spotify_access_token')?.value;
  return spotifyToken;
}