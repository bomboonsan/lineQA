import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Tooltip } from "@nextui-org/react";

import { useRecoilState } from 'recoil';
import {stateEvent} from '../../../../state/stateEvent'

export default function QuestionText( { contentQuestion , countQuestion } ) {
  // console.log('ตอนนี้กำลังอยู่ที่คำถามที่ index array = '+props.countQuestion)
  const [currentQuestion, setCurrentQuestion] = useState(countQuestion);

  // Recoil
  const [globalEvent, setGlobalEvent] = useRecoilState(stateEvent)
  useEffect(() => {
    setDataevent(globalEvent)
  }, []);    

  // useState
  const [dataEvent, setDataevent] = useState({});
  
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [inputTitle, setInputTitle] = useState('');
  const [inputEmbed, setInputEmbed] = useState('');
  const [answerCorrect, setAnswerCorrect] = useState([false, false, false]);
  const [point, setPoint] = useState('');

  // Question Data Default Format
  const [stateQuestion , SetStateQuestion] = useState({
    "title": null,
    "embed": null,
    "questionImage": null,
    "type": null,
    "point": null,
    "answer": [],
    "answerImg": [],
    "status": {
      "complete" : false
    }
  });


  // SET QUESTION STATE 
  useEffect(() => {
    if(contentQuestion.title && contentQuestion.embed) {

      setInputTitle(contentQuestion.title)
      setInputValues(contentQuestion.answer)
      setPoint(contentQuestion.point)
      setInputEmbed(contentQuestion.embed)

    }
    
  }, [contentQuestion]);

  const incrementQuestion = () => {
    const newGlobolEvent = {...globalEvent}
    const newListQuestions = [...newGlobolEvent.questions,'']
    newGlobolEvent.questions = newListQuestions
    setGlobalEvent(newGlobolEvent)
  }

  const handleAddIndex = () => {
    setInputValues([...inputValues, '']);
    setPoint([...point, '']);

    updateGlobolState();
  };
  const handleRemoveIndex = () => {
    setInputValues(inputValues.slice(0, -1));
    setPoint(point.slice(0, -1));

    updateGlobolState();
  };

  const handleTitleChange = (event) => {
    const newTitleChange = event.target.value;
    setInputTitle(newTitleChange);    
  };

  const handleEmbedChange = (event) => {
    const newEmbedChange = event.target.value;
    setInputEmbed(newEmbedChange);    

    // ตรวจสอข input ว่าเป็นโค้ด HTML หรือไม่
    const hasHTMLCode = containsHTMLCode(newEmbedChange);
  };

  const containsHTMLCode = (inputValue) => {
    const htmlRegex = /<[a-z][\s\S]*>/i; // Regular expression to match HTML tags  
    return htmlRegex.test(inputValue);
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
  

  // Update State
  useEffect(() => {
    updateGlobolState();
  }, [inputValues,inputTitle,point,inputEmbed]);

  const updateGlobolState = () => {
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
    } else if (inputValues.includes('')) {
      status = {
        "complete": false,
        "msg": 'กรุณาระบุคำตอบให้ครบด้วยครับ',
      }
    } else if (inputEmbed == ''|| inputEmbed == null) {
      status = {
        "complete": false,
        "msg": 'กรุณาใส่โค้ด Embed ของวิดีโอด้วยครับ',
      }
    }else if (point == '' || point == null) {
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
      "embed": inputEmbed,
      "type": "embed",
      "point": point,      
      "answer": inputValues,
      "status": status
    };
    
    const newGlobolState  = {...globalEvent};
    const newQuestions = [...newGlobolState.questions]
    newQuestions[currentQuestion] = bodyJson
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
          "embed": inputEmbed,
          "type": "embed",
          "point": point,
          "answer": inputValues
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
      }

    }

    
  };

  return (
      <div className="">
        <form onSubmit={handleSubmit}>
          <header className='px-3 mb-3'>
            <Input 
              label="คำถาม"
              placeholder="ระบุคำถาม" 
              value={inputTitle}
              onChange={(event) => handleTitleChange(event)} 
              css={{
                width: '100%',
              }}
            />
          </header>
          <section className='px-3 mb-3'>
          <Textarea 
              label="Embed"
              placeholder="Embed code" 
              value={inputEmbed}
              onChange={(event) => handleEmbedChange(event)} 
              css={{
                width: '100%',
              }}
            />
          </section>
          <section className='p-3'>
            
            {inputValues.map((value, index) => (
              <div key={index} className='pt-8'>
                <div className='flex flex-wrap items-center gap-4'>                  
                  <div className='flex-1'>
                    <Input 
                      key={index}
                      clearable 
                      bordered 
                      labelPlaceholder={`คำตอบข้อที่ ${index+1}`}
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
                      labelPlaceholder={`คะแนนข้อที่ ${index+1}`}
                      initialValue="" 
                      value={point[index]}
                      onChange={(event) => handlePointChange(event, index)}
                      css={{
                        width: '120px',
                      }}
                    />
                  </div>
                </div>
                <hr className='mt-8' />
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
