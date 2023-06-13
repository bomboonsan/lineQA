"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'

export default function Home({ Component, pageProps }) {

  // START LINE LIFF NEW
  useEffect(async () => {
    const liff = (await import('@line/liff')).default
    try {
        await liff.init({ liffId: '1661407578-X6ro31ow', });


        const profile = await liff.getProfile();
        const { displayName, pictureUrl, email } = profile;
        console.log('User Name:', displayName);
        console.log('Picture URL:', pictureUrl);
        console.log('Email:', email);

    } catch (error) {
      console.error('liff init error', error.message)
    }
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  } , [])
  
  return (
    <main>
      HOME PAGE
    </main>
  )
}
