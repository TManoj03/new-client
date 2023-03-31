import React, { useContext, useState } from 'react'
import './NavBar.scss'

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
import logo from '../../assets/logo.png';
import axios from "axios";
import Search from '../search/Search';



function NavBar() {

  
  const { toggle, darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleLogout= () =>{
      localStorage.removeItem('user');
      navigate('/login');
  }

  const handleSearch = async (e) =>{
    const SearchValue = e.target.value;
    if(!SearchValue){
      console.log('searchValue is Empty');
      navigate(`/`);
    }
    else{

      navigate(`/?q=${SearchValue}`);
      // const res = await axios.get(`http://localhost:8800/search/${SearchValue}`);
      // setResult(res.data)
      // console.log(result)
      // console.log(typeof(result))
      // setValue(1);
    }
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to='/' style={{textDecoration:'none'}}>
          <div className="logo123">
            <img src={logo} alt="img" className='logoimg' style={{width:'30px'}} />
            <span>MCA MAGAZINE</span>
          </div>
        </Link>
          <HomeOutlinedIcon style={{cursor:'pointer'}} />
          {darkMode ? (
          <WbSunnyOutlinedIcon  onClick={toggle}  style={{cursor:'pointer'}} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} style={{cursor:'pointer'}} />
        )}
          <GridViewOutlinedIcon />
          <div className="search">
            <SearchOutlinedIcon />
            <form>
             <input type="text" name="Search" id="Search" placeholder='Search' onChange={handleSearch} />
            </form>
          </div>
          {
            
          // (value === 1 ? <Search data={result} /> : console.log('SearchValue is Empty'))
          }
      </div>
      <div className="right">
        <Link
          to={`/profile/${currentUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
        <PersonOutlinedIcon />
        </Link>
        {/* <EmailOutlinedIcon />
        <NotificationsOutlinedIcon /> */}
        <button onClick={handleLogout}>Logout</button>
        <div className="user">
          <img src={"/upload/"+currentUser.profilePic} alt=""  />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar