import '../app/globals.scss'
import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRouter } from 'next/router';

import Head from 'next/head'


export default function Result() {
  const router = useRouter()

  const id = router.query.id;
  const userName = router.query.name;
  const userPoint = router.query.point;


  const startPageUrl = `https://liff.line.me/1661407578-X6ro31ow?id=${id}`;

  const [data, setData] = useState({});
  const [results, setResults] = useState(null);

  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");



  const [urlAddFriend, setUrlAddFriend] = useState("https://developers.line.biz/console/");
   

  useEffect(() => {
    if (id !== undefined ) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/event/id/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
      setResults(jsonData.results);
      console.log(jsonData.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(results)

  
  function checkNumberInRange(array, point) {
    for (let i = 0; i < array.length; i++) {
      const { pointMin, pointMax } = array[i];
      if (Number(point) >= Number(pointMin) && Number(point) <= Number(pointMax)) {
        return i; // Return the index if the number is within the range
      }
    }
    return -1; // Return -1 if the number is not within any range
  }

  // checkNumberInRange(rangeArray, globolUser.point);

  const [indexResult, setIndexResult] = useState(0);
  useEffect(() => {
    

    if (results && userPoint) {

      // แยก arr เอาเฉพาะ pointMin, pointMax
      const pageDataResults = [...results]
      const modifiedArray = pageDataResults.map(({ pointMin, pointMax }) => ({ pointMin, pointMax }));
      // setNewResultPoint(modifiedArray)

      // เปรียบเทียบค่าจาก user และผลลัพท์ เพื่อหา index ของผลลัพท์ที่จะต้องแสดง
      const index = checkNumberInRange(modifiedArray, Number(userPoint));
      if (index > 0) {
        setIndexResult(index)
      } else {
        setIndexResult(0)
      }

      console.log('userPoint : '+userPoint)

    }

  }, [results,userPoint]);

  const nativeShare = ()=> {
    if (navigator.share) {
      navigator.share({
        title: 'Thank you for playing',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // fallback
    }
  }


  if(!results) {
    return false
  }

  
  
  return (
    <>
      <Head>
        <title>คุณ {userName} ได้ {userPoint} คะแนน</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={prefixUrl+results[indexResult].resultImageUrl} />
        <meta property="og:description" content="Thank you for playing" />
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
            <h1 className='text-4xl font-bold mb-4 text-center'>Thank you for playing</h1>
            <p className='text-xl text-center font-bold'>คุณ {userName}</p>
            <p className='text-lg text-center'>Answer Generated</p>
          </header>
          {results && 
          <section className='p-3'>
            <div className='result-box'>
              <p className='text-center'>
                {results[indexResult].resultText}
              </p>
              <div className='mt-4'>
                <img
                        src={prefixUrl+results[indexResult].resultImageUrl}
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
          }
          <section className='p-3'>
            <div className='mt-5'>
              <button className="btn btn-block btn-primary text-xl text-white rounded-[0px]" onClick={nativeShare}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                </svg>
                แชร์ผลงาน
              </button>              
              <div className='mt-3'>
                <a className="btn btn-block btn-error text-xl text-white rounded-[0px]" href={startPageUrl}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                  เริ่มใหม่
                </a>
              </div>
              <div className='mt-3'>
                <a className="btn btn-block btn-success text-xl text-white rounded-[0px]" href={urlAddFriend}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-line" viewBox="0 0 16 16">
                    <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z"/>
                  </svg>
                  เพิ่มเพื่อน
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}



