import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    var token='';
    const [error, setError] = useState(null);
    const apiUrl = 'https://customer-back.onrender.com/get-token';
 
    const submitHandler= async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                login_id: email,
                password: password,
              }),
            });
                const data = await response.json();
                // Assuming the token is present in the response, update the state
                token=data.access_token;
                // Process the response...
 
            if(data.access_token){
                navigate(`/customer-list/?token=${token}`);
            }
            else{
              alert("wrong credentials")
            }
          } catch (error) {
            console.error('Error during API request:', error);
          }
       };
  return (
    <div className="flex flex-col bg-pink-300 h-[100vh]">
      <div className='text-center mt-40 text-xl font-bold mb-4 font-mono'>Login</div>
      <div className='bg-gray-300 h-3/6 w-2/6 rounded-lg mx-auto shadow-lg hover:scale-105 transition-all duration-1000'>
        <form onSubmit={submitHandler}>
            <label className='flex flex-col'>
                <div className='text-center mt-4 text-gray-700 font-semibold text-lg'>Email</div>
                <input className='rounded-md mx-auto h-8 mt-4 w-[25vw] outline-double bg-slate-100' 
                type='email' name='email' placeholder='loginid' onChange={event => setEmail(event.target.value)} required></input>
            </label>
            <label className='flex flex-col mt-4'>
                <div className='text-center mt-4 text-gray-700 font-semibold text-lg'>Password</div>
                <input className='rounded-md mx-auto h-8 mt-4 w-[25vw] outline-double bg-slate-100 mb-8' 
                type='password' name='password' placeholder='Password' onChange={event => setPassword(event.target.value)} required></input>
            </label>
            {/*  */}
            <div className='mt-6 text-center '>
            <button className='bg-blue-500 rounded-md px-3 py-2  text-white' type='submit'>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
           
        </form>
      </div>
    </div>
  )
}

export default Login