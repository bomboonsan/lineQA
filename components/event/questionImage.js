"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../../state/stateUser'
import {stateAnswer} from '../../state/stateAnswer'

// Components FOR Dev Module

export default function Mockup({ pageData , questionData , questionIndex }) {
  const [prefixUrl, setPrefixUrl] = useState("https://boschthailandbackend.bomboonsan.com/");
  

  const [answerImages, setAnswerImages] = useState([]);
  useEffect(() => {
    const prefixedImages = {...questionData.answerImg};
    setAnswerImages(prefixedImages) // รูปภาพคำตอบ []
  }, [questionData]);

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
          <h1 className='text-xl font-bold mb-4'>{pageData.campaign}</h1>
          <p className='text-lg'>{questionData.title}</p>
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
        <form>
            {answers && answers.map((item, index) => (
              
              <div key={index} className={`answer-box ${dataSelectAnswer[index] ? 'answer-active' : ''}`}>            
                <input 
                  className="form-check-input" 
                  type="radio" 
                  id={`Answer_${index}`} // Dynamically set the id using index
                  value={index}
                  name={questionIndex}
                  data-point={point[index]}
                  onChange={(event) => handleSelectAnswer(event, index)} 
                /> 
                <label 
                  className="form-check-label" 
                  htmlFor={`Answer_${index}`} // Dynamically set the htmlFor using index
                >                 
                  {answerImages[index] && 
                    <>
                    <div className='flex flex-wrap'>
                      <div className='basis-2/3 w-2/3'>
                        <span className='ms-2'>{item}</span>
                      </div>
                      <div className='basis-1/3 w-1/3'>
                        <img
                          src={prefixUrl+answerImages[index]}
                          alt="Mockup"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                    </>
                  }
                  {!answerImages[index] && 
                    <>
                    <div className='flex flex-wrap'>
                      <div className='basis-full'>
                        <span className='ms-2'>{item}</span>
                      </div>
                    </div>
                    </>
                  }
                </label>
              </div> 
              
            ))}
            </form>    
          </section>
      </main>
    
  )
}
