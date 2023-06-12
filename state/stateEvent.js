import { atom } from 'recoil';
const stateEvent = atom({
    key: 'stateEvent',
    default: {
        campaign: '',
        description: '',
        title: '',
        thumbnail: '',
        expiration: '',
        questions: [
            {
                "title": null,
            "embed": null,
            "questionImage": null,
            "type": null,
            "point": null,
            "correct": [],
            "answer": [],
            "answerImg": [],
            "status": {
                "complete" : false,
                "msg" : "กรุณาระบุคำถาม"
                }
            }
        ],
        results: [{
            "pointMin" : null,
            "pointMax" : null,
            "resultText" : '',
            "resultImageUrl" : ''
          }],        
    }
})
export {stateEvent}