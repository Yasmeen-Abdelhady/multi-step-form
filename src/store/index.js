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
    setTotal(state , payload){
      state.totalPrice = payload
    },
    checkData(state , payload){
      state.check = payload
    }
  },
  actions: {
    async sendDataToApi({ commit, state }){
      await axios.post('https://6462b6367a9eead6fad5180f.mockapi.io/api/v1/users',{
        user: state.user,
        period: state.month,
        plan: state.planObj,
        ons: state.onsObj,
        total: state.totalPrice
      }).then(res => {
        if(res.status == 201){
          commit('checkData' , 'succeed')
        }
        else{
          commit('checkData' , 'not succeed')
        }
      }).catch(error => {
        console.log(error)
        commit('checkData' , 'Request failed try again')
      })
    }
  },
  modules: {
  }
})
