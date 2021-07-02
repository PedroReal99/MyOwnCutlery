import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import Product from '@/views/Product.vue'
import ManufacturingPlan from '@/views/ManufacturingPlan.vue'
import MachineType from '@/views/MachineType.vue'
import ProductionLine from '@/views/ProductionLine.vue'
import Machine from '@/views/Machine.vue'
import Operations from '@/views/Operations.vue'
import LoginPage from '@/views//Login'
import RegisterPage from '@/views//Register'
import Initial from '@/views//Initial'
import UserAdmin from '@/views//UserAdmin'
import UserClient from '@/views//UserClient'
import OrderClient from '@/views//OrderClient'
import OrderAdmin from '@/views//OrderAdmin'
import MenuClient from '@/views//MenuClient'
import MenuAdmin from '@/views//MenuAdmin'
import ChangeUserInformation from '@/views//ChangeUserInformation'
import Lapr from '@/views//lapr'
import ChangeUsersInformationAdmin from '@/views//ChangeUsersInformationAdmin'
import Permission from '@/views//Permission'


Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: App },
    { path: '/userClient', component: UserClient },
    { path: '/userAdmin', component: UserAdmin },
    { path: '/menuClient', component: MenuClient },
    { path: '/menuAdmin', component: MenuAdmin },
    { path: '/permission', component: Permission },
    { path: '/lapr', component: Lapr },
    { path: '/ChangeUsersInformationAdmin', component: ChangeUsersInformationAdmin },
    { path: '/user/changeUserInformation', component: ChangeUserInformation },
    { path: '/register', component: RegisterPage },
    { path: '/product', name: 'product', component: Product },
    { path: '/manufacturingplan', name: 'manufacturingplan', component: ManufacturingPlan },
    { path: '/machinetype', name: 'machinetype', component: MachineType },
    { path: '/productionline', name: 'productionline', component: ProductionLine },
    { path: '/machine', name: 'machine', component: Machine },
    { path: '/operations', name: 'operations', component: Operations },
    { path: '/initial', component: Initial },
    { path: '/login', component: LoginPage },
    { path: '/orderClient', component: OrderClient },
    { path: '/orderAdmin', component: OrderAdmin}
]

const router = new VueRouter({
    routes
})

export default router