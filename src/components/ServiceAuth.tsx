import React, { useState } from 'react'
import Link from 'next/link'

type serviceAuthProp = {
  setHasLinkedAccounts: React.Dispatch<React.SetStateAction<boolean>>
}

function ServiceAuth({setHasLinkedAccounts}:serviceAuthProp) {
  
  const [isSpotifyLinked, setIsSpotifyLinked] = useState(false);
  const [isDiscogsLinked, setIsDiscogsLinked] = useState(false);
    
  return (
    <div>
      {isSpotifyLinked ? 'Connected to Spotify' : <Link href='/api/auth/spotify-login'>Connect to Spotify</Link> }
      {isDiscogsLinked ? 'Connected to Discogs' : <Link href='/api/auth/discogs-login'>Connect to Discogs</Link> }
    </div>
  )
}

export default ServiceAuth