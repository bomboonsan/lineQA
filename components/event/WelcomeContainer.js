import { useState, useEffect } from 'react';
import Image from 'next/image'

import { RecoilRoot } from 'recoil';

import WelcomeContent from './WelcomeContent'

export default function ContainerPage( { pageData } ) {
    
    return (
        <>
            <RecoilRoot>
                <WelcomeContent pageData={pageData} />
            </RecoilRoot>
        </>
    )
}