import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user:{},
    month: true,
    planObj:{},
    onsObj: [],
    totalPrice:'',
    stepNumber: 1,
    stepNumberEnd:4,
    check:''
  },
  getters: {
  },
  mutations: {
    increaseStep(state){
      state.stepNumber++
      if(state.stepNumber >= state.stepNumberEnd){
        state.stepNumber = 4
      }
    },
    decreaseStep(state){
      state.stepNumber--
      if(state.stepNumber <= 1){
        state.stepNumber = 1
      }
    },
    userData(state , payload){
      state.user = payload
    },
    changePeriod(state , payload){
      state.month = !payload 
    },
    setOnsData(state , payload){
      state.onsObj.push(payload);
    },
    setPlanObj(state , payload){
      state.planObj = payload
    },
    checkData(state , payload){
      state.check = payload
    }
  },
  actions: {
    async sendDataToApi({ commit, state }){
      await axios.post('http://localhost:3000/users',{
        user: state.user,
        period: state.month,
        plan: state.planObj,
        ons: state.onsObj,
        total: state.totalPrice
      }).then(res => {
        console.log(res)
        if(res.status == 201){
          commit('checkData' , 'succeed')
        }
        else{
          commit('checkData' , 'not succeed')
        }
      })
    }
  },
  modules: {
  }
})
