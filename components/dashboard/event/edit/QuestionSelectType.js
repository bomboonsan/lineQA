import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Tooltip , Radio } from "@nextui-org/react";

import QuestionImage from './QuestionImage';
import QuestionText from './QuestionText';
import QuestionEmbed from './QuestionEmbed';


import NewQuestionImage from '../add/QuestionImage';
import NewQuestionText from '../add/QuestionText';
import NewQuestionEmbed from '../add/QuestionEmbed';

export default function QuestionSelectType( { contentQuestion , countQuestion , propDataEvent } ) {
  const [currentQuestion, setCurrentQuestion] = useState(countQuestion);
  const [selectedOption, setSelectedOption] = useState('');  
  


  return (
      <>
        {/* <NewQuestion /> */}
        {contentQuestion && contentQuestion.type == 'text' &&
          <QuestionText contentQuestion={contentQuestion} countQuestion={currentQuestion} />
        }
        {contentQuestion && contentQuestion.type == 'image' &&
          <QuestionImage contentQuestion={contentQuestion} countQuestion={currentQuestion} propDataEvent={propDataEvent} />
        }
        {contentQuestion && contentQuestion.type == 'embed' &&
          <QuestionEmbed contentQuestion={contentQuestion} countQuestion={currentQuestion} />
        }
        {contentQuestion && !contentQuestion.type && 
        <>
        ADD NEW
        <Radio.Group 
          orientation="horizontal" 
          label="เลือกประเภทคำถาม" 
          defaultValue="primary" 
          value={selectedOption}
          onChange={setSelectedOption}
        >
          <Radio value="text" color="primary">
            ข้อความ
          </Radio>
          <Radio value="image" color="primary">
            รูปภาพ
          </Radio>
          <Radio value="embed" color="primary">
            วิดีโอฝัง (เลือกคำตอบ)
          </Radio>
        </Radio.Group>

        <div className='mt-5'>
          {selectedOption =='text' &&
            <NewQuestionText countQuestion={currentQuestion} />
          }
          {selectedOption =='image' &&
            <NewQuestionImage countQuestion={currentQuestion} />
          }
          {selectedOption =='embed' &&
            <NewQuestionEmbed countQuestion={currentQuestion} />
          }
        </div>
        </>
        }
      </>
  )
}
