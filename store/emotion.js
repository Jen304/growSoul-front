export const state = () => ({
    emotions: []
})

export const mutations = {
    add(state, newEmotion) {
        console.log('add emotion');
        console.log(newEmotion);
        state.emotions.push(newEmotion);
    },

}