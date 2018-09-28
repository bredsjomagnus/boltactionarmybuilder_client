import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressBook, faUser, faSignOutAlt, faFileAlt, faToolbox, faHome, faTrash, faPencilAlt, faCopy, faChevronDown, faChevronUp, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faAddressBook, faUser, faSignOutAlt, faFileAlt, faToolbox, faHome, faTrash, faPencilAlt, faCopy, faChevronDown, faChevronUp, faChevronRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8081/api'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
