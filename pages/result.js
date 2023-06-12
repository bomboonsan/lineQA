"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Head from "next/head"

import Layout from './layout';
import { useRouter } from 'next/router'

export default function Result() {
  const router = useRouter()
  const { point , name } = router.query
  // MOCKUP
  // const [point, setPoint] = useState(0);
  // END MOCKUP
  useEffect(() => {
      // const newDataUser = {...dataUser};
      // setPoint(newDataUser.point);
  }, []);


  const nativeShare = ()=> {
    if (navigator.share) {
      navigator.share({
        title: 'Thank you for play',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // fallback
    }
  }

  const replay = () => {
    router.push('/')
  }

  return (
    <Layout>
      <Head>
          <title>Result</title>
      </Head>
      <main className="mt-10">
          <header className='px-3 mb-3'>
            <h1 className='text-4xl font-bold mb-4 text-center'>Thank you for play</h1>
            <p className='text-xl text-center font-bold'>คุณ {name} </p>
            <p className='text-xl text-center font-bold'>คะแนนที่ได้ {point}</p>
            <p className='text-lg text-center'>Answer Generated</p>
          </header>
          <section className='p-3'>
            <div className='result-box'>
              <p className='text-center'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
              </p>
              <div className='mt-4'>
                <Image
                        src="https://www.mockupworld.co/wp-content/uploads/dynamic/2023/05/a4-trifold-flyer-free-mockup-psd-536x0-c-default.jpg"
                        alt="Mockup"
                        className='block mx-auto'
                        // layout="fill"
                        // objectFit="cover"
                        width={400}
                        height={400}
                />
              </div>
            </div>

          </section>
          <section className='p-3'>
            <div className='mt-5'>
              <button className="btn btn-block btn-primary text-xl text-white" onClick={nativeShare}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                </svg>
                แชร์ผลงาน
              </button>
              
              <div className='mt-3'>
                <button className="btn btn-block btn-error text-xl text-white" onClick={replay}>
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
    </Layout>
    
  )
}
