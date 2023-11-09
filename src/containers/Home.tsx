import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import ServiceAuth from '@/components/ServiceAuth';


function Home() {
  const [hasLinkedAccounts, setHasLinkedAccounts] = useState(false);

  return ( 
  <>
  {hasLinkedAccounts ? <Dashboard /> : <ServiceAuth setHasLinkedAccounts={setHasLinkedAccounts}/> }
  </>
  );
}

export default Home;
