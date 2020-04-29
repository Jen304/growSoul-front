import { mount } from '@vue/test-utils'
import EmotionForm from '@/components/EmotionForm.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EmotionForm)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
