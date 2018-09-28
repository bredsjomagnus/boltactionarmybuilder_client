import Vue from 'vue'

const state = {
  armies: [],
  nationarmy: [],
  editarmygroup: {},
  chosenarmy: []
}


// GETTERS
const getters = {
  armies: state => state.armies,
  nationarmy: state => state.nationarmy,
  editarmygroup: state => state.editarmygroup,
  chosenarmy: state => state.chosenarmy
}

// ACTIONS
const actions = {

  async addToChosenArmy({commit}, payload) {
    await Vue.axios.get('/army/'+ payload)
      .then((resp) => {
        let data = resp.data;
        if(data) {
          commit('addToChosen', data);
        }
      });
  },

  async nationArmy({commit}, payload) {
    let nation = capitalizeFirstLetter(payload);
    // console.log('store > modules > army > actions > nationArmy > nation > ', nation);
    Vue.axios.get('/army/nationality/'+nation)
      .then((resp) => {
        // Receiving one nations armygroups 
        let data = resp.data;
        commit('updateNationArmy', data)
      })
      .catch((err) => {
        console.log('Error getting nation army from api; ', err)
      });
  },

  async copyEditArmyGroup({commit}, payload) {
    await Vue.axios.get('/army/'+ payload)
      .then((resp) => {
        let data = resp.data;
        let options = generateOptions(data.options);
        let rules = generateRules(data.special_rules);
        let doc = {
          nationality: data.nationality,
          type: data.type,
          category: data.category,
          title: data.title,
          experience: data.experience,
          description: data.description,
          cost: data.cost,
          weapons: data.weapons,
          damagevalue: data.damagevalue,
          composition: {
              description: data.composition.description,
              size: data.composition.size,
          },
          maxsize: data.maxsize,
          options: options,
          special_rules: rules,
        };
        this.dispatch('addArmyGroup', doc);
        // console.log("Copy of armygroup >\n", doc);
      })
      .catch((err) => {
        console.log("Error copying armygroup: ", err);
      })
  },
  // Used in AddArmy.vue -> Adds new army group to db
  async addArmyGroup({commit}, payload) {
      await Vue.axios.post('/army', payload)
        .then(() => {
          // Update state
          this.dispatch('updateArmy')
          
        })
        .catch((err) => {
          console.log("Error adding armygroup: ", err)
        })
    },
    // From EditArmy.vue when editing armygroup
    async updateArmyGroup({commit}, payload) {
      // console.log('store > modules > army > updateArmyGroup > payload.id > ', payload._id);
      await Vue.axios.put('/army/'+payload._id, payload)
        .then(() => {
          // Update state
          this.dispatch('updateArmy')
        })
        .catch((err) => {
          console.log('Error updating army: ', err);
        });
    },
    // Internal Chain Action to update State
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
      // Gets army via ID
      async getEditArmyGroupById({commit}, payload) {
        await Vue.axios.get('/army/' + payload)
          .then((resp) => {
            let data = resp.data;
            if (data) {
              // Update army group state
              commit('updateEditArmyGroup', data)
            }
          })
          .catch((err) => {
            console.log("armyById error: ", err);
          })
      },
      // Used in AdminArmies.vue -> deletes army group from db
      async deleteArmyGroup({}, payload) {
        await Vue.axios.delete('/army/delete/' + payload)
          .then(() => {
            // Update army state
            this.dispatch('updateArmy')
          })
          .catch((err) => {
            console.log('Error in store deleteing armygroup. ', err);
          })
      },
}

// MUTATIONS
const mutations = {
  addToChosen(state, payload) {
    state.chosenarmy.push(payload);
  },
  updateArmy(state, payload) {
    state.armies = []
    payload.forEach(tx => {
      state.armies.push(mapArmy(tx));
    });
  },
  updateNationArmy(state, payload) {
    state.nationarmy = []
    payload.forEach(tx => {
      state.nationarmy.push(mapArmy(tx));
    });
  },
  updateEditArmyGroup(state, payload) {
    state.editarmygroup = {};
    state.editarmygroup = payload;
  }
}

// HELP FUNCTIONS
function generateOptions(orgoptions) {
  let options = [];
  orgoptions.forEach(opt => {
    let option = {};
    option = {
      description: opt.description,
      cost: opt.cost,
      limit: opt.limit,
      all_or_none: opt.all_or_none
    };
      options.push(option);
    });
    return options;
}

function generateRules(orgrules) {
  let rules = [];
  orgrules.forEach(rl => {
    let rule = {};
    rule = {
      rule: rl.rule,
    };
      rules.push(rule);
    });
    return rules;
}

function mapArmy(tx) {
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
      maxsize: tx.maxsize,
      options: tx.options,
      special_rules: tx.special_rules
    }
  return army;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  state,
  getters,
  actions,
  mutations
}