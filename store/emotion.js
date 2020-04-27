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
    add(state, newEmotion) {
        state.list.push(newEmotion);

    },
}
export const getters = {
    // return the emotion list with icon (for display purpose)
    emotionListWithIcon(state) {
        let list = [];
        for (let key in state.emotionIcons) {
            //console.log(key);
            list.push({ value: parseInt(key), icon: state.emotionIcons[key] });
        }
        return list
    },
    emotionList(state) {
        const list = [];
        for (let key in state.emotionIcons) {
            list.push(key)
        }
        return key;
    },
    // return a list of emotion according to that range time
    emotionListWithinRangeTime(state) {
        return ({ start, end }) => {
            //console.log(start);

            return state.list.filter(emotion => {
                return emotion.created_at > start && emotion.created_at < end
            })
        }


    },
    fullEmotionListWithIcon(state) {
        let list = state.list.map(element => {
            return {
                emotion: state.emotionString[element.emotion],
                story: element.story, created_at: element.created_at,
                icon: state.emotionIcons[element.emotion]
            }
        });
        list.sort((current, next) => next.created_at - current.created_at);
        return list;

    },






}