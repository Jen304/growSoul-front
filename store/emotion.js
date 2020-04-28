// imort icon
import {
    mdiEmoticonKiss,// very good
    mdiEmoticonExcited, // good
    mdiEmoticonNeutral, // neural
    mdiEmoticonCry,// bad
    mdiEmoticonSad, // not so good

} from "@mdi/js";
import { getData, setData } from 'nuxt-storage/local-storage';

/*
    Emotion Vuex module:
    State:
        * list: list of user emotions 
        * emotions(map) pair of emotion and emtion icon, string, color
*/
// keyName is used to access emotion list from localStorage
const keyName = 'emotionList';
// get emotion list from localstorage
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

}
const save = (list) => {
    // check whether the browser support localStorage
    if (typeof (Storage) !== "undefined") {
        setData(keyName, JSON.stringify(list));
    }
    else { console.log("your browser does not support local storage"); }
}
export const state = () => ({
    // init emotion list
    list: getEmotionStorage(),
    emotionIcons: {
        "5": mdiEmoticonKiss,
        "4": mdiEmoticonExcited,
        "3": mdiEmoticonNeutral,
        "2": mdiEmoticonSad,
        "1": mdiEmoticonCry
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

export const mutations = {
    submit(state, newEmotion) {
        let found = false;
        const list = state.list;
        // search the emotion according to timestamp (in case of editing)
        // need to refactor, reduce the loop
        for (let i = 0; i < list.length && !found; i++) {
            if (list[i].created_at == newEmotion.created_at) {
                list[i] = newEmotion;
                found = true;
            }
        }
        if (!found) {
            list.unshift(newEmotion);
        }
        // save the list to localStorage
        save(list);

    },


}
export const getters = {
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
        return ({ start, end }) => {
            return state.list.filter(emotion => {
                return emotion.created_at > start && emotion.created_at < end
            })
        }
    },
}