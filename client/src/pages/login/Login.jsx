import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import './Login.scss'

function Login() {

    const [inputs, setInputs] = useState({
        userName:'',
        password:'',    
      });
    
      const [err, setError] = useState(null);

      const navigate = useNavigate();
      
    
      const handleChange = (e) =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const {login} = useContext(AuthContext);

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            console.log(login(inputs));
            await login(inputs);
            navigate('/');
           
        }
        catch(err){
            setError(err.response.data);
        }
        
    };

  return (
    <div className='login'>
        <div className="card">
            <div className="left">
                <h1>Hello World.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Explicabo consequuntur ratione molestias iusto nisi earum sint sapiente laborum!
                      A magni.
                </p>
                <span>Don't You have an Account?</span>
                <Link to='/register'>
                    <button>Register</button>
                </Link>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form>
                    <input type="text" name="userName" id="userName" placeholder='Username ' onChange={handleChange} />
                    <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange} />
                    {err && err}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login