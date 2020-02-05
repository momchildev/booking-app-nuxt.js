import { API } from '~/plugins/api'

export const state = () => ({
  session: false,
  date: new Date().toISOString().slice(0, 10),
  location_id: 1,
  duration: false,
  number_of_guests: 1, 
  staff_id: '',
  service_id: '',
  addon_ids: [],
  appointments: []
})

export const getters = {
  user_id(state) {
    return state.session
  },
  date(state) {
    return state.date
  },
  location(state, rootGetters) {
    return rootGetters.locations.by_id(state.location_id)
  },
  number_of_guests(state) {
    return state.number_of_guests
  },
  location_id(state) {
    return state.location_id
  },
  staff_id(state) {
    return state.staff_id
  },
  duration(state) {
    return state.duration
  },
  service_id(state) {
    return state.service_id
  },
  addon_ids(state) {
    return state.addon_ids
  },
  number_of_guests(state) {
    return state.number_of_guests
  },
  appointments(state) {
    return state.appointments
  }
}

export const mutations = {
  session(state, value) {
    state.session = value
  },
  date(state, value) {
    state.date = value
  },
  location_id(state, value) {
    state.location_id = value
    state.staff_id = '';
  },
  number_of_guests(state, value) {
    if (state.number_of_guests != value) {
      state.apointments = []
      state.number_of_guests = value
    }
  },
  staff_id(state, value) {
    state.staff_id = value;
  },
  duration(state, value) {
    state.duration = value;
  },
  service_id(state, value) {
    state.service_id = value;
  },
  addon_ids(state, values) {
    console.log("SET ADDON IDS", values)
    state.addon_ids = values;
  }, 
  appointments(state, value) {
    state.appointments = value
  },
  add_appointment(state, values) {
    state.appointments.push(values)
  },
  reset(state) {
    state.date = new Date().toISOString().slice(0, 10);
    state.location_id = 1
    state.duration = false
    state.number_of_guests = 1 
    state.staff_id = ''
    state.service_id = ''
    state.addon_ids = []
    state.appointments = []
  }
}

export const actions = {
  add({ commit, dispatch, state }, { appointment }) {

    console.log("Adding Appointment", {
      service_id: state.service_id,
      addon_ids: state.addon_ids,
      date: state.date,
      appointment: appointment
    });

    commit('add_appointment', {
      service_id: state.service_id,
      addon_ids: state.addon_ids,
      date: state.date,
      appointment: appointment
    })
    commit('service_id', '')
    commit('addon_ids', [])
    commit('duration', false)
  },
  session({ commit, getters }) {
    return new Promise((resolve, reject) => {
      resolve(getters['session'])
    })
  }
}
