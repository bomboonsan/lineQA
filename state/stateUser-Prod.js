import { atom } from 'recoil';
const stateUser = atom({
    key: 'stateUser',
    default: {
        isConsent: false,
        point: 0,
        onPage: 'welcome',
        accesstoken: null,
        displayName: null,
        pictureUrl: null,
        email: null,
    }
})
export {stateUser}

// accesstoken: { type: String, default: null },
// displayName: { type: String, default: null },
// pictureUrl: { type: String, default: null },
// eventData: { type: [], default: null },