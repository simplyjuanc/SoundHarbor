import { useAuthStore } from '@/lib/authStore';
import { redirect } from 'next/navigation';
import Button from '@/components/Button';

export default function LoginDiscogs() {
  const { discogsAccessToken } = useAuthStore();

  if (discogsAccessToken) {
    redirect('/dashboard');
  }

  return (
    <>
      <div className="flex flex-col mx-8">
        <h1>Fantastic!</h1>{' '}
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Now that we have connected to your Spotify account, let's get you set
          up with Discogs so that we can find music you might want to add to
          your collection!
        </p>
        <Button
          text="Connect to Discogs"
          primary
          btnClasses="mt-12 mx-auto self-center"
          link
          href="/api/auth/discogs-login"
        />
      </div>
    </>
  );
}
