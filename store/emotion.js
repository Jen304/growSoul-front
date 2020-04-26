import {
    mdiEmoticonKiss,// very good
    mdiEmoticonExcited, // good
    mdiEmoticonNeutral, // neural
    mdiEmoticonCry,// bad
    mdiEmoticonSad, // not so good

} from "@mdi/js";

const sampleEmotion = [
    { type: 'happy', level: "Very high", time: Date.now() - 100 },
    { type: 'suprise', level: "high", time: Date.now() - 200 },
    { type: 'suprise', level: "not a lot", time: Date.now() - 300 },
    { type: 'happy', level: "neural", time: Date.now() - 1000 }
]
/*
    Emotion Vuex module:
    State:
        * list: list of user emotions 
        * emotions(map) pair of emotion and emtion icon
*/
export const state = () => ({
    list: sampleEmotion,
    emotions: {
        "very good": mdiEmoticonKiss,
        "good": mdiEmoticonExcited,
        "neural": mdiEmoticonNeutral,
        "not so good": mdiEmoticonSad,
        "bad": mdiEmoticonCry
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
        for (let key in state.emotions) {
            console.log(key);
            list.push({ value: key, icon: state.emotions[key] });
        }
        return list
    },
    emotionList(state) {
        const list = [];
        for (let key in state.emotions) {
            list.push(key)
        }
        return key;
    }
}