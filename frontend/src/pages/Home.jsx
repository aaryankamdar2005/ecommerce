import React from 'react'
import Hero from '../components/Hero.jsx'
import LatestCollections from '../components/Latestcollections.jsx'
import BestSeller from '../components/BestSeller.jsx'
import OurPolicy from '../components/OurPolicy.jsx'
import Newsletter from '../components/Newsletter.jsx'

export default function Home() {
  return (
    <div>
<Hero/>
<LatestCollections/>
<BestSeller/>
<OurPolicy/>
<Newsletter/>

    </div>
  )
}
