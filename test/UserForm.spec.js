import { mount, createLocalVue } from '@vue/test-utils'
import UserForm from '@/components/UserForm.vue'
import Vuetify from 'vuetify'
//const localVue = createLocalVue();

describe('Logo', () => {
  test('is a Vue instance', () => {
    let vuetify = new Vuetify();
    const wrapper = mount(UserForm, {

      vuetify
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
