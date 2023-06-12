import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";

import { useRecoilState } from 'recoil';
import {stateEvent} from '../../../../state/stateEvent'

export default function EventSetup() {
  // Recoil
  const [globalEvent, setGlobalEvent] = useRecoilState(stateEvent)
  useEffect(() => {
    setDataevent(globalEvent)
  }, [globalEvent]);  

  // prefix
  const [prefixImg, setPrefixImg] = useState('https://api.bomboonsan.com/');
  // useState
  const [dataEvent, setDataevent] = useState({});
  const campaignChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalEvent = {...globalEvent}
    newGlobalEvent.campaign = newValue;
    setGlobalEvent(newGlobalEvent)
  }
  const descriptionChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalEvent = {...globalEvent}
    newGlobalEvent.description = newValue;
    setGlobalEvent(newGlobalEvent)
  }
  const titleChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalEvent = {...globalEvent}
    newGlobalEvent.title = newValue;
    setGlobalEvent(newGlobalEvent)
  }
  const expirationChange = (e) => {
    // Set state to Globol
    const newValue = e.target.value;
    const newGlobalEvent = {...globalEvent}
    newGlobalEvent.expiration = newValue;
    setGlobalEvent(newGlobalEvent)
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

      const newGlobalEvent = {...globalEvent}
      newGlobalEvent.thumbnail = data[0].path;
      setGlobalEvent(newGlobalEvent)

      console.log('URL image:', data[0].path);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // nextStep > save state to GlobolState
  const handleSubmitSetup = () => {
    const newGlobalEvent = {...globalEvent}
    // SETSTATE
    newGlobalEvent.campaign = dataEvent.campaign
    newGlobalEvent.description = dataEvent.description
    newGlobalEvent.title = dataEvent.title
    newGlobalEvent.expiration = dataEvent.expiration
    // save
    setGlobalEvent(newGlobalEvent)
  }


  return (
            <div className='box-widget'>
              <h1 className='text-4xl font-semibold'>เพิ่มอีเวนท์ใหม่</h1>
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
                  {/* <input type="file" className="file-input file-input-sm file-input-bordered file-input-primary w-full" /> */}
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
              {/* <div className='mt-3'>
                <button className="btn btn-block btn-sm btn-primary" onClick={handleSubmitSetup}>NEXT</button>
              </div> */}
            </div>
  )
}
