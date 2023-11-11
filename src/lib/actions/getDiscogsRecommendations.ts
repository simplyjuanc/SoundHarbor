'use server';
import querystring from 'querystring'

const baseUrl = 'https://api.discogs.com/';


interface IDiscogsRelease { 
  uri: string, 
  title: string, 
  type: string, 
  id: string
  label: string[] 
}


export async function getDiscogsTopResult(barcode: string):Promise<IDiscogsRelease> {
  const query = querystring.stringify({
    type: 'release',
    barcode
  });

  const res = await fetch(`${baseUrl}database/search?${query}`);
  const topResult = (await res.json()).results[0];
  const { uri, title, type, id, label } = topResult;
  return { uri, title, type, id, label };
}
