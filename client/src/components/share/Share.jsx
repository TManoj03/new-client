import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import groups from '../../assets/groups-100.png';
import videos from '../../assets/videos-64.png';
import Sports from '../../assets/winner-48.png';
import './Share.scss'
import { makeRequest } from '../../axios';
import {  useMutation, useQueryClient } from '@tanstack/react-query';


const Share = () => {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () =>{
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload",formData);
      return res.data;
    }
    catch(err){
      console.log(err);
    }
  };

  const {currentUser} = useContext(AuthContext);

  const queryClient = useQueryClient();
  
  
  const mutation = useMutation(
    (newPost) => {
    return makeRequest.post('/posts',newPost);
  }
   ,{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries( ["posts"] );
    },
  }
);

  const handleClick= async (e) =>{
    e.preventDefault();
    let imgUrl = '';
    if(file) imgUrl = await upload()
    mutation.mutate({desc, img: imgUrl});
    setDesc('');
    setFile(null)
  };

  return (
    <div className='share'>
        <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/"+currentUser.profilePic} alt="" />
            <input 
            style={{width:'100%'}}
            type="text" 
            placeholder={`What's on your mind ${currentUser.name}?`} 
            onChange={(e)=> setDesc(e.target.value)} 
            value={desc}
            />
          </div>
          <div className="right">
            {file && <img className='file' alt='' src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input 
            type="file" 
            id="file" 
            style={{display:"none"}} 
            onChange={(e)=> setFile(e.target.files[0])} 
            />
            <label htmlFor="file">
              <div className="item">
                <img src={videos} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Sports} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={groups} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share