

const consumer_key = process.env.DISCOGS_CONSUMER_KEY!;
const client_secret = process.env.DISCOGS_CLIENT_SECRET!;

export function generateRandomString (length: number = 64): string {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return encodeURIComponent(text);
};

export function writeDiscogsAuthBaseHeader (timestamp: number, nonce: string) {
  return (
    `OAuth oauth_consumer_key="${consumer_key}", ` +
    `oauth_nonce="${nonce}", ` +
    `oauth_signature="${client_secret}&", ` +
    `oauth_signature_method="PLAINTEXT", ` +
    `oauth_timestamp="${timestamp}"`
  );
};


export function writeDiscogsAuthFullHeader(discogsNonce: string, token: string, verifier: string, authSecret: string) {
  // Refer to this for the below: https://www.discogs.com/forum/thread/785104?message_id=8307207#7793236
  const clientSecret = client_secret + '&';
  let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
  headerString += `,oauth_token="${token}",oauth_verifier="${verifier}"`;
  headerString = headerString.replace(clientSecret, clientSecret + authSecret);
  return headerString;
}

