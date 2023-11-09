import React from 'react'
import Link from 'next/link'

function Dashboard() {
  return (
    <div>
      <h1>Hi, [User]!</h1>
      <h2>Welcome back.</h2>

      <Link href='/collection'>
        <p className='option'>Record Collection</p>
      </Link>

      <Link href='/market'>
        <p className='option'>Marketplace</p>
      </Link>
      {/* <Link href='/collection'> */}
      <div>
        <p className='option'>Profile</p>
      </div>
      {/* </Link> */}
    </div>
  )
}

export default Dashboard