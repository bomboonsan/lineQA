"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { RecoilRoot } from 'recoil';

import { useRecoilState } from 'recoil';
import {stateQuestion} from '../app/state/stateQuestion'
import {stateUser} from '../app/state/stateUser'

// Components FOR Dev Module

export default function Mockup({ Component, pageProps }) {
  // User
  const [dataUser, setDataUser] = useRecoilState(stateUser)
  const [stateDataUser, setStateDataUser] = useState({})
  // Question
  const [dataQuestions, setQuestions] = useRecoilState(stateQuestion)
  const [stateDataQuestions, setStateDataQuestions] = useState([])
  const [currentDataQuestion, setCurrentDataQuestion] = useState({})
  // Answer
  const [answers, setAnswers] = useState([]);
  // Image
  const [answerImages, setAnswerImages] = useState([]);
  const [prefixUrl, setPrefixUrl] = useState("http://192.168.1.99:5000/");


  useEffect(() => {
    // Question
    const newDataQuestions = {...dataQuestions};
    setStateDataQuestions(newDataQuestions);
    // USER
    const newDataUser = {...dataUser};
    setStateDataUser(newDataUser);
    // Current
    setCurrentDataQuestion(newDataQuestions[newDataUser.countQuestion-1])
    setAnswers(newDataQuestions[newDataUser.countQuestion-1].answer)    

    // สร้างค่าเริ่มต้นให้มีจำนวน arr เท่ากับจำนวนคำตอบ และทำให้ค่าเริ่มต้นมีค่าเป็น false
    let defaultSelectAns = [...newDataQuestions[newDataUser.countQuestion-1].correct]
    defaultSelectAns = defaultSelectAns.map(function () {return false});
    setDataSelectAnswer(defaultSelectAns)
  }, [dataUser]);


  useEffect(() => {
    const prefixedImages = {...currentDataQuestion.answerImg};
    setAnswerImages(prefixedImages) // รูปภาพคำตอบ []
  }, [currentDataQuestion]);


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
  console.log(dataSelectAnswer)
  console.log('ตรวจคำตอบ'+currentDataQuestion.correct)
  const handleSubmit = () => {
    if( areArraysDuplicates(dataSelectAnswer,currentDataQuestion.correct) ) {

      // alert('ถูก');
      const newDataUser = {...dataUser};
      newDataUser.point = Number(currentDataQuestion.point)+newDataUser.point;
      // handleNext()
      if (newDataUser.countQuestion == newDataUser.maxQuestion) {
        window.location.replace(`/result?point=${stateDataUser.point}&name=${stateDataUser.fristname}`);  
      } else {
        newDataUser.countQuestion = newDataUser.countQuestion+1;
      }
      setDataUser(newDataUser);

    } else if(dataSelectAnswer == '') {
      alert('กรุณาเลือกคำตอบ')
    } else {

      // alert('ผิด');
      handleNext()

    }
  }
  // FN ตรวจสอบการเหมือนกันของ Arr
  function areArraysDuplicates(original, newArr) {
    // Sort the arrays
    const sortedOriginal = original.slice().sort();
    const sortedNewArr = newArr.slice().sort();
  
    // Compare the sorted arrays
    // return เป็น true/false
    return JSON.stringify(sortedOriginal) === JSON.stringify(sortedNewArr);
  }

  // Next
  const handleNext = () => {
    const newDataUser = {...dataUser};
    if (newDataUser.countQuestion == newDataUser.maxQuestion) {

      // router(`/result?point=${stateDataUser.point}&name=${stateDataUser.fristname}`)

      window.location.replace(`/result?point=${newDataUser.point}&name=${newDataUser.fristname}`);

    } else {
      newDataUser.countQuestion = newDataUser.countQuestion+1;
      setDataUser(newDataUser);
    }
  }

  console.log('เฉลย : ' + currentDataQuestion.correct)


  return (
    <RecoilRoot>
      <main className="">
        <header className='px-3 mb-3'>
          <h1 className='text-4xl font-bold mb-4'>Campaign name</h1>
          <p className='text-lg'>{currentDataQuestion.title} <small>({currentDataQuestion.point})</small></p>
        </header>
        <figure className='mb-5'>
            <Image
                className='w-full'
                src={prefixUrl+currentDataQuestion.questionImage}
                alt="Mockup"
                width={800}
                height={800}
            />
        </figure>
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
            <div className='mt-5'>   
              <button className="btn btn-block btn-primary text-xl text-white" onClick={handleSubmit}>
                ถัดไป
              </button>
            </div> 
          </section>
      </main>
    </RecoilRoot>
    
  )
}
