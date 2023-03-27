import React, { useContext, useState } from 'react'
import './Comments.scss'
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import moment from 'moment';


const Comments = ({postId}) => {

    const [desc,setDesc] = useState('');
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get('/comments?postId='+postId).then((res) => {
        return res.data;
        })
    );

    const queryClient = useQueryClient();
  
  
    const mutation = useMutation(
      (newcomments) => {
      return makeRequest.post('/comments',newcomments);
    }
     ,{
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries( ["comments"] );
      },
    }
  );
  
    const handleClick= async (e) =>{
      e.preventDefault();
      mutation.mutate({desc, postId});
      setDesc('');
    };

  return (
    <div className='comments'>
        <div className="write">
        <img src={"/upload/"+currentUser.profilePic} alt="" />
        <input 
        type="text" 
        placeholder='Write a comment!!'
        onChange={(e)=>setDesc(e.target.value)}
        value={desc}
        />
        <button onClick={handleClick}>Send</button>
        </div>
        {
        isLoading
        ? "Loading"
        : data.map(comment=>(
            //must pass the id 
            <div className="comment" key={comment.id}>  
                <img src={"/upload/"+comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className='date'>{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))
    }</div>
  )
}

export default Comments




// const comments = [
//     {
//         id: 1,
//         name: 'John',
//         userId: '1',
//         profilePic: 'https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         des: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, minima?'
//     },
//     {
//         id: 2,
//         name: 'Doe',
//         userId: '2',
//         profilePic: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         des: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, minima?'
//     },
// ]