import '../../app/globals.scss'
import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRouter } from 'next/router';

import Head from 'next/head'

export default function Start() {
  const router = useRouter()
  const { id } = router.query;

  const userName = router.query.name;
  const userPoint = router.query.point;

  const [data, setData] = useState({});
  const [results, setResults] = useState({});

  const [prefixUrl, setPrefixUrl] = useState("https://boschthailandbackend.bomboonsan.com/");
   

  useEffect(() => {
    if (id !== undefined ) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://boschthailandbackend.bomboonsan.com/event/id/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
      setResults(jsonData.results);
      console.log(jsonData.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  
  
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div id='appWrap'>
        <Image 
          className='w-full h-auto'
          width={800} 
          height={128} 
          src='/images/bosch_logo.png'
          alt='LOGO'
        />       
        <main className="mt-10">
          <header className='px-3 mb-3'>
            <h1 className='text-4xl font-bold mb-4 text-center'>Thank you for play</h1>
            <p className='text-xl text-center font-bold'>คุณ {userName}</p>
            <p className='text-lg text-center'>Answer Generated</p>
          </header>
          
          <section className='p-3'>
            <div className='mt-5'>
              <button className="btn btn-block btn-primary text-xl text-white rounded-[0px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                </svg>
                แชร์ผลงาน
              </button>
              
              <div className='mt-3'>
                <button className="btn btn-block btn-error text-xl text-white rounded-[0px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                  เล่นใหม่อีกครั้ง
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
