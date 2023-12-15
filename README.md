# SoundHarbor
SoundHarbor is a unique music shopping recommendation engine that harnesses the power of your Spotify music profile. This marketplace application, currently featuring the buy-side user flow, allows users to expand their physical record collection by purchasing records from Discogs, record shops, or directly from other users.

Explore the application through the [demo video](https://youtu.be/ZdokbTWFBEQ)

<img width="211" alt="Screenshot 2023-12-09 at 13 49 20" src="https://github.com/simplyjuanc/SoundHarbor/assets/37302562/f673018e-4bbb-46f9-8ba0-26dc7cb6e4a2">

<img width="211" alt="Screenshot 2023-12-09 at 13 50 06" src="https://github.com/simplyjuanc/SoundHarbor/assets/37302562/9cc6f5b2-19db-4754-8388-abd5d91f3288">

<img width="211" alt="Screenshot 2023-12-09 at 13 50 50" src="https://github.com/simplyjuanc/SoundHarbor/assets/37302562/6c87493c-683a-4337-8838-1c3edeb62c56">



## Features
- View and manage your music collection within the app.
- Perform CRUD operations on records in your collection.
- Search for records to buy based on pre-determined fields such as album title, artist, and label.

## Getting Started
This project is built with Next.js and bootstrapped using `create-next-app`.

### Installation
First, install the required packages:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run the Development Server

Copy code and from within the root folder run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to see the result.

**Note**: This application heavily relies on the Spotify and Discogs APIs. Ensure you create apps in their respective API services and configure the following environment variables:

- SPOTIFY_CLIENT_ID
- SPOTIFY_CLIENT_SECRET
- SPOTIFY_REDIRECT_URI
- SPOTIFY_SCOPE
- DISCOGS_CONSUMER_KEY
- DISCOGS_CLIENT_SECRET
- DISCOGS_REDIRECT_URI


## Learn More
To delve deeper into Next.js, explore the following resources:

Next.js Documentation - Learn about Next.js features and APIs.
Learn Next.js - An interactive Next.js tutorial.
