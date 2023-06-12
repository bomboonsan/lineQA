import Layout from '../../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button , Modal , Text , Input , Textarea , Table , Tooltip , Row, Col , Checkbox } from "@nextui-org/react";

import QuestionText from '../../../../components/dashboard/event/add/QuestionText';
import EventSetup from '../../../../components/dashboard/event/add/EventSetup';
import Container from '../../../../components/dashboard/event/add/Container';

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
