import { useState, useEffect } from 'react';
import Image from 'next/image'

import { RecoilRoot } from 'recoil';

import Content from './Content'

export default function ContainerPage( { pageData , eventID , dataLiff } ) {
    if(!pageData) {
        return false
    }
    return (
        <>
            <RecoilRoot>
                <Content pageData={pageData} eventID={eventID} dataLiff={dataLiff} />
            </RecoilRoot>
        </>
    )
}