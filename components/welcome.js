import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateUser} from '../app/state/stateUser'

export default function Welcome(props) {
    const [dataUser, setDataUser] = useRecoilState(stateUser);
    const [stateDataUser, setStateDataUser] = useState({})
    useEffect(() => {
        const newDataUser = {...dataUser};
        setStateDataUser(newDataUser);
        console.log(newDataUser)    
    }, [dataUser]);

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
        }
    }

    return (
        <>
            <div className='p-4'>
                <h1 className='text-xl font-bold'>
                    Campaign name
                </h1>
                <h2 className='text-lg'>
                    shory description
                </h2>
                <h3>
                    Title (optional)
                </h3>
            </div>
            <div>
            <Image 
              className='w-full h-auto'
              width={700} 
              height={700} 
              src='/images/eventThumbnail.png'
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
    )
}