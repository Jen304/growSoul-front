// imort icon
import {
    mdiEmoticonKiss,// very good
    mdiEmoticonExcited, // good
    mdiEmoticonNeutral, // neural
    mdiEmoticonCry,// bad
    mdiEmoticonSad, // not so good

} from "@mdi/js";
// import color
//import colors from 'vuetify/lib/util/colors'
const sampleEmotion = [
    {
        emotion: "5", created_at: Date.now() - 100,
        story: "facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum posuere"
    },
    {
        emotion: "4", created_at: Date.now() - 200,
        story: "venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin"
    },
    { emotion: "3", created_at: Date.now() - 300 },
    { emotion: '2', created_at: Date.now() - 1000 },
    { emotion: "3", created_at: Date.now() - 300000000000 },

]
/*
    Emotion Vuex module:
    State:
        * list: list of user emotions 
        * emotions(map) pair of emotion and emtion icon
*/
export const state = () => ({
    list: sampleEmotion,
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
        for (let i = 0; i < list.length && !found; i++) {
            if (list[i].created_at == newEmotion.created_at) {
                list[i] = newEmotion;
                found = true;
            }
        }
        if (!found) {
            list.push(newEmotion);
        }
        console.log(state.list);
    },
}
export const getters = {
    // return the emotion list with icon (for display purpose)
    emotionList(state) {
        let list = [];
        for (let key in state.emotionIcons) {
            //console.log(key);
            list.push(parseInt(key));
        }
        return list
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