import discogsColJson from '../mocks/discogs.collection.abridged.json';

//TODO currently  working with mock data, need to make sure I can get all the info from both services
export const getDiscogsReleases = () => {
  return discogsColJson.releases;
};
