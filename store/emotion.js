import {
    mdiEmoticonKiss,
    mdiEmoticonWink,
    mdiEmoticonCry,
    mdiEmoticonAngry,
    mdiEmoticonSad,
    mdiEmoticonDead
} from "@mdi/js";

const sampleEmotion = [
    { type: 'happy', level: "Very high", time: Date.now() - 100 },
    { type: 'suprise', level: "high", time: Date.now() - 200 },
    { type: 'suprise', level: "not a lot", time: Date.now() - 300 },
    { type: 'sad', level: "neural", time: Date.now() - 1000 }
]
/*
    Emotion Vuex module:
    State:
        * list: list of emotions from user 
        * type(String): list of emotion types, 6 elements
        * level(String) with 5 elements
*/
export const state = () => ({
    list: sampleEmotion,
    types: ["happy", "surprising", "sad", "fear", "anger", "disgust"],
    levels: ["Very high", "high", "neural", "low", "not a lot"],
    emotionIcon: {
        happy: mdiEmoticonKiss,
        surprising: mdiEmoticonWink,
        sad: mdiEmoticonSad,
        fear: mdiEmoticonCry,
        anger: mdiEmoticonAngry,
        disgust: mdiEmoticonDead
    }
})

export const mutations = {
    add(state, newEmotion) {
        state.list.push(newEmotion);

    },


}
export const getters = {
    // return the emotion type list with icon (for display purpose)
    emotionListWithIcon(state) {
        return state.types.map(type => {
            return { value: type, icon: state.emotionIcon[type] }
        })
    },
    //return the emotion level list with icon (for display purpose)
    levelListWithIcon(state) {
        return (emotionType) => {
            return state.levels.map(level => {
                return {
                    value: level,
                    icon: state.emotionIcon[emotionType]
                }
            });
        }

    },
    // convert level from string to integer
    // level should be integer
    levelString(state) {
        return (level) => {
            return state.levels[level - 1];
        }

    },
    // convert level from integer to string
    // level should be string
    levelInt(state) {
        return (level) => {
            return state.levels.indexOf(level) + 1;
        }
    },
    emotionIcon(state) {
        return (emotion) => {
            return state.emotionIcon[emotion]
        }
    }



}