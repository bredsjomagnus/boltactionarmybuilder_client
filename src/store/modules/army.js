import Vue from 'vue'

const state = {
  armies: [],
  army: {},
}

const getters = {
  armies: state => state.armies,
  army: state => state.army,
}

const actions = {
  async addArmyGroup({commit}, payload) {
      await Vue.axios.post('/army', payload)
        .then(() => {
          this.dispatch('updateArmy')
          
        })
        .catch((err) => {
          console.log("Error adding armygroup: ", err)
        })
    },
    // From EditArmy.vue when editing armygroup
    async updateArmyGroup({commit}, payload) {
      console.log('store > modules > army > updateArmyGroup > payload.id > ', payload._id);
      await Vue.axios.put('/army/'+payload._id, payload)
        .then(() => {
          this.dispatch('updateArmy')
        })
        .catch((err) => {
          console.log('Error updating army: ', err);
        });
    },
    // Internal Action to update state
    async updateArmy({commit}) {
        await Vue.axios.get('/army')
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
      async armyById({commit}, payload) {
        await Vue.axios.get('/army/' + payload)
          .then((resp) => {
            let data = resp.data;
            // console.log("armyById: data > ", data);
            if (data) {
              // commit('cleanArmy');
              commit('army', data)
            }
          })
          .catch((err) => {
            console.log("armyById error: ", err);
          })
      },
      async deleteArmyGroup({}, payload) {
        await Vue.axios.delete('/army/delete/' + payload)
          .then(() => {
            this.dispatch('updateArmy')
          })
          .catch((err) => {
            console.log('Error in store deleteing armygroup. ', err);
          })
      },
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
    state.army = {};
    // console.log("mutations > army > payload > ", payload);
    // state.army.push(mapArmy(payload));
    state.army = payload;
    // payload.forEach(tx => {
    //   state.army.push(mapArmy(tx));
    // });
  },
  cleanArmy(state) {
    state.army = {}
  }
}

function mapArmy(tx) {
  // console.log("tx options > ", tx.options[0]);
  // console.log("tx composition > ", tx.composition.description);

  let army = {
      _id: tx._id,
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