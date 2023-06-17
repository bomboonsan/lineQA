import { Text , css , Navbar , Spacer , Button , Link } from "@nextui-org/react";
import Image from 'next/image'
import { useState, useEffect } from 'react';


// useCookies
import { useCookies } from 'react-cookie';

import { useRouter } from 'next/navigation'

export default function Layout({ children }) {

  const router = useRouter()

  // Auth
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  useEffect(() => {  
    const token = cookies.token;
    if (!token) {
      console.log('no token')
      removeCookie('token');
      router.push('/')
    }
  }, []);
// END Auth

  const handleSignout = () => {
    removeCookie('token');
    router.push('/')
  }
  
  return (
    <>
      <Navbar isBordered >
        <Navbar.Brand>
          <Image 
              className='w-1/3 h-auto'
              width={384} 
              height={86} 
              src='/images/logo.png'
              alt='LOGO'
            />
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/dashboard/">Dashboard</Navbar.Link>
          <Navbar.Link href="/dashboard/event">Event</Navbar.Link>
          <Navbar.Link href="/dashboard/contest">Contest</Navbar.Link>
          <Navbar.Link href="/dashboard/user">User</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat color="error" onClick={handleSignout}>
              Sign Out
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Spacer y={2} />
    </>
  );
}