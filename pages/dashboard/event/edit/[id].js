import Layout from '../../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

import Container from '../../../../components/dashboard/event/edit/Container';

import { RecoilRoot } from 'recoil';

export default function Dashboard() {
  const router = useRouter()
  const id = router.query.id;

  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");

  const [dataEvent, setDataEvent] = useState([]);

  useEffect(() => {
    if (id !== undefined ) {
      fetchDataEvent();
    }
  }, [id]);

  const fetchDataEvent = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/event/id/${id}`);
      const jsonData = await response.json();
      setDataEvent(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (!dataEvent) {
    return <div>Loading...</div>;
  }


  return (
    <Layout>
      <main className="">
          <header className='px-3 mb-3'>
          </header>
          <section className='p-3'>
            <RecoilRoot>
              <Container propDataEvent={dataEvent} />
            </RecoilRoot>
          </section>
      </main>
    </Layout>
  )
}
