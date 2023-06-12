import Layout from '../../template/layout';
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react';

import { Container , Input , Button , Tooltip , Link , Badge } from "@nextui-org/react";

export default function Dashboard() {
  const router = useRouter()
  const { id } = router.query;
  const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");
  const [data, setData] = useState({});
  const [answerArr, setAnswerArr] = useState([]);
  const [answerCorrect, setAnswerCorrect] = useState([]);
  const [statusAlert, setStatusAlert] = useState({
    status: "normal",
    msg: ""
  });


  useEffect(() => {
    if (id !== undefined ) {
      fetchData();
    }
  }, [id]);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.bomboonsan.com/question/id/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
      setAnswerArr(jsonData.answer)
      setAnswerCorrect([...jsonData.correct])      

      // สร้าง Array ตามจำนวนรูปภาพของคำตอบ (jsonData.answerImg.length) โดยกำหนดค่าเริ่มต้นเป็น ''
      const newAray = Array.apply(null, Array(jsonData.answerImg.length)).map(function () {return ''});
      setListImages(newAray)
      console.log('newAray')
      console.log(newAray)
      
      // console.log(jsonData)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(data)


  // TITLE
  const titleChange = (event) => {
    const newTitle = event.target.value;
    // SET NEW DATA FOR UPDATE
    const newData = {...data}
    newData.title = newTitle
    setData(newData)
  }

  // check box
  const handleSwitchChange = (event, index) => {
    const newAnswerCorrect = [...answerCorrect];
    newAnswerCorrect[event.target.value] = true;
    if (event.target.checked) {
      newAnswerCorrect[event.target.value] = true
    } else {
      newAnswerCorrect[event.target.value] = false
    }
    setAnswerCorrect(newAnswerCorrect);
    
    // SET NEW DATA FOR UPDATE
    const newData = {...data}
    newData.correct = newAnswerCorrect
    setData(newData)
  };

  // inputAnswer
  const handleInputChange = (event, index) => {
    const newData = {...data};
    newData.answer[index] = event.target.value;
    setData(newData);
  };

  // changeThumbnail
  const [selectedImagesThumbnail, setSelectedImagesThumbnail] = useState([]);   
  const [thumbnailReader, setThumbnailReader] = useState(null); 
  const handleImageChangeThumbnail = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImagesThumbnail(files); 
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailReader(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //UPLOAD Thumbnail
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
      if (response.ok) {
        const data = await response.json();
        // setInputQuestionImage(data[0].path) // ส่งข้อมูล path ของไฟล์ไปเก็บไว้
        return data;
      } else {
        console.error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error occurred during image upload:', error);
    }
  };
  const removeThumbnail = () => {
    const newData = {...data}
    newData.questionImage = null
    setData(newData)
    setThumbnailReader(null)
  }

  // changeAnswersImages  
  const [selectedImages, setSelectedImages] = useState([]);
  const [listImages, setListImages] = useState([]);
  const handleImageChange = (event,index) => {
    const files = Array.from(event.target.files);
    console.log(files);
    setSelectedImages([...selectedImages, ...files]);
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
  // UPLOAD ANSWER IMAGE
  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
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




  const closeAlert = () => {
    setStatusAlert({
      status: "normal",
      msg: ""
    })
  }
  // FN UPDATE
  const handleUpdate = async () => {    


    try {
        if (data.type =='image' && thumbnailReader !== null) {

          const dataQuestionImage = await handleUploadThumbnail();
          const dataQuestionList = []
          dataQuestionImage.forEach((data, index) => {
            dataQuestionList.push(data.path);
          });
          console.log(dataQuestionList[0])
          data.questionImage = dataQuestionList[0]

        }

        const dataAnwserImages = await handleUpload();
        let dataAnwserImagesList = []
        dataAnwserImages.forEach((data, index) => {
          dataAnwserImagesList.push(data.path);
        });

        data.answerImg = data.answerImg.map((value, index) => {
          return dataAnwserImagesList[index] || value;
        });

        console.log('data.answerImg')
        console.log(data.answerImg)


        let updateJson = {...data,}
        const response = await fetch(`https://api.bomboonsan.com/question/id/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },        
          // body: JSON.stringify({ value: inputValue }),
          body: JSON.stringify(data),
        });

        setStatusAlert({
          status: "success",
          msg: "แก้ไขสำเร็จ"
        })
        

    } catch (error) {
      console.error('Error:', error);
    } finally {
      console.log('UPDATE COMPETE !')
    }
  }



  return (
    <Layout>
      <main className="">
          <header className='px-3 mb-3'>
            {statusAlert.status !== "normal" &&
            <div className='mb-4'>
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{statusAlert.msg}</span>
                <div>
                  <button className="btn btn-sm btn-circle" onClick={closeAlert}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            </div>
            }

            <Link color href="/dashboard/question/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              คำถามทั้งหมด
            </Link>
            <p className='font-bold text-xl'>แก้ไขคำถาม</p>
          </header>
          <section className='p-3'>
            {data && (
            <div id='getData'>
              <Input
                width="100%" 
                size="xl" 
                clearable
                color="default"
                initialValue={data.title}
                type="text"
                label="คำถาม"
                placeholder="ระบุคำถาม"
                onChange={(event) => (titleChange(event))}
              />
              {data.questionImage !== null &&
              <figure className='my-5 text-center'>
                 <Badge className="cursor-pointer" color="error" content={'ลบรูป'} shape="rectangle" onClick={removeThumbnail}>
                  <Image
                    className='w-auto block mx-auto shadow-lg hover:shadow-xl'
                    src={prefixUrl+data.questionImage}
                    alt="Mockup"
                    width={800}
                    height={800}
                  />
                 </Badge>
                
              </figure>
              }
              {data.questionImage == null && thumbnailReader !== null && <img className="w-auto mx-auto h-auto rounded-3 mt-3" src={thumbnailReader} alt="Selected Image" />}
              {data.questionImage == null && data.type == 'image' &&
              <form className="flex items-center space-x-6 mt-3">
                <label className="block">
                  <span className="sr-only">Choose File</span>
                  <input 
                    onChange={handleImageChangeThumbnail}
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>
              </form>       
              }
              {/* ANSWER */}
              {answerArr.map((value, index) => (                
                <div key={index} className='pt-5 mb-3'>                  
                  <div className='flex flex-wrap items-center gap-4'>
                    <div className='flex-initial'>
                      <Tooltip content="คำตอบข้อนี้ถูกหรือไม่">
                        <input 
                          type="checkbox" 
                          value={index}
                          onChange={(event) => handleSwitchChange(event, index)}                           
                          className="d"
                          checked={answerCorrect[index]}
                        />
                      </Tooltip>
                    </div>
                    <div className='flex-1'>                      
                      <div className='flex flex-wrap'>
                        <div className='flex-1'>
                          <Input 
                            key={index}
                            clearable 
                            bordered 
                            // labelPlaceholder={`คำตอบข้อที่ ${index+1}`}
                            initialValue="" 
                            value={value}
                            onChange={(event) => handleInputChange(event, index)}
                            css={{
                              width: '100%',
                            }}
                          />
                        </div>
                        {data.type == 'image' &&
                        <div className='flex-initail'>
                          {data.answerImg[index] && listImages[index] == '' &&
                          <Image
                            src={prefixUrl+data.answerImg[index]}
                            alt="Mockup"
                            width={300}
                            height={300}
                            title={`รูปประจำคำตอบข้อที่ ${index+1}`}
                          />
                          }
                          {listImages[index] &&
                          <Image
                            src={listImages[index].previewURL}
                            alt="Mockup"
                            width={300}
                            height={300}
                            title={`รูปประจำคำตอบข้อที่ ${index+1}`}
                          />
                          }
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
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
            

            <div className='mt-3'>
              <Button shadow color="primary" auto onClick={handleUpdate}>
                SAVE
              </Button>
            </div>
          </section>
      </main>
    </Layout>
  )
}
