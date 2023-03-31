import React, { useEffect, useState } from 'react'
import Search from '../../components/search/Search'
import Share from '../../components/share/Share'
import Uposts from '../../components/uposts/Uposts'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import './Home.scss'

function Home() {

  const [value, setValue] = useState(false);
  let [query] = useSearchParams()
  const [result,setResult] =useState([])
  useEffect(()=>{
    setValue(false);
    const fetchResult = async ()=>{
      const res = await axios.get(`http://localhost:8800/search/${query.get('q')}`);
      setResult(res.data)
      console.log(result)
      setValue(true);
    }
    fetchResult();
  },[query.get('q')])

  return (
    <div className='home'>
     {!value ? console.log('value is empty') : <Search data={result}/> }
      <Share />
      <Uposts />
    </div>
  )
}

export default Home