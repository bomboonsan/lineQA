"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../../state/stateUser'
import {stateAnswer} from '../../state/stateAnswer'

// Components FOR Dev Module

export default function Mockup({ questionData , questionIndex }) {
  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");
  

  const [answerImages, setAnswerImages] = useState([]);
  useEffect(() => {
    const prefixedImages = {...questionData.answerImg};
    setAnswerImages(prefixedImages) // รูปภาพคำตอบ []
  }, [questionData]);

  const [globolAnswer, setGlobolAnswer] = useRecoilState(stateAnswer)

  const [answers, setAnswers] = useState(['']);
  useEffect(() => {
    setAnswers(questionData.answer)
  }, [questionData]);

  // ดึงค่าคำตอบ User
  const [dataSelectAnswer, setDataSelectAnswer] = useState(Array(questionData.answer.length).fill(false)); // ค่าเริ่มต้น ให้มีจำนวน arr เท่ากับ questionData.answer และค่าเริ่มต้น false
  const handleSelectAnswer = (event, index) => {
    const updateValues = [...dataSelectAnswer];
    updateValues[event.target.value] = true;
    if (event.target.checked) {
      updateValues[event.target.value] = true
    } else {
      updateValues[event.target.value] = false
    }
    setDataSelectAnswer(updateValues);    
  };

  useEffect(() => {
    const newGlobolAnswer = [...globolAnswer]
    newGlobolAnswer[questionIndex] = dataSelectAnswer
    setGlobolAnswer(newGlobolAnswer)
  }, [dataSelectAnswer]);

  return (
      <main className="">
        <header className='px-3 mb-3'>
          <h1 className='text-4xl font-bold mb-4'>Campaign name</h1>
          <p className='text-lg'>{questionData.title} <small>({questionData.point})</small></p>
        </header>
        <figure className='mb-5'>
            <img
                className='w-full'
                src={prefixUrl+questionData.questionImage}
                alt="Mockup"
                width={800}
                height={800}
            />
        </figure>
        <section className='p-3'>            
            {answers && answers.map((item, index) => (
              
              <div key={index} className="answer-box">            
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`Answer_${index}`} // Dynamically set the id using index
                  value={index}
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
                      <img
                        src={prefixUrl+answerImages[index]}
                        alt="Mockup"
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </label>
              </div> 
              
            ))}
          </section>
      </main>
    
  )
}
