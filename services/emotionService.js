//import api from './endpoint';
import moment from 'moment';
//import axios from 'axios';
import { authRequest } from './connectServer';


const listWithJavaScriptDate = (list) => {
    return list.map(element => {
        return {
            ...element,
            created_at: new Date(element.created_at)
        }
    })
}

const getEmotionWithValidFormat = (object) => {
    console.log(moment(object.created_at).format());
    return {
        ...object,
        created_at: moment(object.created_at).format()

    }
}
// 
const fetchEmotionListRequest = (api) => {
    return api.get('emotions/').then(response => {
        console.table(listWithJavaScriptDate(response.data))
        return listWithJavaScriptDate(response.data)

    })
};

const getEmotionWithTimeRangeRequest = (api, { start, end }) => {
    console.log(start)
    console.log(end)
    //console.log(moment(end));
    const start_str = moment(start).format();
    const end_str = moment(end).format()
    return api.get(`emotions/timerange/${start_str}/${end_str}`).then(response => {
        return listWithJavaScriptDate(response.data);
    }).catch(e => {
        console.log(e);
        return []
    })


};
// newEmotion should be an object
const createEmotionRequest = (api, newEmotion) => {
    return api.post('emotions/', getEmotionWithValidFormat(newEmotion))
        .then(response => {
            //console.log(typeof response.data.created_at);
            console.log(new Date(response.data.created_at));
            return {
                ...response.data,
                created_at: new Date(response.data.created_at)
            }
        })
};

const updateEmotionRequest = (api, emotion) => {
    return api.put(`emotions/${emotion.id}`, getEmotionWithValidFormat(emotion)).then(response => {
        //console.log(response)
        return {
            ...response.data,
            created_at: new Date(response.date.created_at)
        }
    });
}

const fetchEmotionList = () => {
    return authRequest(fetchEmotionListRequest);
};
const getEmotionWithTimeRange = (timeRange) => {
    return authRequest(getEmotionWithTimeRangeRequest, timeRange);
};
const createEmotion = (emotion) => {
    return authRequest(createEmotionRequest, emotion)
};
const updateEmotion = (emotion) => {
    return authRequest(updateEmotionRequest, emotion);
};
export {
    fetchEmotionList,
    getEmotionWithTimeRange,
    createEmotion,
    updateEmotion
}