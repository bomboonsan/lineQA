import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Tooltip , Radio } from "@nextui-org/react";

import QuestionImage from './QuestionImage';
import QuestionText from './QuestionText';
import QuestionEmbed from './QuestionEmbed';

export default function QuestionSelectType( props ) {

  const [currentQuestion, setCurrentQuestion] = useState(props.countQuestion);
  const [selectedOption, setSelectedOption] = useState('');  

  return (
      <>
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
            <QuestionText countQuestion={currentQuestion} />
          }
          {selectedOption =='image' &&
            <QuestionImage countQuestion={currentQuestion} />
          }
          {selectedOption =='embed' &&
            <QuestionEmbed countQuestion={currentQuestion} />
          }
        </div>


      </>
  )
}
