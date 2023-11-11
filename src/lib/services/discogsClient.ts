import querystring from 'querystring';
import { Release } from "@prisma/client";


const baseUrl = 'https://api.discogs.com/';
const currency = 'GBP'

// https://api.discogs.com/users/juancvasquez/collection/folders
export const fetchReleaseData = async (id:number):Promise<Release|null|undefined> => {
  try {
    const path = `releases/${id}?${querystring.stringify({curr_abbr:currency})}`
    const res = await fetch(baseUrl + path)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}



export const searchDiscogs = async (barcode:string):Promise<Release|null|undefined> => {
  try {
    const path = `releases/search?${querystring.stringify({barcode})}`
    const res = await fetch(baseUrl + path)
    const data = await res.json()
    
    console.log('searchDiscogs :>> ', data);
    
    return data.results;

  } catch (error) {
    console.log('error - searchDiscogs :>> ', error);
  }
}