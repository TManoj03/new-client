import React from 'react'
import Upost from '../upost/Upost'
import './Uposts.scss'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

const Uposts = ({userId}) => {

    const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get('/posts?userId='+userId).then((res) => {
        return res.data;
    })
);

// console.log(data);

    
  return (
    <div className='posts'>
        { 
        error 
            ? "Something Went Wrong!!" 
            : (isLoading 
            ? 'Loading' 
            :data.map((post) => <Upost post={post} key={post.id} /> ))
        }
    </div>
  )
}

export default Uposts