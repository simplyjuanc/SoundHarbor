import querystring from 'querystring';
import { Release } from "@prisma/client";


const baseUrl = 'https://api.discogs.com/';
const CURRENCY = 'GBP'
const ACCESS_TOKEN = 'gpUlnNcmJjdfAFroCsnhUystiuuLjZeInlinWJHE';

// TODO [PROD] delete default value
export const getUserItems = async (userId:string='juancvasquez',page:number=1, per_page:number=100):Promise<{[k:string]:any}> => {
  const path = `${baseUrl}users/${userId}/collection/folders/0/releases?${querystring.stringify({page, per_page})}`
  const data = await fetchDiscogsResource(path);
  return data.releases; 
}

export const fetchReleaseData = async (id: number): Promise<Release> => {
  const path = `releases/${id}?${querystring.stringify({ curr_abbr: CURRENCY, token: ACCESS_TOKEN })}`
  return fetchDiscogsResource(path);
}

export const searchDiscogs = async (barcode: string): Promise<Release> => {
  const path = `releases/search?${querystring.stringify({ barcode, token: ACCESS_TOKEN })}`
  return await fetchDiscogsResource(path).releases;
}





async function fetchDiscogsResource(path: string, options?:RequestInit) {
  const res = await fetch(baseUrl + path, options);
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