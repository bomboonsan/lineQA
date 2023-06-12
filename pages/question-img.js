"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { RecoilRoot } from 'recoil';

import { useRecoilState } from 'recoil';
import {stateUser} from '../app/state/stateUser'

import Layout from './layout';

// Components FOR Dev Module

export default function Mockup({ Component, pageProps }) {
  
  // MOCKUP
  const [currentDataQuestion, setCurrentDataQuestion] = useState([]);


  useEffect(() => {
    // fetchData();
    fetchData();
  }, []);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionImage, setQuestionImage] = useState([]);
  const [answerImages, setAnswerImages] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/question/id/647861fd3382f8a3413174d7`);
      const jsonData = await response.json();
      setData(jsonData);
      setAnswers(jsonData.answer)
      // setCurrentDataQuestion([jsonData]) // ใช้สำหรับทดสอบ
      setCurrentDataQuestion(jsonData) // ใช้จริง
      const prefix = "http://localhost:5000/";
      setQuestionImage(prefix+jsonData.questionImage) // รูปภาพปกของตำถาม

      const prefixedImages = jsonData.answerImg.map((item) => prefix + item);
      setAnswerImages(prefixedImages) // รูปภาพคำตอบ []

    } catch (error) {
      console.error('Error:', error);
    }
  };  
  console.log(currentDataQuestion);





  const [dataSelectAnswer, setDataSelectAnswer] = useState([]);
  const handleSelectAnswer = (event, index) => {
    if (event.target.checked) {
      const updateValues = [...dataSelectAnswer, index].sort();
      setDataSelectAnswer(updateValues);
    } else {
      const updatedValues = dataSelectAnswer.filter(value => value !== index);
      setDataSelectAnswer(updatedValues);
    }
  };

  const handleSubmit = () => {
    if( new String(dataSelectAnswer).valueOf() == new String(currentDataQuestion.correct).valueOf()) {

      alert('ถูก');

    } else if(dataSelectAnswer == '') {
      alert('กรุณาเลือกคำตอบ')
    } else {
      alert('ผิด');

    }
  }
  // END MOCKUP


  return (
    <Layout>
      <RecoilRoot>
        <main className="">
          {data &&
            <header className='px-3 mb-3'>
              <h1 className='text-4xl font-bold mb-4'>Campaign name</h1>
              <p className='text-lg'>{currentDataQuestion.title}</p>
            </header>
          } {/* data */}
          {questionImage &&
          <figure className='mb-5'>
            <Image
                src={questionImage}
                alt="Mockup"
                width={800}
                height={800}
            />
          </figure>
          } {/* questionImage */}
          <section className='p-3'>
            
            {answers.map((item, index) => (
              
              <div key={index} className="answer-box">            
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`Answer_${index}`} // Dynamically set the id using index
                  value={index+1}
                  onChange={(event) => handleSelectAnswer(event, index)} 
                /> 
                <label 
                  className="form-check-label" 
                  htmlFor={`Answer_${index}`} // Dynamically set the htmlFor using index
                >
                  <div className='flex flex-wrap'>
                    <div className='basis-2/3'>
                      <span className='ms-2'>{item}</span>
                    </div>
                    <div className='basis-1/3'>
                      <Image
                        src={answerImages[index]}
                        alt="Mockup"
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </label>
              </div>              
            ))}
            <div className='mt-5'>   
              <button className="btn btn-block btn-primary text-xl text-white" onClick={handleSubmit}>
                ถัดไป
              </button>
            </div> 
          </section>
        </main>
      </RecoilRoot>
    </Layout>
    
  )
}
