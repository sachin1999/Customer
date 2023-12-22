// CreateCustomer.js
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const CreateCustomer = () => {
  const searchQuery = useSearchParams()[0];
  const  token  = searchQuery.get("token");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
    console.log(token)
    console.log(firstName)
  const navigate = useNavigate();
  const apiUrl = 'https://customer-back.onrender.com/create-customer';

  const createCustomer = async () => {
    try {
        const response = await axios.post(apiUrl, {
          first_name: firstName,
          last_name: lastName,
          street: street,
          address: address,
          city: city,
          state: state,
          email: email,
          phone: phone,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      
        if (response.status === 201) {
          setSuccessMessage('Customer successfully created!');
          navigate(`/customer-list/?token=${token}`);
          // You can perform additional actions upon successful creation
        } else {
          setError('Failed to create customer');
        }
      } catch (error) {
        console.error('Error during API request:', error);
        setError('Failed to create customer');
      }
  };
  const backHandller=(e)=>{
    e.preventDefault();
    navigate(`/customer-list/?token=${token}`)
  }
  return (
    <div className="flex flex-col items-center justify-center bg-pink-300 h-screen">
      <div className='text-center text-xl font-bold mb-4 font-mono'>Create Customer</div>
      <div className='bg-gray-300 w-96 p-6 rounded-lg shadow-lg'>
        <form onSubmit={(e) => { e.preventDefault(); createCustomer(); }}>
          <div className="grid grid-cols-2 gap-4">
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>First Name</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>Last Name</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>Street</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='street'
                placeholder='Street'
                onChange={(event) => setStreet(event.target.value)}
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>Address</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='address'
                placeholder='Address'
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>City</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='city'
                placeholder='City'
                onChange={(event) => setCity(event.target.value)}
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>State</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='state'
                placeholder='State'
                onChange={(event) => setState(event.target.value)}
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>Email</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='email'
                name='email'
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className='flex flex-col'>
              <div className='text-gray-700 font-semibold text-lg'>Phone</div>
              <input
                className='rounded-md h-8 outline-double bg-slate-100'
                type='text'
                name='phone'
                placeholder='Phone'
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
          </div>
          <div className='mt-6 flex justify-between'>
            <button className='bg-blue-500 rounded-md px-3 py-2 text-white' onClick={backHandller}>Back</button>
            <button className='bg-blue-500 rounded-md px-3 py-2 text-white' type='submit'>Create </button>
          </div>
          {error ? (<p className='text-red-500 mt-2'>{error}</p>):
            (<p className='text-green-500 mt-2'>{successMessage}</p>)}
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
