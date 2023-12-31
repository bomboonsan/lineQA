import Layout from '../../components/dashboard/template/layout';
import Image from 'next/image'

import { useEffect, useState , useMemo  } from 'react';

import { Button , Textarea } from "@nextui-org/react";

// useCookies
import { useCookies } from 'react-cookie';

import { useRouter } from 'next/router'

// sweetalert2
import Swal from 'sweetalert2'

// Editor
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function Dashboard() {

  const router = useRouter()
  const [value, setValue] = useState('');
  const [html, setHtml] = useState('');
  const [ishtml, setIshtml] = useState(false);
  const [textBtn, setTextBtn] = useState('HTML');
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://boschthailandbackend.bomboonsan.com/setting/id/648d0250cd1e81175e49605f`);
      const jsonData = await response.json();
      setValue(jsonData.termsConditions);
      // console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const switchHtml = () => {
    if (ishtml) {
      setValue(html);
      setIshtml(false)
      setTextBtn('HTML')
    } else {
      setHtml(value);
      setIshtml(true)
      setTextBtn('VISUAL')
    }
  }

  const quillSubmit = async() => {
    try {
      const bodyJson = {
        "termsConditions" : value,
      }
      // const response = await fetch('https://boschthailandbackend.bomboonsan.com/contest/add', {
      const response = await fetch('https://boschthailandbackend.bomboonsan.com/setting/id/648d0250cd1e81175e49605f', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
          // 'Authorization': 'Bearer your_token_here'
        },        
        // body: JSON.stringify({ value: inputValue }),
        body: JSON.stringify(bodyJson),
      });

      const jsonData = await response.json();

      // if (jsonData.status == 'success') {
      //   alert('Request sent successfully!');          
      //   window.location.reload();
      // } else {
      //   console.error('Request failed!');
      // }


      Swal.fire({
        icon: 'success',
        title: 'Terms and Conditions Saved !!',
      })

    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <Layout>
        <main className="">
          <h2 className='text-2xl font-bold mb-4'>ตั้งค่าข้อกำหนดในการให้บริการ (Terms and Conditions)</h2>
          <div className='text-right'>
          <button className="btn btn-sm btn-wide rounded-[0px] mt-5" onClick={switchHtml}>{textBtn}</button>
          </div>
          {ishtml ? (
            <Textarea
            width='100%'
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            // label="HTML CODE"
            placeholder="Enter your html code."
          />
          ) : (
<ReactQuill theme="snow" value={value} onChange={setValue} />
          )}
          {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
          <button className="btn btn-sm btn-wide btn-primary mt-5" onClick={quillSubmit}>บันทึก</button>         

          {/* <Textarea
            width='100%'
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            label="HTML CODE"
            placeholder="Enter your html code."
          /> */}
        </main>
    </Layout>
  )
}
