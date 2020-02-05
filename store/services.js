import { API } from '~/plugins/api'

export const state = () => ({
  list: [],


  // THIS PRICING IS FOR REFERENCE ONLY
  // The pricing is now being pulled from the MindBody API
  // directly so pricing changes will take effect without any 
  // further modification.

  pricing: {
    8: 80, // Signature Facial $80
    9: 85, // Party-Prep Facial $85
    15: 85, // Men's Facial $85
    14: 95, // Mom-To-Be Facial $95
    13: 120, // Sensitive Skin Facial $120
    11: 135, // Anti-Aging Facial $135
    10: 135, // Acne-Fighting Facial $135
    12: 135, // Brightening / Dryness Facial $135
    16: 125, // Experience Summer (Seasonal) $125

    26 :35, // Antioxidant Peel (Standalone Treatment)

    // ADD ONS
    19: 30, // Custom Super Boost $3
    17: 15, // Extra Extractions $15
    20: 35, // Lift It - Full Face $35
    21: 15, // Lift It - Just the Eyes $15
    18: 15, // Neck Care $15
    22: 30, // LED Therapy $30
    29: 75, // Dermaplaning $75
    24: 175, // Skin Refining Peel (Anti-Aging) $175
    27: 175, // Acne Clarifying Peel $175
    23: 35, // Antioxidant Peel - Add-on to any facial $35
    30: 20, // Vitamin C Oxygen Peel Boost $20
    31: 20, // Acne System Peel Boost $20
    32: 20, // Healing-Hydrating Peel Boost $20
    33: 35 // Hydra-Dermabrasion
  },


  restrictions: {

    // Remove Lift It - Full Face $35 && Lift It - Just the Eyes $15
    9: [20,21],
    11: [20,21, 22],

    // Remove LED from 50 min facials
    10: [22],
    12: [22],
    13: [22],
    16: [22]
  }
})


export const getters = {
  list(state) {
    return state.list
  },
  by_id: (state, getters) => id => {
    return _.find(state.list, { ID: id })
  },
  regular(state) {
     return _.filter(state.list, { ProgramID: 2 })
  },
  duration: (state, getters) => service_id => {
    var duration = _.find(state.list, { ID: service_id }).DefaultTimeLength;

    // Dermaplaning
    if (service_id == 29) {
      duration+=30
    } 
    // Party Prep
    else if (service_id == 9) {
      duration+=25
    } 
    else if (duration==50) { duration+=10 } 
    else {  duration+=15 }

    return duration   
  },
  addons: (state, getters) => service_id => {
    var addons = _.filter(state.list, { ProgramID: 4 });

    if (typeof state.restrictions[service_id] != 'undefined') {
      addons = _.filter(addons, (a) => {
        return state.restrictions[service_id].indexOf(a.ID) == -1
      })
    }
    return addons
  } 
}

export const mutations = {
  POPULATE(state, values) {
    state.list = _.map(values, (service) => {
      /*
      var pricing = _.find(service.pricing,  (s)=> {
        return s.Count == 1
      })

      return Object.assign(service, { price: pricing.Price.split(".")[0] })
      */
      return Object.assign(service, { price: state.pricing[service.ID] })
    })
    
    //console.log("Services", state.list)
  }
}

export const actions = {
  async init({ commit }) {
    await API.get(`/services`).then(
      response => {
        //console.log('LOCADING SERVICES', response.data)
        commit('POPULATE', response.data)
      },
      error => {
        // reject(error.response.data);
      }
    )
  }
}



