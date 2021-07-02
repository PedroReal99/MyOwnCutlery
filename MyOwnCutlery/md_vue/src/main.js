//import App from '@/App'
import Initial from './views/Initial'
import router from './router'
import store from './store'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Bootstrap from 'bootstrap-vue'

Vue.use(VueAxios, axios)
Vue.use(Bootstrap)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(Initial)
}).$mount('#app')