import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { Button, Textarea , Input , Switch , Checkbox , Tooltip } from "@nextui-org/react";


export default function QuestionImage() {
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [inputTitle, setInputTitle] = useState('');
  const [inputQuestionImage, setInputQuestionImage] = useState('');
  const [answerCorrect, setAnswerCorrect] = useState(['', '', '']);
  const [pointQ, setPointQ] = useState('');

  const [selectedImages, setSelectedImages] = useState([]);


  const [listImages, setListImages] = useState([]);
  const handleImageChange = (event,index) => {
    const files = Array.from(event.target.files);
    console.log(files);
    setSelectedImages([...selectedImages, ...files]);
    // 
    // const file = event.target.files[0];
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...listImages];
        updatedImages[index] = {
          file: file,
          previewURL: reader.result,
        };
        setListImages(updatedImages);
        
      };
      reader.readAsDataURL(file);
      
      console.log(listImages)
    }
  };
  const handleClearImage = (index) => {
    // Preview
    const updatedImages = [...listImages];
    updatedImages[index] = null;
    setListImages(updatedImages);

    // For upload
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages[index] = null;
    setSelectedImages(updatedSelectedImages);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      // formData.append(`image`, image);
      formData.append(`image`, image);
    });

    try {
      const response = await fetch('https://api.bomboonsan.com/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Images uploaded successfully');
        // Handle success case here
        const data = await response.json();
        return data;
      } else {
        console.error('Image upload failed');
        // Handle error case here
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error case here
    }
  };


  const [selectedImagesThumbnail, setSelectedImagesThumbnail] = useState([]);   
  const [thumbnailReader, setThumbnailReader] = useState(null); 



  const handleImageChangeThumbnail = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImagesThumbnail(files); 
    console.log(files)
    console.log(event.target.files[0])


    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailReader(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }; 

  const handleUploadThumbnail = async () => {
    const formData = new FormData();

    selectedImagesThumbnail.forEach((image, index) => {
      formData.append(`image`, image);
    });

    try {
      const response = await fetch('https://api.bomboonsan.com/upload/image', {
        method: 'POST',
        body: formData,
      });
      // console.log(response)
      if (response.ok) {

        const data = await response.json();
        console.log('Uploaded images:', data);
        console.log(data[0].path);
        // setInputQuestionImage(data[0].path) // ส่งข้อมูล path ของไฟล์ไปเก็บไว้
        return data;
        // Handle the response data as needed
        
        return 'upload successful'

      } else {
        // console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error occurred during image upload:', error);
    }
  };

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

  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with values:', inputValues);
    await handleUpload();
    await handleUploadThumbnail();


    if (false) { // บังคับให้ผ่านก่อน
      alert('กรุณาอัพโหลดไฟล์รูปภาพสำหรับคำถามด้วยครับ');
    } else {

      const dataQuestionImage = await handleUploadThumbnail();
      const dataQuestionList = []
      dataQuestionImage.forEach((data, index) => {
        dataQuestionList.push(data.path);
      });


      const dataAnwserImages = await handleUpload();
      const dataAnwserImagesList = []
      dataAnwserImages.forEach((data, index) => {
        dataAnwserImagesList.push(data.path);
      });

      try {
        const bodyJson = {
          "title": inputTitle,
          "type": "image",
          "questionImage": dataQuestionList[0],
          "point": pointQ,
          "correct": "1",
          "answer": inputValues,
          "answerImg": dataAnwserImagesList
        };
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
          // window.location.reload();
  
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
          {thumbnailReader && <img className="w-auto mx-auto h-auto rounded-3 mb-3" src={thumbnailReader} alt="Selected Image" />}
          <form className="flex items-center space-x-6">
            <label className="block">
              <span className="sr-only">Choose File</span>
              <input 
                onChange={handleImageChangeThumbnail}
                type="file"
                // accept="image/png, image/gif, image/jpeg, image/webp"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
          </form>
        </p>
      </section>
      <section className='p-3'>
        <form>
        {inputValues.map((value, index) => (
          <div key={index} className="answer-box">            
            <Tooltip content="คำตอบข้อนี้ถูกหรือไม่">
              <input 
                type="checkbox" 
                value={index}
                onChange={(event) => handleSwitchChange(event, index)} 
                className="d"
              />
            </Tooltip>
            <label className="form-check-label" for="Answer_1">
              <div className='flex flex-wrap'>
                <div className='basis-2/3'>
                  <input
                      className='w-full focus:ring-0 focus:outline-0 focus:border-b focus:border-b-black border-b'
                      placeholder='ระบุคำตอบ'
                      key={index}
                      type="text"
                      value={value}
                      onChange={(event) => handleInputChange(event, index)}
                    />                          
                </div>
                <div className='basis-1/3'>
                  <div className="flex items-center space-x-6">
                    <label className="block">
                      <span className="sr-only">Choose File</span>
                      <input 
                        onChange={(event) => handleImageChange(event, index)}
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </label>                          
                  </div>
                  {listImages[index] && (
                  <div>
                    <Image
                    src={listImages[index].previewURL}
                    alt="Mockup"
                    width={300}
                    height={300}
                    title={`รูปประจำคำตอบข้อที่ ${index+1}`}
                  />
                  <Button flat type="button" color="error" auto onClick={() => {handleClearImage(index)}}>
                    ยกเลิก
                  </Button>
                  </div>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
        </form>
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
  )
}
