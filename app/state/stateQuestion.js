import { atom } from 'recoil';
const stateQuestion = atom({
    key: 'stateQuestion',
    default: {
        listQuestion: []

    }
})
export {stateQuestion}