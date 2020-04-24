export const state = () => ({

    title: 'Grow your soul'
})

export const mutations = {
    title(state, text) {
        state.title = text
    }
}