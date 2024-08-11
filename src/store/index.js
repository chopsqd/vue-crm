import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import error from './error'
import info from './info'
import currency from './currency'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, error, info, currency
  }
})
