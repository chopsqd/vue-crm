import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import error from './error'
import info from './info'
import currency from './currency'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, error, info,
    currency, category, record
  }
})
