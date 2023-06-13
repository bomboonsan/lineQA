import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";

import { useRecoilState } from 'recoil';
import {stateContest} from '../../../../state/stateContest'


export default function EventSetup() {
  // Recoil
  const [globalContest, setGlobalContest] = useRecoilState(stateContest)
  useEffect(() => {
    setDataevent(globalContest)
  }, [globalContest]);
  console.log(globalContest) 

  // prefix
  const [prefixImg, setPrefixImg] = useState('https://api.bomboonsan.com/');
    // useState
  const [longText, setLongText] = useState('');
  const [dataEvent, setDataevent] = useState({});
  const campaignChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalContest = {...globalContest}
    newGlobalContest.campaign = newValue;
    setGlobalContest(newGlobalContest)
  }
  const descriptionChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalContest = {...globalContest}
    newGlobalContest.description = newValue;
    setGlobalContest(newGlobalContest)
  }
  const titleChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalContest = {...globalContest}
    newGlobalContest.title = newValue;
    setGlobalContest(newGlobalContest)
  }
  const expirationChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalContest = {...globalContest}
    newGlobalContest.expiration = newValue;
    setGlobalContest(newGlobalContest)
  }

  // Image Thumbnail
  const [urlThumbnail, setUrlThumbnail] = useState('');
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    if (urlThumbnail !== '') {
      await removeImage(urlThumbnail)
    }
    try {
      const response = await fetch('https://api.bomboonsan.com/upload/image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      // Set Data
      setUrlThumbnail(data[0].path)

      const newGlobalContest = {...globalContest}
      newGlobalContest.thumbnail = data[0].path;
      setGlobalContest(newGlobalContest)

      console.log('URL image:', data[0].path);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const removeImage = async (url) => {
    url = url.replace('images/','')
    try {
      const response = await fetch(`https://api.bomboonsan.com/upload/image/delete/${url}`, {
        method: 'DELETE',
      })
      console.log(response)
    } catch (error) {
      console.error('Error image delete:', error);
    }    
  }

  // SUBMIT
  const eventSubmit = async () => {
    const newGlobalContest = {...globalContest}
    if (!newGlobalContest.campaign) {
      alert('กรุณาระบุชื่อแคมเปรญ')
    } else if (!newGlobalContest.description) {
      alert('กรุณาระบุคำอธิบาย')
    }
    else if (!urlThumbnail) {
      alert('กรุณาเลือกรูป Thumbnail')
    } else {
      try {
        const response = await fetch('https://api.bomboonsan.com/contest/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },        
          // body: JSON.stringify({ value: inputValue }),
          body: JSON.stringify(globalContest),
        });

        if (response.ok) {
          // Success, handle the response here
          alert('Request sent successfully!');
          window.location.reload();
        } else {
          // Handle the error response here
          console.error('Request failed!');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  }

  return (
            <>
            <div className='box-widget'>
              <h1 className='text-4xl font-bold mt-2'>ADD NEW CONTEST</h1>
              <div className='mt-3'>
                <Input 
                  type="text" 
                  width='100%'
                  label="ชื่อแคมเปญ *จำเป็น"
                  placeholder="ระบุข้อความ"
                  value={dataEvent.campaign}
                  onChange={(event) => campaignChange(event)} 
                />
              </div>
              <div className='mt-3'>              
                <Textarea
                  type="text" 
                  width='100%'
                  label="คำอธิบาย *จำเป็น"
                  value={dataEvent.description}
                  onChange={(event) => descriptionChange(event)} 
                  placeholder="ระบุข้อความ"
                />
              </div>
              <div className='mt-3'>
                <Input 
                  type="text" 
                  width='100%'
                  label="หัวข้อ (ไม่จำเป็น)"
                  value={dataEvent.title}
                  onChange={(event) => titleChange(event)} 
                  placeholder="ระบุข้อความ" 
                />
              </div>            
              <div className='mt-3'>
                {dataEvent.thumbnail && <img className="w-auto mx-auto h-auto rounded-3 mb-4" src={prefixImg+dataEvent.thumbnail} alt="Selected Image" />}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">เลือกรูป Thumbnail</span>
                    <span className="label-text-alt">* จำเป็น</span>
                  </label>
                  <input 
                    onChange={handleFileUpload}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-sm file-input-bordered file-input-primary w-full"
                  />
                </div>
              </div>
              <div className='mt-3'>
                <Input 
                  type="date" 
                  required={false}
                  width='100%'
                  label="วันสิ้นสุดของอีเวนท์ (ไม่จำเป็น)"
                  value={dataEvent.expiration}
                  onChange={(event) => expirationChange(event)} 
                  placeholder="วันสิ้นสุดของอีเวนท์" 
                />
              </div>
            </div>
            <div className='my-4'>
              <button className="btn btn-block btn-primary text-white text-xl rounded-xl" onClick={eventSubmit}>
                  บันทึก
              </button>
            </div>
            </>
  )
}
