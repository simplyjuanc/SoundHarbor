import { Track } from '@prisma/client';

export default function TrackList({ tracklist }: { tracklist: Track[] }) {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">
      <li>
        <h2 className="menu-title">Tracks</h2>
        <ul>
          {tracklist &&
            tracklist.map(track => (
              <li key={track.id}>
                <span>{track.title}</span>
                <span>{track.duration}</span>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
}
