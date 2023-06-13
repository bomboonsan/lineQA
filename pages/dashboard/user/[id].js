import Layout from '../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

export default function Dashboard() {

  const router = useRouter()
  const id = router.query.id;

  const [data, setData] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/user/id/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)

      const newDataEvent = [...jsonData.eventData]
      setDataEvent(newDataEvent)
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
          <header className='px-3 mb-3'>
            <h1 className='font-bold text-3xl mb-3'>
            {data.displayName}
            </h1>
          </header>
          <section className='flex flex-warp'>
            <div className='w-1/5 basis-1/5 pr-6'>
              <img
                  className='rounded-xl shadow cursor-pointer w-full'
                  width={100} 
                  height={100} 
                  src={data.pictureUrl} 
                  alt='AVATAR'
              />
            </div>
            <div className='w-4/5 basis-4/5'>
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
                  <Table.Column>No.</Table.Column>
                  <Table.Column>Campaign</Table.Column>
                  <Table.Column>Title</Table.Column>
                  <Table.Column>Point</Table.Column>
                  <Table.Column>Date</Table.Column>
                </Table.Header>
                <Table.Body>
                  {dataEvent.map((value, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {index+1}
                      </Table.Cell>
                      <Table.Cell>
                        {value.campaign}
                      </Table.Cell>
                      <Table.Cell>
                        {value.title}
                      </Table.Cell>
                      <Table.Cell>
                        {value.point}
                      </Table.Cell>
                      
                      <Table.Cell>
                        {
                          format(new Date(value.date), 'dd MMMM yyyy')
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
            </div>
          </section>
      </main>
    </Layout>
  )
}
