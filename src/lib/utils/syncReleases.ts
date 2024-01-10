import type { Release } from '@prisma/client';
import { postReleases } from '@/lib/models/releases.model';
import { getDiscogsReleases } from '@/lib/services/discogsServices';
import { getDiscogsReleasesBasicInfo } from '@/lib/utils/discogsUtils';
import { getFullReleaseData } from '@/lib/utils/releaseUtils';

//TODO currently  working with mock data, need to make sure I can get all the info from both services
export async function syncReleases(spotifyToken: string): Promise<Release[]> {
  const newReleasesResponse = getDiscogsReleases();
  const newReleases = getDiscogsReleasesBasicInfo(newReleasesResponse);

  const newReleasesData: Release[] = await Promise.all(
    newReleases.map((release: { artists: { name: string }[]; title: string }) =>
      getFullReleaseData(release.artists[0].name, release.title, spotifyToken)
    )
  );

  await postReleases(newReleasesData);

  return newReleasesData;
  // TODO create connection between user and records
}
