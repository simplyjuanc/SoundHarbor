
const consumer_key = process.env.DISCOGS_CONSUMER_KEY!;
const client_secret = process.env.DISCOGS_CLIENT_SECRET!;
const redirect_uri = process.env.DISCOGS_REDIRECT_URI!;


export const generateRandomString = function (length: number = 64): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


const discogsCode = generateRandomString(64);
export const writeDiscogsAuthBaseHeader = (timestamp: number) => {
  return `OAuth oauth_consumer_key="${consumer_key}", ` +
    `oauth_nonce="${discogsCode}", ` +
    `oauth_signature="${client_secret}&", ` +
    `oauth_signature_method="PLAINTEXT", ` +
    `oauth_timestamp="${timestamp}"`;
}
