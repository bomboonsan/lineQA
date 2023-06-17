"use client";

import '../app/globals.scss'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'

export default function Register({ Component, pageProps }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bodyJson = {
        "username": username,
        "email": email,
        "password": password
      };
      const response = await fetch('https://api.bomboonsan.com/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
        // body: JSON.stringify({ value: inputValue }),
        body: JSON.stringify(bodyJson),
      });

      if (response.ok) {
        // Success, handle the response here
        console.log('Request sent successfully!');
        alert('Request sent successfully!');
        // window.location.reload();

      } else {
        // Handle the error response here
        console.error('Request failed!');
      }
    } catch (error) {
      // Handle any network errors here
      console.error('Network error:', error);
    }

    
  };
  
  return (      
      <div id='appWrap'>
        <div className='topBar'></div>
        <header className='mb-3 px-4'>
          <Image 
            className='w-1/3 h-auto'
            width={384} 
            height={86} 
            src='/images/logo.png'
            alt='LOGO'
          />
        </header>       
        <main>
          <div className="relative flex flex-col items-center h-screen overflow-hidden mt-10">
            <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Username" 
                          className="w-full input input-bordered" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input 
                          type="email" 
                          placeholder="Email" 
                          className="w-full input input-bordered" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input 
                          type="password" 
                          placeholder="Enter Password"
                          className="w-full input input-bordered" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-block btn-primary text-white font-bold">SUBMIT</button>
                    </div>
                </form>
            </div>
          </div>
        </main>
      </div>
  )
}
