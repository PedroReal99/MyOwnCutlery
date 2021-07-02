import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Product from '@/views/Product.vue'

describe('Product.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'Product'
        const wrapper = shallowMount(Product, {
            propsData: { msg }
        })
        expect(wrapper.text()).to.include(msg)
    })
})