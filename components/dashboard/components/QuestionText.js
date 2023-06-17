import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Tooltip } from "@nextui-org/react";

export default function QuestionText() {
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [inputTitle, setInputTitle] = useState('');
  const [answerCorrect, setAnswerCorrect] = useState([false, false, false]);
  const [pointQ, setPointQ] = useState('');

  const handleAddIndex = () => {
    setInputValues([...inputValues, '']);
    setAnswerCorrect([...answerCorrect, false]);
  };
  const handleRemoveIndex = () => {
    // setInputValues(inputValues.filter((item) => item !== index));
    setInputValues(inputValues.slice(0, -1));
    setAnswerCorrect(answerCorrect.slice(0, -1));
  };

  const handleTitleChange = (event) => {
    const newTitleChange = event.target.value;
    setInputTitle(newTitleChange);
  };

  const handlePointChange = (event) => {
    const newPointChange = event.target.value;
    setPointQ(newPointChange);
  };

  const handleSwitchChange = (event, index) => {
    console.log('Checkbox value:'+event.target.value)
    const newAnswerCorrect = [...answerCorrect];
    newAnswerCorrect[event.target.value] = true;

    if (event.target.checked) {
      newAnswerCorrect[event.target.value] = true
    } else {
      newAnswerCorrect[event.target.value] = false
    }
    setAnswerCorrect(newAnswerCorrect);    
  };
  
  console.log(answerCorrect)
  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with values:', inputValues);
    let isOk = false;
    let alertErrorText = '';
    if (inputTitle == '') {
      alertErrorText = 'กรุณาระบบุคำตอบด้วยครับ'
    } else if(inputValues.includes("")) {
      alertErrorText = 'กรุณาระบุตัวเลือกคำตอบให้ครบด้วยครับ'
    } else if(answerCorrect =='') {
      alertErrorText = 'กรุณาเลือกคำตอบด้วยครับ'
    } else if(pointQ =='') {
      alertErrorText = 'กรุณาระบุจำนวนคะแนนของข้อนี้ด้วยครับ'
    } else {
      isOk = true;
    }


    if (!isOk) {
      alert(alertErrorText)
    } else {

      try {
        const bodyJson = {
          "title": inputTitle,
          "type": "text",
          "point": pointQ,
          "correct": answerCorrect,
          "answer": inputValues
        };
        console.log('bodyJson')
        console.log(bodyJson)
        const response = await fetch('https://api.bomboonsan.com/question/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },        
          // body: JSON.stringify({ value: inputValue }),
          body: JSON.stringify(bodyJson),
        });

        if (response.ok) {
          // Success, handle the response here
          console.log('Request sent successfully!');
          alert('Request sent successfully!');
          window.location.reload();

        } else {
          // Handle the error response here
          console.error('Request failed!');
        }
      } catch (error) {
        // Handle any network errors here
        console.error('Network error:', error);
      }

    }

    
  };


  return (
      <main className="">
        <form onSubmit={handleSubmit}>
          <header className='px-3 mb-3'>
            <Textarea 
              label="คำถาม"
              placeholder="ระบุคำถาม" 
              onChange={(event) => handleTitleChange(event)} 
              css={{
                width: '100%',
              }}
            />
          </header>
          <section>
            <p>

            </p>
          </section>
          <section className='p-3'>
            
            {inputValues.map((value, index) => (
              <div key={index} className='pt-5 mb-5'>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex-initial'>
                    <Tooltip content="คำตอบข้อนี้ถูกหรือไม่">
                      <input 
                        type="checkbox" 
                        value={index}
                        onChange={(event) => handleSwitchChange(event, index)} 
                        className="d"
                      />
                    </Tooltip>
                  </div>
                  <div className='flex-1'>
                    <Input 
                      key={index}
                      clearable 
                      bordered 
                      labelPlaceholder={`คำตอบข้อที่ ${index+1}`}
                      initialValue="" 
                      value={value}
                      onChange={(event) => handleInputChange(event, index)}
                      css={{
                        width: '100%',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className='flex flex-wrap'>
              <div className='basis-full md:basis-1/2 mt-5'>
                <div className='flex flex-wrap gap-3'>
                  <div className='flex-initial'>
                    <Button flat type="button" color="success" auto onClick={() => handleAddIndex()}>
                      เพิ่มจำนวนคำตอบ
                    </Button>
                  </div>
                  <div className='flex-initial'>
                  <Button flat type="button" color="error" auto onClick={() => handleRemoveIndex()}>
                    ลดจำนวนคำตอบ
                  </Button>
                  </div>
                </div>
              </div>
              <div className='basis-full md:basis-1/2 mt-5'>
                <Input 
                  type='number' 
                  placeholder="คะแนนของคำถาม" 
                  // onChange={(event) => setPointQ(event)} 
                  value={pointQ}
                  onChange={(e) => setPointQ(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-5'>
              <Button type="submit" shadow color="primary" size="lg" 
              css={{
                width: '100%',
              }}
              >
                ส่งข้อมูล
              </Button>
            </div>
          </section>
        </form>
      </main>
  )
}
