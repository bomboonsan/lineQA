import Layout from '../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/event`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteByID = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this question?');
    if (confirmed) {
      try {
        const response = await fetch(`https://api.bomboonsan.com/event/id/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Question deleted successfully');
          
          fetchData(); // Fetch ข้อมูลใหม่

        } else {
          console.error('Failed to delete question');
        }
      } catch (error) {
        console.error('Error occurred while deleting question', error);
      }
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
          <Table.Column>TITLE</Table.Column>
          <Table.Column>CAMPAIGN</Table.Column>
          <Table.Column>createdAt</Table.Column>
          <Table.Column></Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((value, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                {/* <Link href={`/event/${value._id}`} className='hover:text-blue-600'>
                  {value.title}
                </Link> */}
                <Link href={`https://liff.line.me/1661407578-X6ro31ow/?id=${value._id}`} className='hover:text-blue-600'>
                  {value.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {value.campaign}
              </Table.Cell>
              <Table.Cell>
                {/* {value.createdAt} */}
                {
                  format(new Date(value.createdAt), 'dd MMMM yyyy')
                }
              </Table.Cell>
              <Table.Cell>
                <Row justify="flex-end" align="center">
                  <Col css={{ width: "auto" }}>
                    <Tooltip content="แก้ไขคำถาม">
                      <Link href={`/dashboard/question/edit/${value._id}`}>
                        EDIT
                      </Link>
                    </Tooltip>
                  </Col>
                  <Col css={{ width: "auto" , marginLeft : "25px" }}>
                    <Tooltip content="ลบคำถาม">
                      {/* <DeleteIcon size={20} fill="#FF0080" onClick={() => {handleDeleteByID(value._id)}} /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF0080" className="bi bi-trash3-fill" viewBox="0 0 16 16"  onClick={() => {handleDeleteByID(value._id)}}>
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                      </svg>
                    </Tooltip>    
                  </Col>
                </Row>
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
            <p className='text-lg'>All Events</p>
            <div className='mt-4'>
              <Button flat auto color="success">
                <Link href={'/dashboard/event/add'}>
                  เพิ่มอีเว้นท์  
                </Link>
              </Button>
            </div>
          </header>
          <section className='p-3'>
            <RenderTable />
          </section>
      </main>
    </Layout>
  )
}
