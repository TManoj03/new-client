import React, { useContext } from 'react'
import './LeftBar.scss'
import friends from '../../assets/friends-50.png';
import groups from '../../assets/groups-100.png';
import popular from '../../assets/popular-48.png';
import videos from '../../assets/videos-64.png';
import Education from '../../assets/literature.gif';
import Sports from '../../assets/winner-48.png';
import Function from '../../assets/party.gif';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';


export default function LeftBar() {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={"/upload/"+currentUser.profilePic}
             alt="profile" />
                 
                 <Link 
                  to={`/profile/${currentUser.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                 <span>{currentUser.name}</span>
                 </Link>
          </div>
          <div className="item">
            <img src={friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={popular} alt="" />
            <span>Popular</span>
          </div>
          <div className="item">
            <img src={videos} alt="" />
            <span>Videos</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span className='title'>Category</span>
          <div className="item">
            <img src={Sports} alt="" />
            <span>Sports</span>
          </div>
          <div className="item">
            <img src={Function} alt="" />
            <span>Functions</span>
          </div>
          <div className="item">
            <img src={Education} alt="" />
            <span>Education</span>
          </div>
          <div className="item">
            <img src={videos} alt="" />
            <span>College</span>
          </div>
          <div className="item">
            <img src={Education} alt="" />
            <span>Education</span>
          </div>
          <div className="item">
            <img src={videos} alt="" />
            <span>College</span>
          </div>
          <div className="item">
            <img src={Education} alt="" />
            <span>Education</span>
          </div>
          
        </div>
        <hr />
      </div>
    </div>
  )
}
