"use client";
import { useState, useEffect , useMemo } from 'react';
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

  console.log(currentDataQuestion)


  const [dataSelectAnswer, setDataSelectAnswer] = useState([]);
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
    // newDataUser.countQuestion = newDataUser.countQuestion+1;
    if (newDataUser.countQuestion == newDataUser.maxQuestion) {

      // router(`/result?point=${stateDataUser.point}&name=${stateDataUser.fristname}`)
      window.location.replace(`/result?point=${newDataUser.point}&name=${newDataUser.fristname}`);

    } else {
      newDataUser.countQuestion = newDataUser.countQuestion+1;
      setDataUser(newDataUser);
    }
  }


  // ป้องกันการ reBuild เวลามี event state
  const MyEmbed = () => {
    const htmlCode = useMemo(
      () => currentDataQuestion.embed,      
      []
    );
    console.log('video render')
    return <div dangerouslySetInnerHTML={{ __html: htmlCode }} />;
  };

  // const TestEmbed = useMemo(
  //   () => {
  //     return <div dangerouslySetInnerHTML={{ __html: currentDataQuestion.embed }} />;
  //   }    ,
  //   []
  // );

  console.log('เฉลย : ' + currentDataQuestion.correct)


  return (
    <RecoilRoot>
      <main className="">
        <header className='px-3 mb-3'>
          <h1 className='text-4xl font-bold mb-4'>Campaign name</h1>
          <p className='text-lg'>{currentDataQuestion.title} <small>({currentDataQuestion.point})</small></p>
        </header>
        <section className='p-3'>
          {currentDataQuestion.embed &&
            // <div className='render-embed' dangerouslySetInnerHTML={{ __html: currentDataQuestion.embed }} />
            <MyEmbed />
            // <TestEmbed />
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
