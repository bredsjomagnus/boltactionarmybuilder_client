import Vue from 'vue'
import bcrypt from 'bcryptjs'

const state = {
  email: '',
  userId: null,
  first: '',
  last: '',
  isLoggedIn: false,
  loginError: '',
  role: '',
  users: []
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  userRole: state => state.role,
  loginError: state => state.loginError,
  userName: state => state.first + ' ' + state.last,
  users: state => state.users
}

const actions = {
  async logInUser({
    commit
  }, payload) {
    await Vue.axios.get('/user/email/' + payload.email)
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          // Test password entered (payload) against user object
          const pwdHash = data[0].password
          if (bcrypt.compareSync(payload.password, pwdHash)) {
            const user = data[0]
            payload.userId = user._id
            payload.first = user.first
            payload.last = user.last
            payload.email = user.email
            payload.role = user.role
            commit('logInUser', payload)
          } else {
            commit('loginError')
          }
        }
      })
      .catch(() => {
        commit('loginError')
      })
  },
  async logOutUser({
    commit
  }) {
    await commit('LogOutUser');
  },
  async loadUserProfile({
    commit
  }) {
    // get the user object for the currently logged in user...
    await Vue.axios.get('/user/' + this.userId)
      .then((resp) => {
        let data = resp.data
      })
  },
  updateUserProfile({
    commit
  }, payload) {
    // TODO: encrypt the user's password
    bcrypt.hash(payload.password, 8, (err, hash) => {
      if (!err) {
        payload.password = hash
        Vue.axios.put('/user/' + this.state.user.userId, payload)
          .then((resp) => {
            console.log(resp)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  },
  createUserProfile({
    commit
  }, payload) {
    bcrypt.hash(payload.password, 8, (err, hash) => {
      if (!err) {
        payload.password = hash
        Vue.axios.post('/user', payload)
          .then((resp) => {
            Vue.axios.get('/users')
              .then((resp) => {
                let data = resp.data
                if (data && data.length > 0) {
                  commit('setUsers', data)
                }
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  },
  getUsers({
    commit
  }) {
    Vue.axios.get('/users')
      .then((resp => {
        let data = resp.data
        if (data && data.length > 0) {
          commit('setUsers', data)
        }
      }))
      .catch((err) => {
        console.log(err)
      })
  }
}

const mutations = {

  setUsers(state, payload) {
    state.users = []
    payload.forEach(tx => {
      state.users.push(mapUsers(tx, state))
    });
  },

  logInUser(state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
    state.first = payload.first
    state.last = payload.last
    state.userId = payload.userId
    state.role = payload.role
  },
  LogOutUser(state) {
    state.isLoggedIn = false
    state.email = ''
    state.first = ''
    state.last = ''
    state.userId = ''
  },
  loginError(state) {
    state.isLoggedIn = false
    state.loginError = 'Email and/or Password are invalid. Login failed.'
  }
}

function mapUsers(tx, state) {
  let user = {
    id: tx._id,
    first: tx.first,
    last: tx.last,
    email: tx.email,
    active: tx.isActive,
    created: tx.createdOn.substring(0, 10)
  }
  return user;
}

export default {
  state,
  getters,
  actions,
  mutations
}