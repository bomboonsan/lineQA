"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'

// sweetalert2
import Swal from 'sweetalert2'

// useCookies
import { useCookies } from 'react-cookie';

import { useRouter } from 'next/navigation'

export default function Home({ Component, pageProps }) {

  const router = useRouter()

  // Auth
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const token = cookies.token;

  useEffect(() => {  
    if (token) {
      router.push('/dashboard')
    }
  }, [token]);
  // END Auth

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const bodyJson = {
        "username": username,
        "password": password
      };
      const response = await fetch('https://boschthailandbackend.bomboonsan.com/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
        // body: JSON.stringify({ value: inputValue }),
        body: JSON.stringify(bodyJson),
      });

      const data = await response.json();

      if (response.ok) {
        // Success, handle the response here
        console.log('Request sent successfully!');
        // window.location.reload();
        console.log(data)

        // Set Token to Token
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000); // Set expiration time to 30 minutes หน่วยเป็น มิลลิวินาที
        setCookie('token', data.token, { expires: expirationDate });
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
        })

      } else {
        // Handle the error response here
        console.error('Request failed!');

        Swal.fire({
          icon: 'error',
          title: 'The username or password is incorrect',
        })
      }
    } catch (error) {
      // Handle any network errors here
      console.error('Network error:', error);
    }

    
  };

  const handleSignout = () => {
    removeCookie('token');
  }

  return (
    <main>
      <div className="relative flex flex-col items-center h-screen overflow-hidden mt-10">
        <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">LOGIN</h1>
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
                    <button className="btn btn-block btn-primary text-white font-bold">Login</button>
                </div>
            </form>
        </div>
      </div>
    </main>
  )
}
