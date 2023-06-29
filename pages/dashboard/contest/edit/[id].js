import Layout from '../../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

import Container from '../../../../components/dashboard/contest/edit/Container';

import { RecoilRoot } from 'recoil';

export default function Dashboard() {
  const router = useRouter()
  const id = router.query.id;

  const [prefixUrl, setPrefixUrl] = useState("https://boschthailandbackend.bomboonsan.com/");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);


  // https://boschthailandbackend.bomboonsan.com/user/event/648b965bad6d4e4cc6878da5
  // endpoint สำหรับดึงข้อมูล User จาก event ID ยังไม่ได้อัพลง Server จริง

  const fetchData = async () => {
    try {
      const response = await fetch(`https://boschthailandbackend.bomboonsan.com/contest/id/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (!data) {
    return <div>Loading...</div>;
  }
  

  return (
    <Layout>
      <main className="">
          <section className='p-3'>
            <RecoilRoot>
              <Container propDataEvent={data} />
            </RecoilRoot>
          </section>
      </main>
    </Layout>
  )
}
