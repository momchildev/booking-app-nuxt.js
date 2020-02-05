import { API } from '~/plugins/api'

export const state = () => ({
  list: [],
  selected_location: 1
})

export const getters = {
  list(state) {
    return _.filter(state.list, (o) => o.ID!=98)
  },
  by_id: (state, getters) => id => {
    return _.find(state.list, { ID: id })
  },
  selected_location(state) {
    return state.selected_location
  },
  current(state) {
    return _.find(state.list, { ID: state.selected_location })
  }
}

export const mutations = {
  POPULATE(state, values) {
    state.list = values
  },
  SELECT(state, value) {
    console.log("SELECTED LOCATION", value)
    state.selected_location = value
  }
}

export const actions = {
  async init({ commit }) {
    await API.get(`/locations`).then(
      response => {
        //console.log('LOCADING LOCATIONS', response.data)
        commit('POPULATE', response.data)
      },
      error => {
        // reject(error.response.data);
      }
    )
  }
}
