import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Search.scss'



const Search = (props) => {
  
  
  return (
      <div className="SearchMain">
        {
            props.data.map((item)=>{
                return(
                    <div className='Search' key={item.id}>
                      <Link
                      to={`/profile/${item.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </div>
                )
              })
        }
      </div>
  )
}

export default Search