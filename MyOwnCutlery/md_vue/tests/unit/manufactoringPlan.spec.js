import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ManufacturingPlan from '@/views/ManufacturingPlan.vue'

describe('ManufacturingPlan.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Plano Fabrico'
        const wrapper = shallowMount(ManufacturingPlan, {
            propsData: { msg }
        })
        expect(wrapper.text()).to.include(msg)
    })
})