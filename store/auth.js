import { API } from '~/plugins/api'

export const state = () => ({
  auth: false
})

export const getters = {
  state(state) {
    return state.auth
  }
}

export const mutations = {
  AUTH(state, values) {
    state.auth = values
  }
}

export const actions = {
  login({ commit }, { password }) {
    return new Promise((resolve, reject) => {
      if (password=='mirror1209') {
        commit('AUTH', true)
        resolve(true)
      } else {
        commit('AUTH', false)
        reject('Invalid password')
      }
    })
  }
}
