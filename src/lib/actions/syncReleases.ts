import type { Release } from '@prisma/client';
import { postReleases } from '@/lib/models/releases.model';
import { getDiscogsReleases } from '@/lib/services/discogsServices';
import { extractDiscogsReleasesBasicInfo } from '@/lib/utils/discogsUtils';
import { getFullReleaseData } from '@/lib/utils/releaseUtils';

//TODO currently  working with mock data, need to make sure I can get all the info from both services
export async function syncReleases(spotifyToken: string): Promise<Release[]> {
  const newReleasesResponse = getDiscogsReleases();
  const newReleases = extractDiscogsReleasesBasicInfo(newReleasesResponse);

  const newReleasesData = await Promise.all(
    newReleases.map((release: { artists: { name: string }[]; title: string }) => (
      getFullReleaseData(release.artists[0].name, release.title, spotifyToken)
    ))
  ) as (Release | null)[];

  const filteredReleases = newReleasesData.filter((el): el is Release => el !== null);


  await postReleases(filteredReleases);

  return filteredReleases;
  // TODO create connection between user and records
}
