import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState , useRef } from 'react';

import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";


import { useRecoilState } from 'recoil';
import {stateContest} from '../../../../state/stateContest'

import {SSRProvider} from 'react-aria'

import EventSetup from './EventSetup';


export default function Container({ propDataEvent }) {
  
  return (
    <SSRProvider>
      <main className="mx-auto max-w-2xl">
        <section className='px-3 mb-3 animation-fadeIn relative'>      
          <EventSetup propDataEvent={propDataEvent} />
        </section>
      </main>
      </SSRProvider>
  )
}
