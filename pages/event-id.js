"use client";
// import Layout from '../../app/layout';
import '../app/globals.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react';

import { Container , Input , Button , Tooltip , Link , Badge } from "@nextui-org/react";

import { RecoilRoot } from 'recoil';

import ContainerPage from '../components/event/Container'


export default function EventId() {
  const router = useRouter()
  const id = router.query.id;

  // START LINE LIFF NEW
  useEffect(async () => {
      const newStateUser = {...dataUser};
      
      const liff = (await import('@line/liff')).default
      try {
          await liff.init({ liffId: '1661407578-X6ro31ow', });


          const profile = await liff.getProfile();
          const { displayName, pictureUrl, email , userId  } = profile;

          newStateUser.accesstoken = userId
          newStateUser.displayName = displayName
          newStateUser.pictureUrl = pictureUrl
          newStateUser.email = email
          setDataUser(newStateUser)

          // Redirect
          if (id !== undefined && userId ) {
            router.push(`/event/${id}`)
          }

      } catch (error) {
      console.error('liff init error', error.message)
      }
      if (!liff.isLoggedIn()) {
      liff.login();
      }

  }, [])


  return (
    <>

    </>
  )
}
