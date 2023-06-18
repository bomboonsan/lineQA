import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../../state/stateUser'


// sweetalert2
import Swal from 'sweetalert2'

export default function ContestElement( {pageData} ) {

    const [globolUser, setGlobolUser] = useRecoilState(stateUser)

    // const [countStep, setCountStep] = useState(0);

    // const [questionList, setQuestionList] = useState(['']);
    // useEffect(() => {
    //     setQuestionList(pageData.questions)
    //     if (pageData.questions) {
    //         setGlobolAnswer(Array(pageData.questions.length).fill(['']))
    //     }

    //     const newStateUser = {...globolUser};
    //     // newStateUser.isConsent = true;
    //     // newStateUser.onPage = 'questionGruop';
    //     setGlobolUser(newStateUser)


    // }, [pageData]);

    const eventSubmit = async () => {
        authLine()
    }


    // SEND DATA API
    const submitNewUser = async () => {
        const bodyJson = {
          "accesstoken" : globolUser.accesstoken,
          "displayName" : globolUser.displayName,
          "pictureUrl" : globolUser.pictureUrl,
          "email" : globolUser.email,
          "eventData" : [],
          "contestData" : [{
            "contest_id" : pageData._id,
            "campaign" : pageData.campaign,
            "title" : pageData.title,
            "fileUrl" : urlThumbnail,
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
              Swal.fire({
                icon: 'success',
                title: 'Successfully',
            })
          } else {
              // Handle the error response here
              console.error('Request failed!');
          }
          } catch (error) {
              console.error('Network error:', error);
          }
      }
    
    
      const submitUser = async (id , contestOldData) => {
        console.log(`https://api.bomboonsan.com/user/id/${id}`)
        const newContestData = {
            "contest_id" : pageData._id,
            "campaign" : pageData.campaign,
            "title" : pageData.title,
            "fileUrl" : urlThumbnail,
            "date" : new Date().toISOString()
          }

          if(contestOldData) {
            var listContestData = [...contestOldData ,newContestData]
          } else {
            var listContestData = [newContestData]
          }
          console.log("listContestData")
          console.log(listContestData)
    
        const bodyJson = {
          "displayName" : globolUser.displayName,
          "pictureUrl" : globolUser.pictureUrl,
          "email" : globolUser.email,
          "contestData" : listContestData,
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
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
            })
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
        console.log('globolUser.accesstoken')
          console.log(globolUser.accesstoken)
        let userData = await checkToken(globolUser.accesstoken)    
        console.log('userData')
        console.log(userData)
        if(userData.accesstoken) {
          // logged-id
          submitUser( userData._id , userData.contestData )
        } else {
          // new User
          submitNewUser()
        }
      }

      // Image Thumbnail
        const [previewImage, setPreviewImage] = useState(null);
        const [urlThumbnail, setUrlThumbnail] = useState('');
        const handleFileUpload = async (event) => {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            if (urlThumbnail !== '') {
            await removeImage(urlThumbnail)
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewImage(reader.result);
            };
        
            if (file) {
              reader.readAsDataURL(file);
            }

            try {
            const response = await fetch('https://api.bomboonsan.com/upload/image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            // Set Data
            setUrlThumbnail(data[0].path)

            console.log('URL image:', data[0].path);
            } catch (error) {
            console.error('Error uploading image:', error);
            }
        };

    const removeImage = async (url) => {
        url = url.replace('images/','')
        try {
        const response = await fetch(`https://api.bomboonsan.com/upload/image/delete/${url}`, {
            method: 'DELETE',
        })
        console.log(response)
        } catch (error) {
        console.error('Error image delete:', error);
        }    
    }

    return (
        <>
            <h2 className='my-5 text-center text-4xl font-bold'>
                อัพโหลดไฟล์สำหรับประกวด
            </h2>
            <div className="flex items-center justify-center w-full">
            {!previewImage && (
                  <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input 
                        onChange={handleFileUpload}
                        id="dropzone-file" 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                    />
                </label>
            )}
                {previewImage && (
                  <>
                  <div className='basis-full w-full'>
                  <img src={previewImage} className='w-full h-auto' alt="Selected" />
                  <button className="btn btn-block btn-error text-white text-xl rounded-[0] mt-5" onClick={(e) => setPreviewImage(null)}>
                      ยกเลิก
                  </button>
                  </div>
                  </>
                )}
            </div> 
            <div className='my-5'>
                <button className="btn btn-block btn-primary text-white text-xl rounded-[0]" onClick={eventSubmit}>
                    บันทึก
                </button>
            </div>
        </>
    )
}