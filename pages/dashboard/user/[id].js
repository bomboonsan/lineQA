import Layout from '../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

export default function Dashboard() {
  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");

  const router = useRouter()
  const id = router.query.id;

  const [data, setData] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);
  const [dataContest, setDataContest] = useState([]);

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
      
      const newContestEvent = [...jsonData.contestData]
      setDataContest(newContestEvent)
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

          </header>
          <section className='flex flex-warp'>
            <div className='w-1/5 basis-1/5 pr-6'>
              <div className='sticky top-1'>
                <h1 className='font-bold text-3xl mb-3'>
                {data.displayName}
                </h1>
                <img
                    className='rounded-xl shadow cursor-pointer w-full'
                    width={100} 
                    height={100} 
                    src={data.pictureUrl} 
                    alt='AVATAR'
                />
              </div>
            </div>
            <div className='w-4/5 basis-4/5'>
              <h2 className='text-center text-2xl'>คำถาม</h2>
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
                          <Link href={value.event_id && `/dashboard/event/${value.event_id}`} className='hover:text-blue-600'>
                            {value.campaign}
                          </Link>
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

              <h2 className='text-center text-2xl mt-10'>ภาพประกวด</h2>
              <div class="grid grid-cols-3 gap-4">
                {/* CARD */}
                {dataContest && dataContest.map((item,index) => (
                  <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={prefixUrl+item.fileUrl} alt="" className='w-100 h-auto aspect-video object-cover' /></figure>
                    <div className="card-body">
                      <h2 className="card-title">Event : {item.title}</h2>
                    </div>
                  </div>
                ))}
                
                {/* CARD */}
              </div>
            </div>
          </section>
      </main>
    </Layout>
  )
}
