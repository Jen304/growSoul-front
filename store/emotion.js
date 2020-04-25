const sampleEmotion = [
    { value: 'happy', level: 5, time: Date.now() - 100 },
    { value: 'suprise', level: 4, time: Date.now() - 200 },
    { value: 'suprise', level: 1, time: Date.now() - 300 },
    { value: 'sad', leveel: 2, time: Date.now() - 1000 }
]
export const state = () => ({
    emotions: sampleEmotion
})

export const mutations = {
    add(state, newEmotion) {
        state.emotions.push(newEmotion);
        console.log(state.emotions);
    },

}