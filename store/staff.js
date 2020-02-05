import { API } from '~/plugins/api'
import axios from 'axios'

export const state = () => ({
  list: {},
  settings: {}
})

export const getters = {
  list(state) {
    return _.filter(state.list, (o) => o.ID>1)
  },
  enabled(state) {
    return _.filter(state.list, (e) => { return e.status != 'Disabled' })
  },
  by_id: (state, getters) => id => {
    return _.find(state.list, { ID: id })
  },
  settings: (state, getters) => id => {
    let settings = state.settings[id] || {}

    if (typeof settings['addon-services'] == 'undefined') {
      settings['addon-services'] = []
    } 
    if (typeof settings['locations'] == 'undefined') {
      settings['locations'] = []
    } 
    if (typeof settings['status'] == 'undefined') {
      settings['status'] = 'Disabled'
    }
    
    return settings
  },
  by_location: (state, getters) => location_id => {
    return _.filter(state.list, (o) => {
      var settings = getters['settings'](o.ID);
      return settings.locations.indexOf(location_id.toString()) >= 0
    })
  }
}

export const mutations = {
  POPULATE(state, values) {
    state.list = values
  },
  SETTINGS(state, values) {
    state.settings = values
  }
}

export const actions = {
  async init({ commit }) {
    await API.get(`/staff`).then(
      response => {
        commit('POPULATE', response.data)
      },
      error => {
        // reject(error.response.data);
      }
    )
    await API.get('/administration/settings').then(
      response => {
        //console.log("SETTINGS", response)
        commit('SETTINGS', response.data)
      },
      error => {
        // reject(error.response.data);
      }
    )
  },
  save({ commit, dispatch }, { id, settings }) {
    return new Promise((resolve, reject) => {
      API.post('/administration/settings', { 
        id: id,  
        data: Object.assign({}, settings)
      }).then(()=> {
        dispatch('init')
        resolve()
      })
    })
  }
}
