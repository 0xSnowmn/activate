import { createStore } from 'vuex'
import router from '../router/index'

const getmac = require('getmac')
//FyM3IeFlghX9Xv7wBYboKReVnAsJuJaf
export default createStore({
  state: {
    Key:false,
    loading: true
  },
  mutations: {
    changeKey:(state,payload) => {
      state.Key = payload
      state.loading = false
    }
  },
  actions: {
    checkKey:async (context,key) => {
      const mac = getmac.default().toLowerCase()
      axios.get('https://ygh14.azurewebsites.net/keys/check?key=' + key,{ headers: { "X-IAM-GHONEM": "yes"}}).then((res) => {
                if(res.status === 401) {
                  context.commit("changeKey",false)
                }  
                if(res.data.isExpired === "false" && res.data.mac === mac) {
                  context.commit("changeKey",true)
                  localStorage.setItem('key',key)
                  router.push({ name: 'Start'})
                } else if(res.data.isExpired === "true") {
                  context.state.loading = false
                  return
                } else if(res.data.mac !== mac){
                  axios.put('https://ygh14.azurewebsites.net/keys/usg',{
                    key: key,
                    mac:mac
                  },{ headers: { "X-IAM-GHONEM": "yes"}}).then((nRes) => {})
                  context.commit("changeKey",true)
                  localStorage.setItem('key',key)
                  router.push({ name: 'Start'})
                }
            })
            context.state.loading = false

    }
  },
  modules: {
  }
})

