import { useState, useEffect } from 'react';
import Image from 'next/image'

import { RecoilRoot } from 'recoil';

import Content from './Content'

export default function ContainerPage( { pageData } ) {
    
    return (
        <>
            <RecoilRoot>
                <Content pageData={pageData} />
            </RecoilRoot>
        </>
    )
}