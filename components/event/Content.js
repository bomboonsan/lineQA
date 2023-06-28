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
    // console.log(dataUser)    

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

    useEffect(() => {
        fetchDataTems()
    }, []);
    const [dataTerms, setDataTerms] = useState('');
    const fetchDataTems = async () => {
        try {
            const response = await fetch(`https://api.bomboonsan.com/setting/id/648d0250cd1e81175e49605f`);
            const jsonData = await response.json();
            setDataTerms(jsonData.termsConditions);
            // console.log(jsonData)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // START LINE LIFF NEW
    useEffect(() => {
        // // ตรวจสอบว่าเป็น LOCALHOST ?
        // const domain = window.location.origin;
        // if (domain == 'http://localhost:3000') {
            
        // } else {
            
        //     const newStateUser = {...dataUser};
        //     if (newStateUser.displayName == null) {
        //         initializeLiff()
        //     }

        // }

        const newStateUser = {...dataUser};
        if (newStateUser.displayName == null) {
            initializeLiff()
        }

    }, [dataUser])

    const initializeLiff = async() => {
        const liff = (await import('@line/liff')).default
        try {
            await liff.init({ liffId: '1661407578-X6ro31ow', });


            const profile = await liff.getProfile();
            const { displayName, pictureUrl, email , userId  } = profile;

            // console.log(profile)

            const newStateUser = {...dataUser};
            newStateUser.accesstoken = userId
            newStateUser.displayName = displayName
            newStateUser.pictureUrl = pictureUrl
            newStateUser.email = email
            setGlobalUser(newStateUser)

        } catch (error) {
        console.error('liff init error', error.message)
        }
        if (!liff.isLoggedIn()) {
        liff.login();
        }
    }    


    if(!dataUser.displayName) {
        return false
    }

    return (
        <>
            {dataUser.onPage === 'welcome' && dataUser.accesstoken !== null &&
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
                        <div className="label cursor-pointer justify-start gap-3">
                            <input 
                            type="checkbox" 
                            className="checkbox checkbox-primary" 
                            value='' 
                            onChange={(event) => handleCheckbox(event)} 
                            />
                            <span className="label-text font-bold" onClick={()=>window.my_modal_3.showModal()}>Terms and conditions</span> 
                        </div>
                    </div>
                    <button 
                        className="btn btn-block btn-primary text-xl text-white rounded-[0]"
                        onClick={handleStart}
                    >
                        เริ่มเลย
                    </button>
                </div>
                <dialog id="my_modal_3" className="modal">
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Terms and conditions</h3>
                        <div className='py-4 max-h-96 overflow-y-auto' dangerouslySetInnerHTML={{ __html: dataTerms }} />
                    </form>
                </dialog>
            </>
            }

            {dataUser.onPage === 'questionGruop' && <QuestionGroup pageData={pageData} /> }


            {dataUser.onPage === 'result' && <Result pageData={pageData} /> }
        </>
    )
}