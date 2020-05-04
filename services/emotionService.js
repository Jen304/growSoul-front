import api from './endpoint';
import moment from 'moment';
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

const fetchEmotionList = () => {
    return api.get('emotions/').then(response => {
        console.table(listWithJavaScriptDate(response.data))
        return listWithJavaScriptDate(response.data)

    })
};

const getEmotionWithTimeRange = ({ start, end }) => {
    console.log(start)
    console.log(end)
    console.log(moment(end));
    const start_str = moment(start).format();
    const end_str = moment(end).format()
    return api.get(`emotions/range/${start_str}/${end_str}`).then(response => {
        return listWithJavaScriptDate(response.data);
    }).catch(e => {
        console.log(e);
        return []
    })


};
// newEmotion should be an object
const createEmotion = (newEmotion) => {
    return api.post('emotions/', getEmotionWithValidFormat(newEmotion))
        .then(response => {
            console.log(typeof response.data.created_at);
            console.log(new Date(response.created_at));
            return {
                ...response.data,
                created_at: new Date(response.data.created_at)
            }
        })
};

const updateEmotion = (emotion) => {
    return api.put(`emotions/${emotion.id}`, getEmotionWithValidFormat(emotion)).then(response => {
        console.log(response)
        /*return {
            ...response.data,
            created_at: new Date(response.date.created_at)
        }*/
    });
}
export {
    fetchEmotionList,
    getEmotionWithTimeRange,
    createEmotion,
    updateEmotion
}