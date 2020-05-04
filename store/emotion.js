import { getData, setData } from 'nuxt-storage/local-storage';
import moment from 'moment'

/*
    Emotion Vuex module:
    State:
        * list: list of user emotions 
        * emotions(map) pair of emotion and emtion icon, string, color
*/
// keyName is used to access emotion list from localStorage
const keyName = 'emotionList';
// get emotion list from localstorage
/*
const getEmotionStorage = () => {
    let list = [];
    // check whether the browser support localStorage
    if (typeof (Storage) !== "undefined") {
        list = JSON.parse(getData(keyName)) || [];
        return list.map(element => {
            // convert from string to Date type
            let time = new Date(element.created_at);
            //console.log(time)
            return { ...element, created_at: time }
        })
    } else {
        console.log("your browser does not support local storage");
    }

}*/
/*
const save = (list) => {
    // check whether the browser support localStorage
    if (typeof (Storage) !== "undefined") {
        setData(keyName, JSON.stringify(list));
    }
    else { console.log("your browser does not support local storage"); }
}*/

const state = () => ({
    // init emotion list
    list: [], //getEmotionStorage(),
    emotionIcons: {
        "5": "mdi-emoticon-kiss",
        "4": "mdi-emoticon-excited",
        "3": "mdi-emoticon-neutral",
        "2": "mdi-emoticon-sad",
        "1": "mdi-emoticon-cry"
    },
    emotionString: {
        "5": "Very good",
        "4": "Good",
        "3": "Neural",
        "2": "Not so good",
        "1": "Bad"
    },
    emotionColors: {
        "5": "teal",
        "4": "cyan",
        "3": "blue",
        "2": "indigo ",
        "1": "purple"
    }
});

const mutations = {
    getList(state, list) {
        state.list = list
    },
    add(state, emotion) {
        state.list.unshift(emotion);
    },
    update(state, emotion) {
        const list = state.list;

        for (let i = 0; i < list.length && !found; i++) {
            if (list[i].created_at == emotion.created_at) {
                list[i] = newEmotion;
                found = true;
            }
        }
        // save the list to localStorage
        //save(list);

    },


}
const getters = {
    // return the emotion list with icon (for display purpose)
    emotionList(state) {
        let list = [];
        for (let key in state.emotionIcons) {
            list.push(parseInt(key));
        }
        return list;
    },

    // return a list of emotion according to that range time
    emotionListWithinRangeTime(state) {
        // return a function to accept parameters
        return ({ start, end }) => {
            // return an array according to the range of time
            return state.list.filter(emotion => {
                return emotion.created_at > start && emotion.created_at < end
            })
        }
    },
}
import { fetchEmotionList, getEmotionWithTimeRange, createEmotion, updateEmotion } from '../services/emotionService'

const actions = {
    async getEmotionList({ commit }) {
        const list = await fetchEmotionList();
        commit('getList', list);

    },
    async getListWithTimeRange({ commit }, { start, end }) {
        const list = await getEmotionWithTimeRange({ start, end });
        commit('getList', list);
    },
    async addOrUpdateEmotion({ commit }, emotion) {
        if (emotion.id) {
            updateEmotion(emotion);
            commit('update', emotion);

        } else {
            emotion.created_at = new Date();
            const newEmotion = await createEmotion(emotion);
            console.log(newEmotion);
            commit('add', newEmotion);
        }
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}