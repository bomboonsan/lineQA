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
  const [prefixUrl, setPrefixUrl] = useState("https://boschthailandbackend.bomboonsan.com/");
  const [data, setData] = useState(null);
  const [maineventID, setMaineventID] = useState(null);


  useEffect(() => {
    console.log(window.location.href)
    const eventIdSplit = window.location.href.split("idevent");
    const eventID = eventIdSplit[1]
    if (eventID !== null && eventID !== undefined) {
      setId(eventID)
      console.log('eventID: '+eventID)
      fetchData_ID(eventID)
      setMaineventID(eventID)
      
    }
    const contestIdSplit = window.location.href.split("idcontest");
    const contestID = contestIdSplit[1]
    if (contestID !== null && contestID !== undefined) {
      setContest(contestID)
      console.log('contestID: '+contestID)
      fetchDataContest_ID(contestID)
    }
    

    
  }, []);

  const fetchData_ID = async (eventID) => {
    console.log(eventID)
    try {
      // const response = await fetch(`https://boschthailandbackend.bomboonsan.com/event/id/${eventID}`);
      const response = await fetch(`/api/${eventID}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchDataContest_ID = async (contestID) => {
    try {
      const response = await fetch(`/api/contest/${contestID}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  console.log(data)

  if(!data) {
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
      
      <Image 
        className='w-full h-auto mb-[50px]'
        width={800} 
        height={128} 
        src='/images/bosch_logo.png'
        alt='LOGO'
      />       
      <main className="">
        
      {id !== null ? (
          <ContainerPage pageData={data} eventID={maineventID} />
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


