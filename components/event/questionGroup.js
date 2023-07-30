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

    const [isFinish, setIsFinish] = useState(false);

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

    useEffect(() => {
        if (isFinish) {
            authLine()
        }
    }, [isFinish]);


    const handleNext = () => {
        if (countStep < questionList.length-1) {
            if ( checkNoSelect() ) {
                setCountStep(countStep+1)

                // รวมคำตอบ
                const currentTotalPoint =  sumArray(globolAnswer[countStep])
                const newGlobolUser = {...globolUser}
                const newPoint = Number(newGlobolUser.point) + Number(currentTotalPoint);
                newGlobolUser.point = newPoint;
                setGlobolUser(newGlobolUser)
                
            }
        } else {
            if ( checkNoSelect() ) {
                // authLine()
                // // FINISH
                // รวมคำตอบ
                const currentTotalPoint =  sumArray(globolAnswer[countStep])
                const newGlobolUser = {...globolUser}
                const newPoint = Number(newGlobolUser.point) + Number(currentTotalPoint);
                newGlobolUser.point = newPoint;
                newGlobolUser.onPage = 'result';
                setGlobolUser(newGlobolUser)
                setIsFinish(true)
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
    

    const checkNoSelect = () => {
        if ( sumArray(globolAnswer[countStep]) !== 0 ) {
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

    // รวม คำตอบ
    const sumArray = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
        sum += array[i];
        }
        return sum;
    }


    // SEND DATA API
    const submitNewUser = async () => {
        const bodyJson = {
          "accesstoken" : globolUser.accesstoken,
          "displayName" : globolUser.displayName,
          "pictureUrl" : globolUser.pictureUrl,
          "email" : globolUser.email,
          "eventData" : [{
            "event_id" : pageData._id,
            "campaign" : pageData.campaign,
            "title" : pageData.title,
            "point" : [globolUser.point],
            "date" : new Date().toISOString()
          }],
        }
        try {
          const response = await fetch('https://boschthailandbackend.bomboonsan.com/user/add', {
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
            "event_id" : pageData._id,
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
          const response = await fetch(`https://boschthailandbackend.bomboonsan.com/user/id/${id}`, {
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
          const response = await fetch(`https://boschthailandbackend.bomboonsan.com/user/accesstoken/${token}`);
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
            {questionList && questionList.map((item,index) => (
                <div key={index}>
                    {item.type == 'text' && index == countStep &&
                        <QuestionText pageData={pageData} questionData={item} questionIndex={index} />
                    }
                    {item.type == 'image' && index == countStep &&
                        <QuestionImage pageData={pageData} questionData={item} questionIndex={index}  />
                    }
                    {item.type == 'embed' && index == countStep &&
                        <QuestionEmbed pageData={pageData} questionData={item} questionIndex={index} />
                    }
                </div>
            ))}          
            {countStep == 0 ? (
                <div className='my-4 px-3'>   
                    <button className="btn btn-block btn-primary text-xl text-white rounded-[0]" onClick={handleNext}>
                    Next
                    </button>
              </div>
            ) :
            (
            <div className='my-4 px-3'> 
                <div className='grid grid-cols-2 gap-4'>
                    <button className="btn btn-block btn-primary text-xl text-white rounded-[0]" onClick={handlePrev}>
                    Back
                    </button>
                    <button className="btn btn-block btn-primary text-xl text-white rounded-[0]" onClick={handleNext}>
                    Next
                    </button>
                </div>                
            </div>
            )
            }
        </>
    )
}