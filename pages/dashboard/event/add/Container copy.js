import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";

import QuestionSelectType from './QuestionSelectType';
import ResultGenerate from './ResultGenerate';


import EventSetup from './EventSetup';

import { useRecoilState } from 'recoil';
import {stateEvent} from '../../../../app/state/stateEvent'

export default function Container({ Component, pageProps }) {

  const [globalEvent, setGlobalEvent] = useRecoilState(stateEvent)
  useEffect(() => {
    setDataevent(globalEvent)
    setListQuestion(globalEvent.questions)
    setListResult(globalEvent.results)
  }, [globalEvent]);  
  const [dataEvent, setDataevent] = useState({});
  const [listQuestion, setListQuestion] = useState([]);
  const [listResult, setListResult] = useState([]);
  // console.log(globalEvent)
  // console.log(listQuestion)
  
  const incrementQuestion = () => {
    const newGlobolEvent = {...globalEvent}
    const newListQuestions = [...newGlobolEvent.questions,'']
    newGlobolEvent.questions = newListQuestions
    setGlobalEvent(newGlobolEvent)
  }
  const decrementQuestion = () => {
    const newGlobolEvent = {...globalEvent}
    const newListQuestions = newGlobolEvent.questions.slice(0, -1)
    
    newGlobolEvent.questions = newListQuestions
    setGlobalEvent(newGlobolEvent)
  }

  const checkGlobolState = () => {
    console.log(globalEvent)
  }

  const [stateStep, setStateStep] = useState(1);
  const nextStep = () => {
    if (stateStep < 3) {
      setStateStep(stateStep+1)
    }
  }
  
  return (
      <main className="">
        <div className='flex flex-wrap'>
          <div className='basis-full text-center mb-4'>
            <ul className="steps">
              <li id='step1' className={`step ${stateStep >= 1 ? 'step-primary' : ''}`}>ตั้งค่าข้อมูลอีเวนท์</li>
              <li id='step2' className={`step ${stateStep >= 2 ? 'step-primary' : ''}`}>สร้างชุดคำถาม</li>
              <li id='step3' className={`step ${stateStep >= 3 ? 'step-primary' : ''}`}>กำหนดหน้าผลลัพท์</li>
            </ul>
          </div>
          <section className='basis-full md:basis-1/3 px-3 mb-3'>            
            <div className='sticky top-1'>
              <EventSetup />
              <div className='flex flex-wrap mt-4'>
                <div className='basis-1/2 w-1/2 px-2'>
                  <Button shadow color="success" auto  onClick={incrementQuestion} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                    เพิ่มคำถาม
                  </Button>
                </div>
                <div className='basis-1/2 w-1/2 px-2'>
                  <Button shadow color="error" auto  onClick={decrementQuestion} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                  ลบคำถาม
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className='basis-full md:basis-2/3 px-3 mb-3'>


            {listQuestion.map((item,index) => (
              <div key={index} className='box-widget'>
                <h2 className='text-4xl font-semibold mb-2'>คำถามที่ {index+1}</h2>
                <QuestionSelectType countQuestion={index} />
              </div>
            ))}
            {/* <div className='mt-5'>
              <Button shadow color="gradient" auto onClick={checkGlobolState}>
              CHECK STATE
              </Button>
            </div> */}


            <div className='mt-5'>
              <hr className='mb-3'></hr>
              {/* <ResultGenerate /> */}
              {listResult.map((item,index) => (
                <div key={index} className='box-widget'>
                  <h2 className='text-4xl font-semibold mb-2'>ผลลัพท์ที่ {index+1}</h2>
                  <ResultGenerate countResult={index} />
                </div>
              ))

              }              
            </div>
            

          </section>
        </div>

        <nav>
          <div className='mt-5 text-center'>
            <button className="btn btn-wide btn-primary text-white rounded-xl" onClick={nextStep}>
              NEXT STEP
            </button>
          </div>
        </nav>
          
      </main>
  )
}
