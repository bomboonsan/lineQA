import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Tooltip } from "@nextui-org/react";

import { useRecoilState } from 'recoil';
import {stateEvent} from '../../../../state/stateEvent'

export default function QuestionImage( { contentQuestion , countQuestion , propDataEvent } ) {
  
  // console.log('ตอนนี้กำลังอยู่ที่คำถามที่ index array = '+props.countQuestion)
  const [currentQuestion, setCurrentQuestion] = useState(countQuestion);

  // Recoil

  const [globalEvent, setGlobalEvent] = useRecoilState(stateEvent)
  useEffect(() => {
    setDataevent(globalEvent)    
  }, [globalEvent]);
  console.log('propDataEvent')
  console.log(propDataEvent)
  console.log('test')
  console.log(globalEvent)

  // prefix
  const [prefixImg, setPrefixImg] = useState('https://boschthailandbackend.bomboonsan.com/');

  // useState
  const [dataEvent, setDataevent] = useState({});
  
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [inputTitle, setInputTitle] = useState('');
  const [point, setPoint] = useState(['', '', '']);

  // Question Data Default Format
  const [stateQuestion , SetStateQuestion] = useState({
    "title": null,
    "embed": null,
    "questionImage": null,
    "type": null,
    "point": [],
    "answer": [],
    "answerImg": [],
    "status": {
      "complete" : false
    }
  });

  // SET QUESTION STATE 
  useEffect(() => {
    if(contentQuestion.title && contentQuestion.questionImage) {

      setInputTitle(contentQuestion.title)
      setInputValues(contentQuestion.answer)
      setPoint(contentQuestion.point)
      setUrlThumbnail(contentQuestion.questionImage)
      setUrlAnswerImages(contentQuestion.answerImg)

    }
    
  }, [contentQuestion]);


  const handleAddIndex = () => {
    setInputValues([...inputValues, '']);
    setPoint([...point, '']);
  };
  const handleRemoveIndex = () => {
    setInputValues(inputValues.slice(0, -1));
    setPoint(point.slice(0, -1));
  };

  const handleTitleChange = (event) => {
    const newTitleChange = event.target.value;
    setInputTitle(newTitleChange);
  };

  const handlePointChange = (event, index) => {
    const newPointValues = [...point];
    newPointValues[index] = Number(event.target.value);
    setPoint(newPointValues);
  };
  
  
  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

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
      const response = await fetch('https://boschthailandbackend.bomboonsan.com/upload/image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      setUrlThumbnail(data[0].path);
      console.log('URL image:', data[0].path);
    } catch (error) {
      console.error('Error uploading image:', error);
    }

  };

  // Images Answer
  const [urlAnswerImages, setUrlAnswerImages] = useState([]);
  const handleAnswerImageUpload = async (event,index) => {
    
    const files = Array.from(event.target.files);
    console.log(files);
    console.log('INDEX : '+index)

    const formData = new FormData();
    formData.append('image', files[0]);

    console.log(urlAnswerImages[index])

    if (urlAnswerImages[index] !== undefined) {
      // ถ้ามีไฟล์ใน index นี้อยู่แล้วให้ลบออกก่อน
      await removeImage(urlAnswerImages[index])
    }

    try {
      const response = await fetch('https://boschthailandbackend.bomboonsan.com/upload/image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const responsUrl = data[0].path;
      const newArr = [...urlAnswerImages]
      newArr[index] = responsUrl
      setUrlAnswerImages(newArr);

    } catch (error) {
      console.error('Error uploading image:', error);
    }

  }


  const removeImage = async (url) => {
    url = url.replace('images/','')
    try {
      const response = await fetch(`https://boschthailandbackend.bomboonsan.com/upload/image/delete/${url}`, {
        method: 'DELETE',
      })
      console.log(response)
    } catch (error) {
      console.error('Error image delete:', error);
    }    
  }


  // Update State
  useEffect(() => {
    updateGlobolState();
  }, [inputValues,inputTitle,point,urlThumbnail,urlAnswerImages]);  
  

  const updateGlobolState = async () => {
    // CHECK COMPLETE
    let status = {
      "complete": false,
      "msg": '',
    }
    
    if (inputTitle == '' || inputTitle == null) {
      status = {
        "complete": false,
        "msg": 'กรูณาระบุคำถาม',
      }
    } else if (urlThumbnail == '' || urlThumbnail == null) {
      status = {
        "complete": false,
        "msg": 'กรุณาเพิ่มรูปภาพหน้าปกคำถามด้วยครับ',
      }
    } else if (inputValues.includes('')) {
      status = {
        "complete": false,
        "msg": 'กรุณาระบุคำตอบให้ครบด้วยครับ',
      }
    } 
    // else if (urlAnswerImages.length !== inputValues.length) {
    //   status = {
    //     "complete": false,
    //     "msg": 'กรุณาเพิ่มรูปภาพให้ครบด้วยครับ',
    //   }
    // } 
    else if (point == '' || point == null) {
      status = {
        "complete": false,
        "msg": 'กรุณาระบุคะแนน',
      }
    } else {
      status = {
        "complete": true,
      }
    }
    // END CHECK

    const bodyJson = {
      "title": inputTitle,
      "type": "image",
      "questionImage": urlThumbnail,
      "point": point,
      "answer": inputValues,
      "answerImg": urlAnswerImages,
      "status": status
    };

    const finalJson = { ...stateQuestion, ...bodyJson };
    
    const newGlobolState  = {...globalEvent};
    const newQuestions = [...newGlobolState.questions]
    newQuestions[currentQuestion] = finalJson
    // newQuestions[currentQuestion] = JSON.parse(bodyJson)
    newGlobolState.questions = newQuestions
    setGlobalEvent(newGlobolState)    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isOk = false;
    let alertErrorText = '';
    if (inputTitle == '') {
      alertErrorText = 'กรุณาระบบุคำตอบด้วยครับ'
    } else if(inputValues.includes("")) {
      alertErrorText = 'กรุณาระบุตัวเลือกคำตอบให้ครบด้วยครับ'
    } else if(point =='') {
      alertErrorText = 'กรุณาระบุจำนวนคะแนนของข้อนี้ด้วยครับ'
    } else {
      isOk = true;
    }


    if (!isOk) {
      alert(alertErrorText)
    } else {
      
      

      try {
        const bodyJson = {
          "title": inputTitle,
          "type": "image",
          "questionImage": urlThumbnail,
          "point": point,
          "answer": inputValues,
          "answerImg": urlAnswerImages
        };
        // Merge Json ทำให้ผลลัพท์อยู่ใน format เดียวกันทุกคำถาม
        const finalJson = { ...stateQuestion, ...bodyJson };
        
        const newGlobolState  = {...globalEvent};
        const newQuestions = [...newGlobolState.questions]
        // newQuestions[currentQuestion] = JSON.stringify(bodyJson)
        newQuestions[currentQuestion] = finalJson
        newGlobolState.questions = newQuestions
        setGlobalEvent(newGlobolState)
        
        

      } catch (error) {
        // Handle any network errors here
        console.error('Network error:', error);
      } finally {
        // เพิ่มคำถาม
        const newGlobolEvent = {...globalEvent}
        const newListQuestions = [...newGlobolEvent.questions,'']
        newGlobolEvent.questions = newListQuestions
        setGlobalEvent(newGlobolEvent)
      }

    }
    
  };  


  return (
      <div className="">
        <form onSubmit={handleSubmit}>
          <header className='px-3 mb-3'>
            <Textarea 
              label="คำถาม"
              placeholder="ระบุคำถาม" 
              value={inputTitle}
              onChange={(event) => handleTitleChange(event)} 
              css={{
                width: '100%',
              }}
            />
          </header>
          <section className='my-3'>
            {!urlThumbnail && <p className='text-red-500 px-3'>กรุณาเลือกรูปหน้าปกคำถาม</p> }
            {urlThumbnail && <img className="w-auto mx-auto h-auto rounded-3 mb-3" src={prefixImg+urlThumbnail} alt="Selected Image" />}
            <form className="flex items-center space-x-6">
              <label className="block">
                <span className="sr-only">Choose File</span>
                <input 
                  onChange={handleFileUpload}
                  type="file"
                  // accept="image/png, image/gif, image/jpeg, image/webp"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </form>
          </section>
          <section className='p-3'>
            
            {inputValues.map((value, index) => (
              <div key={index} className="answer-box">            
              <label className="form-check-label" for="Answer_1">
                <div className='flex flex-wrap gap-4'>
                <div className='flex-1'>
                    <Input 
                      key={index}
                      clearable 
                      bordered 
                      label={`คำตอบข้อที่ ${index+1}`}
                      initialValue="" 
                      value={value}
                      onChange={(event) => handleInputChange(event, index)}
                      css={{
                        width: '100%',
                      }}
                    />
                  </div>
                  <div className='flex-initial'>
                    <Input 
                      type='number'
                      key={index}
                      clearable 
                      bordered 
                      label={`คะแนนข้อที่ ${index+1}`}
                      initialValue="" 
                      value={point[index]}
                      onChange={(event) => handlePointChange(event, index)}
                      css={{
                        width: '120px',
                      }}
                    />
                  </div>
                  
                  <div className='basis-full w-full mt-3'>
                    {!urlAnswerImages[index] && <p className='text-red-500 px-3'>กรุณาเลือกรูปคำตอบ</p> }
                    {urlAnswerImages[index] &&
                      <img
                      src={prefixImg+urlAnswerImages[index]}
                      alt="Mockup"
                      width={300}
                      height={300}
                      title={`รูปประจำคำตอบข้อที่ ${index+1}`}
                    />
                    }
                    <div className="flex items-end space-x-6">
                      <label className="block">
                        <span className="sr-only">Choose File</span>
                        <input 
                          onChange={(event) => handleAnswerImageUpload(event, index)}
                          type="file"
                          accept="image/*"
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </label>                          
                    </div>                    
                  </div>
                </div>
              </label>
            </div>
            ))}
            
            <div className='flex flex-wrap'>
              <div className='basis-full md:basis-2/3 lg:basis-1/2 mt-5'>
                <div className='flex flex-wrap gap-3'>
                  <div className='flex-initial'>
                    <Button flat type="button" color="success" auto onClick={() => handleAddIndex()}>
                      เพิ่มจำนวนคำตอบ
                    </Button>
                  </div>
                  <div className='flex-initial'>
                  <Button flat type="button" color="error" auto onClick={() => handleRemoveIndex()}>
                    ลดจำนวนคำตอบ
                  </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='mt-5'>
              <Button type="submit" shadow color="primary"
              >
                คำถามต่อไป
              </Button>
            </div> */}
          </section>
        </form>
      </div>
  )
}
