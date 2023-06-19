import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Tooltip , Radio } from "@nextui-org/react";

import { useRecoilState } from 'recoil';
import {stateEvent} from '../../../../state/stateEvent'

export default function ResultGenerate( {minPoint , countResult} ) {
  const [currentResult, setCurrentResult] = useState(countResult);

  // Recoil
  const [globalEvent, setGlobalEvent] = useRecoilState(stateEvent)
  useEffect(() => {
    setDataevent(globalEvent)
  }, [globalEvent]);    


  useEffect(() => {
    if (minPoint !== null) {
      setResultData({
        "pointMin" : String(minPoint),
        "pointMax" : null,
        "resultText" : '',
        "resultImageUrl" : ''
      })
    }
  }, []);    

  // useState
  const [dataEvent, setDataevent] = useState({});

  // prefix
  const [prefixImg, setPrefixImg] = useState('https://api.bomboonsan.com/');
  const [resultData, setResultData] = useState({
    "pointMin" : '0',
    "pointMax" : null,
    "resultText" : '',
    "resultImageUrl" : ''
  });

  const handleText = (event) => {
    const inputText = event.target.value;
    const newResultData = {...resultData}
    newResultData.resultText = inputText;
    setResultData(newResultData);    
  }
  const handleMin = (event) => {
    const inputText = event.target.value;
    const newResultData = {...resultData}
    newResultData.pointMin = inputText;
    setResultData(newResultData);
  }
  const handleMax = (event) => {
    const inputText = event.target.value;
    const newResultData = {...resultData}
    newResultData.pointMax = inputText;
    setResultData(newResultData);
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
      
      // setUrlThumbnail(data[0].path);

      // Set Data
      const newResultData = {...resultData}
      newResultData.resultImageUrl = data[0].path;
      setResultData(newResultData);

      console.log('URL image:', data[0].path);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Update State
  useEffect(() => {
    updateGlobolState();
    // handleCheck();
  }, [resultData]);

  const updateGlobolState = () => {   

    const newGlobolState  = {...globalEvent};
    const newResults = [...newGlobolState.results]
    newResults[currentResult] = resultData
    newGlobolState.results = newResults
    
    setGlobalEvent(newGlobolState)
  }
  

  return (
      <>
        <div className='flex flex-wrap justify-between mb-4'>
          <div className='flex-initail'>
            <Input 
              value={resultData.pointMin}
              onChange={(event) => handleMin(event)}
              type='number'
              label="คะแนนต่ำที่สุด"
              disabled={true}
              placeholder="ระบุตัวเลข"
              color="error"
            />
          </div>
          <div className='flex-initail'>
            <Input 
              value={resultData.pointMax}
              onChange={(event) => handleMax(event)}
              type='number'
              label="คะแนนสูงที่สุด"
              placeholder="ระบุตัวเลข"
              color="success"
            />
          </div>
        </div>

        <div>
        <Textarea 
          value={resultData.resultText}
          onChange={(event) => handleText(event)}
          placeholder="ข้อความผลลัพท์"
          css={{
            width: '100%',
          }}
        />
        </div>

        <div className='mt-4'>
        {resultData.resultImageUrl && <img className="w-auto mx-auto h-auto rounded-3 mb-4" src={prefixImg+resultData.resultImageUrl} alt="Selected Image" />}
          <form className="flex items-center space-x-6">
            <label className="block">
              <span className="sr-only">Choose File</span>
              <input 
                onChange={handleFileUpload}
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
          </form>
        </div>      

      </>
  )
}
