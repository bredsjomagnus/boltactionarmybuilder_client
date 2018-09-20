import Vue from 'vue'

const state = {
  armies: [],
  army: [],
}

const getters = {
  armies: state => state.armies
}

const actions = {
  addArmyGroup({commit},
    payload) {
      // console.log("IN STORE - addArmyGroup payload: ", payload)
      Vue.axios.post('/army', payload)
        .then(() => {
          this.dispatch('updateArmy')
          
        })
        .catch((err) => {
          console.log("Error adding armygroup: ", err)
        })
    },
    updateArmy({commit}) {
        Vue.axios.get('/army')
          .then((resp) => {
            let data = resp.data;
              if (data && data.length > 0) {
                commit('updateArmy', data)
              }
          })
          .catch((err) => {
            console.log("Error updating army state");
          })
      },
      armyById({commit}, payload) {
        Vue.axios.get('/army/' + payload)
          .then((doc) => {
            commit('army', doc);
          })
          .catch((err) => {
            console.log("armyById error: ", err);
          })
      },
      deleteArmyGroup({}, payload) {
        console.log("Store module Army delete: payload > ", payload);
        Vue.axios.delete('/army/delete/' + payload)
          .then(() => {
            this.dispatch('updateArmy')
          })
          .catch((err) => {
            console.log('Error in store deleteing armygroup. ', err);
          })
      }
}

const mutations = {
  updateArmy(state, payload) {
    // console.log("update army -> payload > ", payload);
    state.armies = []
    payload.forEach(tx => {
      state.armies.push(mapArmy(tx));
    });
  },
  army(state, payload) {
    state.army = []
    payload.forEach(tx => {
      state.army.push(mapArmy(tx));
    });
  }
}

function mapArmy(tx) {
  // console.log("tx options > ", tx.options[0]);
  // console.log("tx composition > ", tx.composition.description);

  let army = {
      id: tx._id,
      nationality: tx.nationality,
      type: tx.type,
      category: tx.category,
      title: tx.title,
      experience: tx.experience,
      description: tx.description,
      cost: tx.cost,
      weapons: tx.weapons,
      damagevalue: tx.damagevalue,
      composition: {
          description: tx.composition.description,
          size: tx.composition.size
      },
      options: tx.options,
      special_rules: tx.special_rules
    }
  return army;
}

export default {
  state,
  getters,
  actions,
  mutations
}