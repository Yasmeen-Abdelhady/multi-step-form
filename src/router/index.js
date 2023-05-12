import { createRouter, createWebHistory } from 'vue-router'
import PersonalInfo from '../views/PersonalInfo.vue'
import SelectPlan from '../views/SelectPlan.vue'
import AddOns from '../views/AddOns.vue'
import SummeryView from '../views/SummeryView.vue'
import ThankYou from '../views/ThankYou.vue'

const routes = [
  {
    path: '/',
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    path: '/select-plan',
    name: 'SelectPlan',
    component: SelectPlan
  },
  {
    path: '/add-ons',
    name: 'AddOns',
    component: AddOns
  },
  {
    path: '/summery',
    name: 'SummeryView',
    component: SummeryView
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
