import React, { useEffect, useState } from 'react'
import './RightBar.scss'
import axios from "axios";


function RightBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/users/get");
      setData(res.data);
      console.log(res.data);
    };
  
    fetchData();
  }, []);
  




  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestion For You</span>
          <div className="user">
            <div className="userInfo">
              <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="" />
              <span>Manoj Kumar</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600' alt="" />
              <span>Manoj Kumar</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Delete</button>
            </div>
          </div>
        </div>

      <div className="item">

        <span>Users</span>
       {
         data.map((item) => (
        <div className="user" key={item.id}>
            <div className="userInfo" >
            <img src={"/upload/"+item.profilePic} alt="profile"/>
              <div className="online" />
              <span>{item.name}</span>
            </div>
          </div>
          ))
        }

      </div>


     

      </div>
    </div>
  )
}

export default RightBar