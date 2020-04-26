// each element should have content and created_at properties
const sampleStory = [
    {
        content: "facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum posuere",
        created_at: new Date() - 10000
    },
    {
        content: "venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin",
        created_at: new Date() - 2000
    }
]
export const state = () => ({
    list: sampleStory
});
export const mutations = {
    add(state, newStory) {
        state.list.push(newStory);
    }
}