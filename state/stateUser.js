import { atom } from 'recoil';
const stateUser = atom({
    key: 'stateUser',
    default: {
        isConsent: false,
        point: 0,
        onPage: 'welcome',
        accesstoken: 'Ue003cf1394a776ed6898a14ed554a3ab',
        displayName: 'Bomboonsan',
        pictureUrl: 'https://profile.line-scdn.net/0hCiDc2a40HEZpGgvPo71iORlKHyxKa0VUTHpUKQlIEnBTeQkRECwGI1UTECFVeFtEEX9acFodEHFlCWsgd0zgcm4qQnFTKl4RQ3hVqQ',
        email: null,
    }
})
export {stateUser}

// accesstoken: { type: String, default: null },
// displayName: { type: String, default: null },
// pictureUrl: { type: String, default: null },
// eventData: { type: [], default: null },