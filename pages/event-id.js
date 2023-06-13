"use client";
// import Layout from '../../app/layout';
import '../app/globals.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react';

import { Container , Input , Button , Tooltip , Link , Badge } from "@nextui-org/react";

import { RecoilRoot } from 'recoil';

import ContainerPage from '../components/event/Container'
import ContainerPageContest from '../components/contest/Container'


export default function EventId() {
  const router = useRouter()
  const id = router.query.id;
  const contest = router.query.contest;
  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");
  const [data, setData] = useState({});

  useEffect(() => {
    if (id !== undefined ) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (contest !== undefined ) {
      fetchDataContest();
    }
  }, [contest]);
  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/event/id/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchDataContest = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/contest/id/${contest}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // console.log(data)


  return (
    <>
    {data && id !== undefined &&
    
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
      <main className="">
          <ContainerPage pageData={data} />
      </main>    
    </div>

    }


    {data && contest !== undefined &&
    
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
      <main className="">
          <ContainerPageContest pageData={data} />
      </main>    
    </div>

    }
    </>
  )
}
