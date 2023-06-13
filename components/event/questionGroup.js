import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../../state/stateUser'
import {stateAnswer} from '../../state/stateAnswer'

// Components
import QuestionText from './questionText'
import QuestionImage from './questionImage'
import QuestionEmbed from './questionEmbed';

// sweetalert2
import Swal from 'sweetalert2'

export default function QuestionGroup( {pageData} ) {

    const [globolUser, setGlobolUser] = useRecoilState(stateUser)
    const [globolAnswer, setGlobolAnswer] = useRecoilState(stateAnswer)
    

    const [countStep, setCountStep] = useState(0);

    const [questionList, setQuestionList] = useState(['']);
    useEffect(() => {
        setQuestionList(pageData.questions)
        if (pageData.questions) {
            setGlobolAnswer(Array(pageData.questions.length).fill(['']))
        }

        const newStateUser = {...globolUser};
        newStateUser.isConsent = true;
        newStateUser.onPage = 'questionGruop';
        setGlobolUser(newStateUser)


    }, [pageData]);


    const handleNext = () => {
        if (countStep < questionList.length-1) {
            if ( checkNoSelect() ) {
                setCountStep(countStep+1)
                checkAnswer()
            }
        } else {
            authLine()
            // FINISH
            if (areArraysDuplicates (questionList[countStep].correct,globolAnswer[countStep])) {
                // alert('ถูก')
                const newGlobolUser = {...globolUser}
                const newPoint = Number(newGlobolUser.point) + Number(questionList[countStep].point);
                newGlobolUser.point = newPoint;
                // TO RESULT PAGE
                newGlobolUser.onPage = 'result';
                setGlobolUser(newGlobolUser)
            } else {
                // alert('ผิด')      
                // TO RESULT PAGE
                const newStateUser = {...globolUser};
                newStateUser.onPage = 'result';
                setGlobolUser(newStateUser)      
            }
            
        }
        
    }
    const handlePrev = () => {
        if (countStep > 0) {
            setCountStep(countStep-1)

            const newGlobolUser = {...globolUser}
            if (newGlobolUser.point > 0 ) {
                const newPoint = Number(newGlobolUser.point) - Number(questionList[countStep-1].point);
                newGlobolUser.point = newPoint;
                setGlobolUser(newGlobolUser)
            }
            
        }   
    }
    const getCorrect = () => {
        const correct = questionList[countStep].correct;
        
    }
    const checkAnswer = () => {

        // console.log(questionList[countStep].correct)
        // console.log(globolAnswer[countStep])

        if (areArraysDuplicates (questionList[countStep].correct,globolAnswer[countStep])) {
            // alert('ถูก')
            const newGlobolUser = {...globolUser}
            const newPoint = Number(newGlobolUser.point) + Number(questionList[countStep].point);
            newGlobolUser.point = newPoint;
            setGlobolUser(newGlobolUser)
        } else {
            // alert('ผิด')            
        }
    }

    const checkNoSelect = () => {
        if ( globolAnswer[countStep].includes(true) ) {
            // มีการเลือกคำตอบแล้ว
            return true
        } else {
            Swal.fire({
                icon: 'info',
                title: 'กรุณาเลือกคำตอบ',
            })
            return false
        }
    }

    // FN ตรวจสอบการเหมือนกันของ Arr ใช้สำหรับตรวจคำตอบ
    function areArraysDuplicates(original, newArr) {
        // // Sort the arrays
        // const sortedOriginal = original.slice().sort();
        // const sortedNewArr = newArr.slice().sort();
    
        // // Compare the sorted arrays
        // // return เป็น true/false
        // return JSON.stringify(sortedOriginal) === JSON.stringify(sortedNewArr);
        return JSON.stringify(original) === JSON.stringify(newArr);
    }


    // SEND DATA API
    const submitNewUser = async () => {
        const bodyJson = {
          "accesstoken" : globolUser.accesstoken,
          "displayName" : globolUser.displayName,
          "pictureUrl" : globolUser.pictureUrl,
          "email" : globolUser.email,
          "eventData" : [{
            "campaign" : pageData.campaign,
            "title" : pageData.title,
            "point" : [globolUser.point],
            "date" : new Date().toISOString()
          }],
        }
        try {
          const response = await fetch('https://api.bomboonsan.com/user/add', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },        
              body: JSON.stringify(bodyJson),
          });
    
          if (response.ok) {
              // Success, handle the response here
              console.log('Request sent successfully!');
          } else {
              // Handle the error response here
              console.error('Request failed!');
          }
          } catch (error) {
              console.error('Network error:', error);
          }
      }
    
    
      const submitUser = async (id , eventOldData) => {
    
        const newEventData = {
          "campaign" : pageData.campaign,
          "title" : pageData.title,
          "point" : [globolUser.point],
          "date" : new Date().toISOString()
        }
    
        let listEventData = [...eventOldData ,newEventData]
        console.log("listEventData")
        console.log(listEventData)
    
        const bodyJson = {
          "displayName" : globolUser.displayName,
          "pictureUrl" : globolUser.pictureUrl,
          "email" : globolUser.email,
          "eventData" : listEventData,
        }
        try {
          const response = await fetch(`https://api.bomboonsan.com/user/id/${id}`, {
              method: 'PUT',
              headers: {
              'Content-Type': 'application/json',
              },        
              body: JSON.stringify(bodyJson),
          });
    
          if (response.ok) {
            console.log('Request sent successfully!');
          } else {
              console.error('Request failed!');
          }
          } catch (error) {
              console.error('Network error:', error);
          }
      }
    
      const checkToken = async (token) => {
        try {
          const response = await fetch(`https://api.bomboonsan.com/user/accesstoken/${token}`);
          const jsonData = await response.json();
          return jsonData;
        } catch (error) {
          console.error('Error:', error);
          return {}
        }
      }
    
    
      const authLine = async () => {
        let userData = await checkToken(globolUser.accesstoken)    
        if(userData.accesstoken) {
          // logged-id
          submitUser( userData._id , userData.eventData )
        } else {
          // new User
          submitNewUser()
        }
      }

    return (
        <>
            <div>
                คะแนนปัจจุบัน {globolUser && globolUser.point}
            </div>
            {questionList && questionList.map((item,index) => (
                <div key={index}>
                    {item.type == 'text' && index == countStep &&
                        <QuestionText questionData={item} questionIndex={index} />
                    }
                    {item.type == 'image' && index == countStep &&
                        <QuestionImage questionData={item} questionIndex={index}  />
                    }
                    {item.type == 'embed' && index == countStep &&
                        <QuestionEmbed questionData={item} questionIndex={index} />
                    }
                </div>
            ))}          
            {countStep == 0 ? (
                <div className='my-4 px-3'>   
                    <button className="btn btn-block btn-primary text-xl text-white" onClick={handleNext}>
                    ถัดไป
                    </button>
              </div>
            ) :
            (
            <div className='my-4 px-3'> 
                <div className='grid grid-cols-2 gap-4'>
                    <button className="btn btn-block btn-primary text-xl text-white" onClick={handlePrev}>
                        ย้อนกลับ
                    </button>
                    <button className="btn btn-block btn-primary text-xl text-white" onClick={handleNext}>
                        ถัดไป
                    </button>
                </div>                
            </div>
            )
            }
        </>
    )
}