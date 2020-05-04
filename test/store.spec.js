import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils'
import _ from 'lodash';
// setup the store 

const localVue = createLocalVue();
localVue.use(Vuex);
let NuxtStore;
let store;

beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`;
    NuxtStore = await import(storePath)
});

beforeEach(async () => {
    store = await NuxtStore.createStore();
});


// test emotion modules
describe("Emotion", () => {
    let emotion

    beforeEach(() => {
        emotion = store.state.emotion.list;
    })

    test("emotion should be an array", () => {
        expect(_.isArray(emotion)).toBe(true);
    })
})
