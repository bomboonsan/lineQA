import Layout from '../../template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";

import QuestionText from './QuestionText';
import EventSetup from './EventSetup';
import Container from './Container';

import { RecoilRoot } from 'recoil';

export default function EventAdd({ Component, pageProps }) {
  
  return (
    <Layout>      
      <RecoilRoot>
        <Container />
      </RecoilRoot>
    </Layout>
  )
}
