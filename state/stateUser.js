import { atom } from 'recoil';
const stateUser = atom({
    key: 'stateUser',
    default: {
        isConsent: false,
        point: 0,
        onPage: 'welcome',
        accesstoken: 'xxxxxxxxxxxxxxxxxxxx',
        displayName: 'bom',
        pictureUrl: null,
        email: 'bom@bomb.com',
    }
})
export {stateUser}

// accesstoken: { type: String, default: null },
// displayName: { type: String, default: null },
// pictureUrl: { type: String, default: null },
// eventData: { type: [], default: null },