import '../app/globals.scss'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Loading } from "@nextui-org/react";
import { useRouter } from 'next/router';

export default function Start() {
  const router = useRouter()
//   const {id} = router.query;

//   useEffect(() => {
//     if (id) {
//         router.push(`/event/${id}`)
//     }
//   }, [id]);  

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath.split('?')[1]);
    const liffState = urlParams.get('liff.state');
    const extractedValue = decodeURIComponent(liffState);
    router.push(extractedValue)
  }, []);
  
  return (
    <main className='h-screen w-screen flex flex-wrap justify-center items-center'>
<Loading size="xl" />
    </main>
  )
}
