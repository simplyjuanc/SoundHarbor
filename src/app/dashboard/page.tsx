import { redirect } from 'next/navigation';
import { syncReleases } from '@/lib/actions/syncReleases';
import { getSpotifyToken } from '@/lib/utils/spotifyUtils';
import LogoView from '@/components/LogoView';
import Button from '@/components/Button';

export default async function Dashboard() {
  const spotifyToken = getSpotifyToken();
  if (!spotifyToken) {
    redirect('/');
  }

  await syncReleases(spotifyToken!);

  return (
    <div className="w-full">
      <div className="max-w-md text-center p-2 mx-auto mb-4 flex flex-col ">
        <LogoView />
        <h1 className="text-2xl my-5 font-extrabold">Hi, Juan</h1>
        <div>
          <p>We have synced your music collection already!</p>
          <p>
            You can check it here in the app, or you can explore for new goodies
            to add to it.
          </p>
        </div>

        <div className="flex flex-col gap-8 mt-12 px-6">
          <Button
            text="Music Collection"
            btnClasses="w-full bg-gradient-to-r from-primary to-emerald-700 h-16"
            link
            href="/collection"
          />
          <Button
            text="Recommendations"
            btnClasses="w-full bg-gradient-to-r from-secondary to-orange-700 h-16"
            link
            href="/recommendations"
          />
        </div>
        <p className="text-sm mt-16">
          We will be working in the background so that your music is kept up to
          date with your Discogs collection.
        </p>
      </div>
    </div>
  );
}
