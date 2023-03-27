import React from 'react'
import Share from '../../components/share/Share'
import Uposts from '../../components/uposts/Uposts'

import './Home.scss'

function Home() {
  return (
    <div className='home'>
      <Share />
      <Uposts />
    </div>
  )
}

export default Home