import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Operations from '@/views/Operations.vue'

describe('Operations.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Operations by Machine Type'
        const wrapper = shallowMount(Operations, {
            propsData: { msg }
        })
        expect(wrapper.text()).to.include(msg)
    })
})