import { atom } from 'recoil';
const stateAnswer = atom({
    key: 'stateAnswer',
    default: {
        answer: [''],
    }
})
export {stateAnswer}