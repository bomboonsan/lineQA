import Layout from '../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

// useCookies
import { useCookies } from 'react-cookie';

import { useRouter } from 'next/navigation';

export default function Dashboard() {

  const router = useRouter()
  
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const token = cookies.token;

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/contest`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteByID = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Contest?');
    if (confirmed) {
      try {
        // const response = await fetch(`https://api.bomboonsan.com/contest/id/${id}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json'
        //     // 'Authorization': `Bearer ${token}`
        //   },   
        // });

        const response = await fetch(`https://api.bomboonsan.com/contest/id/${id}`, {
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
                <Link href={`https://liff.line.me/1661407578-X6ro31ow?contest=${value._id}`} target="_blank" className='hover:text-blue-600'>
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
                    <Tooltip content="ข้อมูลอีเวนท์">
                      <Link href={`/dashboard/contest/${value._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                      </Link>
                    </Tooltip>
                  </Col>
                  <Col css={{ width: "auto" , marginLeft : "25px" }}>
                    <Tooltip content="แก้ไข">
                      <Link href={`/dashboard/contest/edit/${value._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFC107" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
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
                <Link href={'/dashboard/contest/add'}>
                  Add contest  
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
