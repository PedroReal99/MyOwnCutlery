import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import MachineType from '@/views/MachineType.vue'

describe('MachineType.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Machine TypeSearchDesignationOperationsCreate Machine TypeDescriptionSelect OperationsCreate'
        const wrapper = shallowMount(MachineType, {
            propsData: { msg }
        })
        expect(wrapper.text()).to.include(msg)
    })
})