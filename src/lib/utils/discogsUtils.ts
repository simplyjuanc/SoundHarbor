import querystring from 'querystring';
import fs from 'fs'
import Bottleneck from "bottleneck";
import { Release } from "@prisma/client";


const baseUrl = 'https://api.discogs.com/';
const CURRENCY = 'GBP'
const ACCESS_TOKEN = process.env.DISCOGS_TOKEN;



// TODO Understand why this feth is not returning data even if POstman does
/*
export const getUserItems = async (userId:string,page:number=1, per_page:number=100):Promise<{[k:string]:any}> => {
  const path = `${baseUrl}users/${userId}/collection/folders/0/releases?${querystring.stringify({page, per_page, token:ACCESS_TOKEN})}`
  // console.log('getUserItems - path :>> ', path);
  const data = await fetchDiscogsResource(path);
  console.log('getUserItems - data :>> ', data);
  return data.releases; 
}
 */

export const getUserItems = fs.readFileSync('/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/discogs.collection.json', { encoding: 'utf-8' })



export const getDiscogsRelease = async (id: string): Promise<Release> => {
  const path = `releases/${id}?${querystring.stringify({ curr_abbr: CURRENCY, token: ACCESS_TOKEN })}`
  // console.log('getDiscogsRelease - path :>> ', path);
  const data = await fetchDiscogsResource(path);
  return data;
}

export const getDiscogsReleasesThrottled = (ids:string[]) => {
  const limiter = new Bottleneck({
    minTime: 1000,
    maxConcurrent: 1
  });
  const throttledReleases = limiter.schedule(async () => {
    return Promise.all(ids.map(async id => await getDiscogsRelease(id)));
  });
  return throttledReleases;
}


export const searchDiscogs = async (barcode: string): Promise<Release> => {
  const path = `releases/search?${querystring.stringify({ barcode, token: ACCESS_TOKEN })}`
  return (await fetchDiscogsResource(path)).releases;
}



async function fetchDiscogsResource(path: string, options?: RequestInit) {
  const res = await fetch(baseUrl + path);
  return await res.json();
}


// TODO: no priority - implement pagination (search, getUserItems methods)
type Pagination = {
  page: number;
  pages: number;
  items: number;
  per_page: number;
  urls: {
    first: string;
    prev: string;
    next: string;
    last: string;
  };
};