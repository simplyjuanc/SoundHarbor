# Overview

SoundHarbor is a music shopping recommendation engine leveraging your Spotify music profile. It's a marketplace application (currently only with the buy-side user flow) that enables end users to grow their physical record collection by buying records from Discogs, record shops or directly from other users. Demo video and an abridged version of the project proposal below.

- [Demo video](https://youtu.be/ZdokbTWFBEQ)

## Features
- The user can access and view their music collection on-app.
- The user can CRUD records to their collection.
- The user can search a record to buy based on pre-determined fields (album title, artist, label).

 
# Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, install the required packages: `npm i`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


The app heavily relies on the Spotify and Discogs API, which means you need to create the apps in their API service and configure the env variables below.

- SPOTIFY_CLIENT_ID
- SPOTIFY_CLIENT_SECRET
- SPOTIFY_REDIRECT_URI
- SPOTIFY_SCOPE
- DISCOGS_CONSUMER_KEY
- DISCOGS_CLIENT_SECRET
- DISCOGS_REDIRECT_URI



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
