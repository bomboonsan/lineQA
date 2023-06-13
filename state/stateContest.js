import { atom } from 'recoil';
const stateContest = atom({
    key: 'stateContest',
    default: {
        campaign: '',
        description: '',
        title: '',
        thumbnail: '',
        expiration: '',
    }
})
export {stateContest}