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

import Head from 'next/head'


export default function EventId() {
  // const router = useRouter()
  // const id = router.query.id;
  // const contest = router.query.contest;
  const [id, setId] = useState(null);
  const [contest, setContest] = useState(null);
  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");
  const [data, setData] = useState({});


  useEffect(() => {
    console.log(window.location.href)
    const eventIdSplit = window.location.href.split("liff.state=%23event");
    const eventID = eventIdSplit[1]
    if (eventID !== null) {
      setId(eventID)
    }
    const contestIdSplit = window.location.href.split("liff.state=%23contest");
    const contestID = contestIdSplit[1]
    if (contestID !== null) {
      setContest(contestID)
    }
    console.log('eventID: '+eventID)
    console.log('contestID: '+contestID)
  });

  useEffect(() => {
    if (id !== undefined && id !== null) {
      fetchData();
    }
  }, [id]);  

  useEffect(() => {
    if (contest !== undefined && contest !== null) {
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

  if(!data._id) {
    return false
  }

  return (
    <>
    <Head>
        {/* <title>Next App</title> */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {data &&
    
    <div id='appWrap'>
      {/* <div className='topBar'></div>
      <header className='mb-3 px-4'>
        <Image 
          className='w-1/3 h-auto'
          width={384} 
          height={86} 
          src='/images/logo.png'
          alt='LOGO'
        />
      </header> */}
      <Image 
        className='w-full h-auto'
        width={800} 
        height={128} 
        src='/images/bosch_logo.png'
        alt='LOGO'
      />       
      <main className="">
        {id !== undefined ? (
          <ContainerPage pageData={data} />
        ) : (
          <ContainerPageContest pageData={data} />
        )
          
        }
      </main>    
    </div>

    }
    </>
  )
}
