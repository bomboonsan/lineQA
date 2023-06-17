"use client";
import { useState, useEffect , useMemo } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../../state/stateUser'
import {stateAnswer} from '../../state/stateAnswer'

// Components FOR Dev Module

export default function Mockup({ questionData , questionIndex }) {
  
  const [globolAnswer, setGlobolAnswer] = useRecoilState(stateAnswer)


  const [answers, setAnswers] = useState(['']);
  const [point, setPoint] = useState(['']);
  useEffect(() => {
    setAnswers(questionData.answer)
    setPoint(questionData.point)
  }, [questionData]);

  // ดึงค่าคำตอบ User
  const [dataSelectAnswer, setDataSelectAnswer] = useState(Array(questionData.answer.length).fill(false)); // ค่าเริ่มต้น ให้มีจำนวน arr เท่ากับ questionData.answer และค่าเริ่มต้น false
  const [userPoint, setUserPoint] = useState(Array(questionData.answer.length).fill(0)); // ค่าเริ่มต้น ให้มีจำนวน arr เท่ากับ questionData.answer และค่าเริ่มต้น 0
  const handleSelectAnswer = (event, index) => {
    const updateValues = [...dataSelectAnswer];
    const updateAnsPoint = [...userPoint];

    updateValues[event.target.value] = true;
    if (event.target.checked) {
      updateValues[event.target.value] = true;
      
      const ansPoint = event.target.getAttribute('data-point');
      updateAnsPoint[event.target.value] = Number(ansPoint)

    } else {
      updateValues[event.target.value] = false

      const ansPoint = event.target.getAttribute('data-point');
      updateAnsPoint[event.target.value] = 0

    }
    setUserPoint(updateAnsPoint)
    setDataSelectAnswer(updateValues);    
  };

  useEffect(() => {
    const newGlobolAnswer = [...globolAnswer]
    newGlobolAnswer[questionIndex] = userPoint
    setGlobolAnswer(newGlobolAnswer)
  }, [userPoint]);

  return (
    
      <main className="">
        <header className='px-3 mb-3'>
          <h1 className='text-4xl font-bold mb-4'>Campaign name</h1>
          <p className='text-lg'>{questionData.title} <small>({questionData.point})</small></p>
        </header>
        <section className='p-3'>
          {questionData.embed &&
            <div className='render-embed' dangerouslySetInnerHTML={{ __html: questionData.embed }} />
          }          
        </section>
        <section className='p-3'>
            
            {answers.map((item, index) => (
              
              <div key={index} className="answer-box">            
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`Answer_${index}`} // Dynamically set the id using index
                  value={index}
                  data-point={point[index]}
                  onChange={(event) => handleSelectAnswer(event, index)} 
                />  
                <label 
                  className="form-check-label" 
                  htmlFor={`Answer_${index}`} // Dynamically set the htmlFor using index
                >
                  <div className='flex flex-wrap'>
                    <div className='basis-full'>
                      <span className='ms-2'>{item}</span>
                    </div>
                  </div>
                </label>
              </div>
              
            ))}
          </section>
      </main>
      
    
  )
}
