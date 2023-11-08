import React, { useState } from 'react'

function Home() {
  const [hasLinkedAccount, setHasLinkedAccounts] = useState(false);
  
  
  
  return (
    <div>
      <h1>Hi, [User]!</h1>
      <h2>Welcome back.</h2>

      <div>
        <p className="option">Record Collection</p>
      </div>
      <div>
        <p className="option">Marketplace</p>
      </div>
      <div>
        <p className="option">Profile</p>
      </div>
    </div>
  )
}

export default Home