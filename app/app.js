"use client";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {stateUser} from '../app/state/stateUser'

// Components
import Welcome from '../components/welcome'
import QuestionGroup from '../components/questionGroup'

export default function App(props) {
  const [dataUser, setDataUser] = useRecoilState(stateUser)
  const [stateDataUser, setStateDataUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newDataUser = {...dataUser};
    setStateDataUser(newDataUser);
    console.log(newDataUser)
    
  }, [dataUser]);


  return (
    <>
        {loading &&
        <></>
        }
        {stateDataUser.onPage == 'welcome' && <Welcome />}
        {stateDataUser.onPage == 'questionGruop' && <QuestionGroup />}
    </>
  )
}
