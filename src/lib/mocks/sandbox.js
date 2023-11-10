import fs from 'fs';


/* 
Basic logic of the service:
1. Get user top artists, get user top tracks.
2. Artists
  2.1. Extract artist ids 
  2.2. Get albums from artists 
  2.3. Extract album ids
3. Tracks
  3.1. Extract track ids
  3.2. Get albums from Spotify
  3.3. Extract album ids
4. Merge album ids into a single array (max 20?)
5. Get full album information from Spotify
6. Extract UPC
7. Pass it over to the Discogs client

*/

/* 
1) Artist: set artist limit to 20, track limit to 50
curl --request GET \
  --url 'https://api.spotify.com/v1/me/top/artists?limit=50' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/
const topArtists = JSON.parse(
  fs.readFileSync(
    '/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/spotify.user.topartists.json',
    'utf-8'
  )
);

/* 
1) To get user top tracks, same as above
curl --request GET \
  --url https://api.spotify.com/v1/me/top/tracks \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/

const topTracks = JSON.parse(
  fs.readFileSync(
    '/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/spotify.user.toptracks.json',
    'utf-8'
  )
).items;


/* 
2.1) Extract artist ids 
*/
const artistIds = [];
for (let artist of topArtists.items) artistIds.push(artist.id);


/* 
2.2. Get albums from artists  
(include market) [use the query params below]

curl --request GET \
  --url 'https://api.spotify.com/v1/artists/6pJY5At9SiMpAOBrw9YosS/albums?include_groups=album%2Ccompilation&market=GB&limit=5' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/


const artistAlbums = JSON.parse(
  fs.readFileSync(
    '/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/spotify.artist.albums.json',
    'utf-8'
  )
).items;


/*  
2.3. Extract album ids
*/

const albumTrackIds = [];
for (let track of topTracks) albumTrackIds.push(track.id);



/* 
To get multiple albums at once, give comma-separated album ids
The request limit is 20 albums
curl --request GET \
  --url 'https://api.spotify.com/v1/albums?ids=4SBBGeRaboOnypEhVFRw38%2C3jHf5zZ8d5MQg03YyfTa2I%2C6om5wLwMEeQcY1Uwlh7Oel%2C1R8SYFomn8PdIAYlGgzwjr&market=GB' \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
*/
const albums = JSON.parse(
  fs.readFileSync(
    '/Users/juanvasquez/Desktop/repos/codeworks/sound-harbor/src/lib/mocks/spotify.albums.json',
    'utf-8'
  )
).albums;

const barcodes = [];
const images = [];
for (let album of albums) {
  barcodes.push(album.external_ids.upc)
  images.push(album.images[0])
};

