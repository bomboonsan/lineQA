import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState , useRef } from 'react';

import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";

import QuestionSelectType from './QuestionSelectType';
import ResultGenerate from './ResultGenerate';

import QuestionText from './QuestionText';
import QuestionImage from './QuestionImage';

import EventSetup from './EventSetup';

import { useRecoilState } from 'recoil';
import {stateEvent} from '../../../../state/stateEvent'

import {SSRProvider} from 'react-aria'

// sweetalert2
import Swal from 'sweetalert2'

export default function Container({ propDataEvent }) {

  

  const [globalEvent, setGlobalEvent] = useRecoilState(stateEvent)
  useEffect(() => {
    setDataevent(globalEvent)
    setListQuestion(globalEvent.questions)
    setListResult(globalEvent.results)
  }, [globalEvent]);  

  const [dataEvent, setDataevent] = useState({});
  const [listQuestion, setListQuestion] = useState([]);
  const [listResult, setListResult] = useState([]);

  const emtryQuestion = {
    "title": null,
    "embed": null,
    "questionImage": null,
    "type": null,
    "point": [],
    "answer": [],
    "answerImg": [],
    "status": {
      "complete" : false,
      "msg" : "กรุณาระบุคำถาม"
    }
  }

  const emtryResult = {
    "pointMin" : null,
    "pointMax" : null,
    "resultText" : '',
    "resultImageUrl" : '',
  }
  
  const [totatPoint, seTotalPoint] = useState(0);
  useEffect(() => {
    const newGlobolEvent = {...globalEvent}
    let allPoint = []
    // console.log(allPoint)
    
    for (let i = 0; i < newGlobolEvent.questions.length; i++) {
      allPoint.push(newGlobolEvent.questions[i].point)
    }

    let sum = 0;
    for (let i = 0; i < allPoint.length; i++) {
      sum += parseInt(allPoint[i]);
    }
    seTotalPoint(sum)
  }, [globalEvent]);    

  const incrementQuestion = () => {
    const newGlobolEvent = {...globalEvent}
    // CHECK ERROR
    // last array
    let lastQuestion = newGlobolEvent.questions[newGlobolEvent.questions.length - 1];
    if (lastQuestion.status.complete == false) {
      alert(lastQuestion.status.msg)
    } else {
      const newListQuestions = [...newGlobolEvent.questions,emtryQuestion]
      newGlobolEvent.questions = newListQuestions
      setGlobalEvent(newGlobolEvent)
    }
  }

  const decrementQuestion = () => {
    const newGlobolEvent = {...globalEvent}
    if (newGlobolEvent.questions.length > 1) {
      const newListQuestions = newGlobolEvent.questions.slice(0, -1)    
      newGlobolEvent.questions = newListQuestions
      setGlobalEvent(newGlobolEvent)
    }
  }

  // ลบคำถามโดยระบบุ INDEX (ยังใช้ไม่ได้)
  const questionItemRefs = useRef([]);
  const removeQuestionIndex = (index) => {
    // REMOVE ARRAY
    const newGlobolEvent = {...globalEvent}
    const newGlobolEventQuestions = [...newGlobolEvent.questions]

    if (index >= 0 && index < newGlobolEventQuestions.length) {
      // REMOVE ARRAY
      newGlobolEventQuestions.splice(index, 1);
      newGlobolEvent.questions = newGlobolEventQuestions
      setGlobalEvent(newGlobolEvent)
    }
  }

  const incrementResult = () => {
    const newGlobolEvent = {...globalEvent}
    // const newListResult = [...newGlobolEvent.results,emtryResult]
    // newGlobolEvent.results = newListResult
    // setGlobalEvent(newGlobolEvent)
    // CHECK ERROR
    // last array
    let lastResult = newGlobolEvent.results[newGlobolEvent.results.length - 1];
    if (lastResult.resultText == '') {
      alert('กรุณาระบุข้อความสำหรับผลลัพท์นี้')
    } else if (lastResult.pointMin == null) {
      alert('กรุณาระบุค่าคะแนนต่ำที่สุดสำหรับผลลัพท์นี้')
    }
    else if (lastResult.pointMin == null) {
      alert('กรุณาระบุค่าคะแนนสูงที่สุดสำหรับผลลัพท์นี้')
    }
    else if (lastResult.resultImageUrl == '') {
      alert('กรุณาเลือกรูปผลลัพท์นี้')
    } else {
      // เพิ่มผลลัพท์
      const newListResult = [...newGlobolEvent.results,emtryResult]
      newGlobolEvent.results = newListResult
      setGlobalEvent(newGlobolEvent)
    }
  }
  const decrementResult = () => {
    const newGlobolEvent = {...globalEvent}
    if (newGlobolEvent.results.length > 1) {
      const newListResult = newGlobolEvent.results.slice(0, -1)    
      newGlobolEvent.results = newListResult
      setGlobalEvent(newGlobolEvent)
    }
  }

  const checkGlobolState = () => {
    console.log(globalEvent)
  }

  const [stateStep, setStateStep] = useState(1);
  const nextStep = () => {
    // let completeSetup = true;
    // const newGlobolEvent = {...globalEvent}
    // if (newGlobolEvent.campaign && newGlobolEvent.description && newGlobolEvent.thumbnail) {
    // } else {
    //   completeSetup = false
    //   alert ('กรุณาระบุข้อมูลทุกช่องด้วยครับ')
    // }
    // // totatPoint
    // console.log('totatPoint'+totatPoint)

    // if (stateStep < 3 && completeSetup) {
    //   if (stateStep == 1) {
    //     setStateStep(stateStep+1) 
    //   } else if (stateStep == 2 && totatPoint > 0) {
    //     setStateStep(stateStep+1) 
    //   } else {
    //     const newGlobolEvent = {...globalEvent}
    //     let lastQuestion = newGlobolEvent.questions[newGlobolEvent.questions.length - 1];
    //     if (lastQuestion.status.complete == false) {
    //       alert(lastQuestion.status.msg)
    //     }
    //   }
    // }

    // BYPASS
    setStateStep(stateStep+1) 

  }
  const previousStep = () => {
    if (stateStep > 0) {
      setStateStep(stateStep-1)
    }
  }

  const eventSubmit = async () => {

    console.log('id '+propDataEvent._id)

    const newGlobolEvent = {...globalEvent}
    let lastResult = newGlobolEvent.results[newGlobolEvent.results.length - 1];
    if (lastResult.resultText == '') {
      alert('กรุณาระบุข้อความสำหรับผลลัพท์ล่าสุด')
    } else if (lastResult.pointMin == null) {
      alert('กรุณาระบุค่าคะแนนต่ำที่สุดสำหรับผลลัพท์ล่าสุด')
    }
    else if (lastResult.pointMin == null) {
      alert('กรุณาระบุค่าคะแนนสูงที่สุดสำหรับผลลัพท์ล่าสุด')
    }
    else if (lastResult.resultImageUrl == '') {
      alert('กรุณาเลือกรูปผลลัพท์ล่าสุด')
    } else {
      try {
        const response = await fetch(`https://boschthailandbackend.bomboonsan.com/event/update/${propDataEvent._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },        
          body: JSON.stringify(globalEvent),
        });

        if (response.ok) {
          // Success, handle the response here
          // alert('Request sent successfully!');
          // window.location.reload();
          Swal.fire({
            icon: 'success',
            title: 'Event update successfully',
          }).then((e) => {
            router.push('/dashboard/event')
          })
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
    <SSRProvider>
      <main className="mx-auto max-w-2xl">
        <div className='text-center mb-4'>
          <ul className="steps">
            <li id='step1' className={`step ${stateStep >= 1 ? 'step-primary' : ''}`}>ตั้งค่าข้อมูลอีเวนท์</li>
            <li id='step2' className={`step ${stateStep >= 2 ? 'step-primary' : ''}`}>สร้างชุดคำถาม</li>
            <li id='step3' className={`step ${stateStep >= 3 ? 'step-primary' : ''}`}>กำหนดหน้าผลลัพท์</li>
          </ul>
        </div>
        
        <section className={`${stateStep === 1 ? 'px-3 mb-3 animation-fadeIn relative' : 'd-none'}`}>      
          <EventSetup propDataEvent={propDataEvent} />
        </section>
        <section className={`${stateStep === 2 ? 'px-3 mb-3 animation-fadeIn relative' : 'd-none'}`}>

          {listQuestion.map((item,index) => (
            <div key={index} className='box-widget' ref={(el) => questionItemRefs.current[index] = el}>
              <h2 className='text-4xl font-semibold mb-2'>คำถามที่ {index+1}</h2>
              <QuestionSelectType contentQuestion={item} countQuestion={index} />

              {/* <QuestionImage contentQuestion={item} countQuestion={index} /> */}
            </div>
          ))}   

          <div className='md:absolute md:-right-14 md:top-1 md:min-w-[50px] md:h-full'>
            <div className='sticky top-1 left-0 text-center'>
              <div className='control-widget'>
                <div className='mb-3'>
                  <Tooltip content="เพิ่มคำถาม" placement="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ccc" className="bi bi-plus-circle-fill" viewBox="0 0 16 16" onClick={incrementQuestion}>
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                  </Tooltip>
                </div>
                <div className='mb-3'>
                  <Tooltip content="ลบคำถาม" placement="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ccc" className="bi bi-dash-circle" viewBox="0 0 16 16" onClick={decrementQuestion}>
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </section>          
        <section className={`${stateStep === 3 ? 'px-3 mb-3 animation-fadeIn relative' : 'd-none'}`}>
          <h2 className='text-center text-3xl mb-4'>
          คะแนนทั้งหมด {totatPoint}
          </h2>
          {listResult.map((item,index) => (
            <div key={index} className='box-widget'>
              <h2 className='text-4xl font-semibold mb-2'>ผลลัพท์ที่ {index+1}</h2>
              <ResultGenerate contentResult={item} countResult={index} />
            </div>
          ))

          }  
          <div className='md:absolute md:-right-14 md:top-1 md:min-w-[50px] md:h-full'>
            <div className='sticky top-1 left-0 text-center'>
              <div className='control-widget'>
                <div className='mb-3'>
                  <Tooltip content="เพิ่มผลลัพท์" placement="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ccc" className="bi bi-plus-circle-fill" viewBox="0 0 16 16" onClick={incrementResult}>
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                  </Tooltip>
                </div>
                <div className='mb-3'>
                  <Tooltip content="ลบผลลัพท์" placement="right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ccc" className="bi bi-dash-circle" viewBox="0 0 16 16" onClick={decrementResult}>
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className='flex flex-wrap justify-between mt-5 px-4'>
          {stateStep !== 1 &&
          <div className='flex-initial'>
            <button className="btn btn-wide btn-primary text-white rounded-xl" onClick={previousStep}>
              ย้อนกลับ
            </button>
          </div>
          }
          <div className='flex-initial'>
            {stateStep !== 3 ? (
              <button className="btn btn-wide btn-primary text-white rounded-xl" onClick={nextStep}>
              ถัดไป
            </button>
            ) : (
            <button className="btn btn-wide btn-success text-white rounded-xl" onClick={eventSubmit}>
              บันทึก
            </button>
            )
            
            }
          </div>
        </nav>
        
        <div className='mt-10 text-center'>
          <button className="btn btn-wide btn-primary text-white rounded-xl" onClick={checkGlobolState}>
              CHECK STATE
          </button>
        </div>
          
      </main>
      </SSRProvider>
  )
}
