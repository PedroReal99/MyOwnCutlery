import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Machine from '@/views/Machine.vue'

describe('Machine.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Machine'
        const wrapper = shallowMount(Machine, {
            propsData: { msg }
        })
        expect(wrapper.text()).to.include(msg)
    })
})