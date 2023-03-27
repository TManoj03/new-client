import React, { useContext, useState } from 'react'
import './Profile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Uposts from '../../components/uposts/Uposts'
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/Update/Update';


function Profile() {

  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );
  
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationship?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationship?userId=" + userId);
      return makeRequest.post("/relationship", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };


  return (
    <div className='profile'>
      { isLoading ? (
         'loading' 
         ) : ( <>
        <div className="images">
        <img src={"/upload/"+data.coverPic} alt="" className='coverPic'/>
        <img src={"/upload/"+data.profilePic} alt="" className='profilePic'/>
      </div>
      <div className="profileContainer">
        <div className="uIinfo">
          <div className='left'>
            <a href="facebook.com">
              <FacebookTwoToneIcon  />
            </a>
            <a href="facebook.com">
              <LinkedInIcon  />
            </a>
            <a href="facebook.com">
              <InstagramIcon  />
            </a>
            <a href="facebook.com">
              <PinterestIcon  />
            </a>
            <a href="facebook.com">
              <TwitterIcon  />
            </a>
          </div>
          <div className='center'>
            <span className='txt'>{data.userName}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span className='txt1'>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span className='txt1'>English</span>
              </div>
            </div>
            { rIsLoading ? 
            "Loading" : 
            userId === currentUser.id ? (
              <button onClick={()=>setOpenUpdate(true)}>update</button>
             ) : (
              <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
             )}
          </div>
          <div className='right'>
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Uposts userId={userId} />
      </div>
      </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  )
}

export default Profile