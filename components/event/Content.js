import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../../state/stateUser'

// Components
import QuestionGroup from './questionGroup'
import Result from './result'

// sweetalert2
import Swal from 'sweetalert2'


export default function Content( {pageData} ) {
    // Recoil
    const [globalUser, setGlobalUser] = useRecoilState(stateUser)
    useEffect(() => {
        setDataUser(globalUser)
    }, [globalUser]);
    // useState
    const [dataUser, setDataUser] = useState({});

    const [prefixUrl, setPrefixUrl] = useState("https://api.bomboonsan.com/");
    console.log(dataUser)


    const handleCheckbox = (event) => {
        const newStateUser = {...dataUser};
        if (event.target.checked) {
            newStateUser.isConsent = true;
            setDataUser(newStateUser)
        } else {
            newStateUser.isConsent = false;
            setDataUser(newStateUser)
        }
    }
    const handleStart = () => {
        const newStateUser = {...dataUser};
        if (dataUser.isConsent) {
            newStateUser.onPage = 'questionGruop';
            setDataUser(newStateUser)
        } else {
            Swal.fire({
                icon: 'info',
                title: 'กรุณายอมรับข้อตกลงก่อนเล่น',
            })
        }
    }

    // START LINE LIFF DATA
    // useEffect(() => {
    //     async function initializeLiff() {
    //       try {
    //         await liff.init({ liffId: 'YOUR_LIFF_ID' }); // Replace with your LIFF ID
    //         if (!liff.isLoggedIn()) {
    //           liff.login();
    //         } else {
    //           const profile = await liff.getProfile();
    //           const { displayName, pictureUrl, email } = profile;
    //           console.log('User Name:', displayName);
    //           console.log('Picture URL:', pictureUrl);
    //           console.log('Email:', email);
    //         }
    //       } catch (error) {
    //         console.error('LIFF initialization failed', error);
    //       }
    //     }    
    //     initializeLiff();
    // }, []);

    // START LINE LIFF NEW
    useEffect(async () => {
        const newStateUser = {...dataUser};


        const liff = (await import('@line/liff')).default
        try {
            await liff.init({ liffId: '1661407578-X6ro31ow', });


            const profile = await liff.getProfile();
            const { displayName, pictureUrl, email } = profile;

            console.log('profile')
            console.log(profile)

            newStateUser.displayName = displayName
            newStateUser.pictureUrl = pictureUrl
            newStateUser.email = email
            setDataUser(newStateUser)

        } catch (error) {
        console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
        liff.login();
        }
    }, [])

    return (
        <>
            {dataUser.onPage === 'welcome' &&
            <>
                <div className='p-4'>
                    <h1 className='text-xl font-bold'>
                        {pageData.campaign}
                    </h1>
                    <h2 className='text-lg'>
                        {pageData.description}
                    </h2>
                    <h3>
                        {pageData.title}
                    </h3>
                </div>
                <div>
                <img 
                className='w-full h-auto'
                width={700} 
                height={700} 
                src={prefixUrl+pageData.thumbnail}
                alt='eventThumbnail'
                />
                </div>
                <div className='p-4'>
                    <div className="form-control mb-3">
                        <label className="label cursor-pointer justify-start gap-3">
                            <input 
                            type="checkbox" 
                            className="checkbox checkbox-primary" 
                            value='' 
                            onChange={(event) => handleCheckbox(event)} 
                            />
                            <span className="label-text font-bold">Terms and conditions xxxxxxxx</span> 
                        </label>
                    </div>
                    <button 
                        className="btn btn-block btn-primary text-xl text-white"
                        onClick={handleStart}
                    >
                        เริ่มเลย
                    </button>
                </div>
            </>
            }

            {dataUser.onPage === 'questionGruop' && <QuestionGroup pageData={pageData} /> }


            {dataUser.onPage === 'result' && <Result pageData={pageData} /> }
        </>
    )
}