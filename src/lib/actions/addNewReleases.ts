import discogsColJson from '../mocks/discogs.collection.abridged.json'
import {
  getFullReleaseData,
  postReleases
} from '@/lib/models/releases.model';
import { Release } from '@prisma/client';

//TODO currently  working with mock data, need to make sure I can get all the info from both services
export async function addNewReleases(spotifyToken: string): Promise<Release[]> {
  // const releasesOwned = await getAllReleases();
  // const releasesIds: string[] = releasesOwned.map((release) => release.id);
  // const userCollection: any[] = JSON.parse(getUserItems).releases;
  // const discogsReleasesIds: string[] = userCollection.map(
  //   (release) => release.id
  // );

  // const newReleasesIds = discogsReleasesIds.filter(
  //   (id) => releasesIds.indexOf(id) === -1
  // );
  // const newReleases = await getDiscogsReleasesThrottled(newReleasesIds);
  // const parsedReleases = newReleasesOwned.map((release) => parseDiscogsRelease(release));

  // REMOVE_START
  const newReleasesResponse = discogsColJson.releases;
  const newReleases = newReleasesResponse.map((i:any) => i['basic_information']);
  // console.log('newReleases :>> ', newReleases[0]);
  const newReleasesData: Release[] = await Promise.all(
    newReleases.map((item: { artists: { name: string; }[]; title: string; }) => getFullReleaseData(item.artists[0].name, item.title, spotifyToken)
    )
  );
  // REMOVE_END

  // const newReleasesData: Release[] = await Promise.all(
  //   newReleases.map((item) => getFullReleaseData(item.artists[0], item.title, spotifyToken)
  //   )
  // );

  postReleases(newReleasesData);
  return newReleasesData;
  // TODO create connection between user and records
}

