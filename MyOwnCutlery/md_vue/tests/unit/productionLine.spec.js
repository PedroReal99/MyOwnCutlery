import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProductionLine from '@/views/ProductionLine.vue'

describe('ProductionLine.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'SearchProduction Line IndexMachines designationCreate Production LinePostSelect MachinesCreate'
        const wrapper = shallowMount(ProductionLine, {
            propsData: { msg }
        })
        expect(wrapper.text()).to.include(msg)
    })
})