"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { RecoilRoot } from 'recoil';

import { useRecoilState } from 'recoil';
import {stateUser} from '../app/state/stateUser'

// Components
import App from './app'

export default function Home({ Component, pageProps }) {
  useEffect(() => {
    console.log('TEST FIRST LOAD')    
  }, []);
  return (
    <main>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </main>
  )
}
