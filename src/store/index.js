import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import army from './modules/army'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    army,
  }
})