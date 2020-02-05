import { API } from '~/plugins/api'
import axios from 'axios'

export const state = () => ({
  ID: false,
  list: []
})

export const getters = {
  list(state) {
    return state.list
  },
  get_id(state) {
    return state.ID
  },
  by_id: (state, getters) => id => {
    return _.find(state.list, { uid: id })
  }
}

export const mutations = {
  POPULATE(state, values) {
    state.list = values
  },
  ID(state, values) {
    state.ID = values.ID
  }
}

export const actions = {
  async login({ commit, dispatch }, { username, password }) {
     await API.post(`/users/login`, { username, password }).then(
      response => {
        console.log('LOGIN REPONSE', response.data)
        commit('GUID', response.data)
      },
      error => {
        // reject(error.response.data);
      }
    )
  },
  async validate({ commit, dispatch }, { guid }) {
     await API.get(`/users/validate`, { guid }).then(
      response => {
        console.log('VALIDATE RESPONSE', response.data)
        //commit('POPULATE', response.data)
      },
      error => {
        // reject(error.response.data);
      }
    )
  },
  set({ commit }, { session }) {
    commit('ID', { session })
  }
}
