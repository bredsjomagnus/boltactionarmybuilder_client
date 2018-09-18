import Vue from 'vue'

const state = {

}

const getters = {

}

const actions = {
  addArmyGroup({},
    payload) {
      console.log("IN STORE - addArmyGroup payload: ", payload)
      Vue.axios.post('army/', payload)
        .then(() => {
          console.log("added armygroup")
        })
        .catch((err) => {
          console.log("Error adding armygroup: ", err)
        })
    },
}

const mutations = {
 
}

export default {
  state,
  getters,
  actions,
  mutations
}