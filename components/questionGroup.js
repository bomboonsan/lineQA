import { useState, useEffect } from 'react';
import Image from 'next/image'

import { useRecoilState } from 'recoil';
import {stateQuestion} from '../app/state/stateQuestion'
import {stateUser} from '../app/state/stateUser'

// Components
import QuestionText from './questionText'
import QuestionImage from './questionImage'
import QuestionEmbed from './questionEmbed';

export default function QuestionGroup(props) {
    const [dataUser, setDataUser] = useRecoilState(stateUser)
    const [stateDataUser, setStateDataUser] = useState({})
    useEffect(() => {
        const newDataUser = {...dataUser};
        setStateDataUser(newDataUser);
        console.log(newDataUser)
    
    }, [dataUser]);


    const [dataQuestions, setQuestions] = useRecoilState(stateQuestion)
    const [listQuestions, setListQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);    
    const fetchData = async () => {
        try {
            const response = await fetch(`http://192.168.1.99:5000/question/random/full/4`);
            const jsonData = await response.json();
            setListQuestions(jsonData);
            setQuestions(jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
    };  
    // console.log(listQuestions);
    

    return (
        <>
            {listQuestions.map((item, index) => (
                <div key={index}>
                    {stateDataUser.countQuestion-1 == index && item.type == 'text' &&
                        <QuestionText />
                    }
                    {stateDataUser.countQuestion-1 == index && item.type == 'image' &&
                        <QuestionImage />
                    }
                    {stateDataUser.countQuestion-1 == index && item.type == 'embed' &&
                        <QuestionEmbed />
                    }
                </div>            
            ))}
        </>
    )
}