import Layout from '../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

export default function Dashboard() {
  const router = useRouter()
  const id = router.query.id;

  const [prefixUrl, setPrefixUrl] = useState("https://boschthailandbackend.bomboonsan.com/");

  const [data, setData] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);

  useEffect(() => {
    fetchData();
    fetchDataEvent();
  }, [id]);


  // https://boschthailandbackend.bomboonsan.com/user/event/648b965bad6d4e4cc6878da5
  // endpoint สำหรับดึงข้อมูล User จาก event ID ยังไม่ได้อัพลง Server จริง

  const fetchData = async () => {
    try {
      const response = await fetch(`https://boschthailandbackend.bomboonsan.com/user/contest/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
      // console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchDataEvent = async () => {
    try {
      const response = await fetch(`https://boschthailandbackend.bomboonsan.com/contest/id/${id}`);
      const jsonData = await response.json();
      setDataEvent(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (!data) {
    return <div>Loading...</div>;
  }

  const RenderTable = () => {
    return (
      <Table
        aria-label="Example table with custom cells"
        color="secondary"
        css={{
          height: "auto",
          Width: "100%",
        }}
        selectionMode="none"
        fixed={true}
      >
        <Table.Header >
          <Table.Column>รูปประจำตัว</Table.Column>
          <Table.Column>ชื่อ</Table.Column>
          <Table.Column>อีเมล</Table.Column>
          <Table.Column>วันที่เล่นล่าสุด</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((value, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Link href={`/dashboard/user/${value._id}`} >
                <img
                  className='rounded-xl shadow cursor-pointer'
                  width={75} 
                  height={75} 
                  src={value.pictureUrl} 
                  alt='AVATAR'
                />
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link href={`/dashboard/user/${value._id}`} >
                {value.displayName}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {value.email}
              </Table.Cell>
              <Table.Cell>
                {
                  format(new Date(value.updatedAt), 'dd MMMM yyyy')
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          color="primary"
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    )
  }

  return (
    <Layout>
      <main className="">
          <header className='px-3 mb-3'>
            <p className='text-lg'><strong>Event Title</strong> : {dataEvent.title}</p>
            <p className='text-base my-3'><strong>Event Description</strong> : {dataEvent.description}</p>
          </header>
          <section className='p-3'>
            <RenderTable />
          </section>
      </main>
    </Layout>
  )
}
