import Layout from '../../../../components/dashboard/template/layout';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { Button , Modal , Text , Table , Tooltip , Row, Col } from "@nextui-org/react";

import Container from '../../../../components/dashboard/contest/add/Container';

import { RecoilRoot } from 'recoil';

export default function Dashboard() {


  return (
    <Layout>      
      <RecoilRoot>
        <Container />
      </RecoilRoot>
    </Layout>
  )
}
