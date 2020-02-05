import { API } from '~/plugins/api'

export const state = () => ({
  list: []
})

export const getters = {
  list(state) {
    return state.list
  },
  by_id: (state, getters) => id => {
    return _.find(state.list, { uid: id })
  }
}

export const mutations = {
  POPULATE(state, values) {
    state.list = values
  }
}

export const actions = {
  get_bookable_items({ commit, rootGetters }) {
    let StartDate = rootGetters['appointment/date']
    let LocationIDs = rootGetters['appointment/location_id']
    let SessionTypeIDs = [].concat([rootGetters['appointment/service_id']]).concat(rootGetters['appointment/addon_ids']).filter((v)=>{ return (v) ? true : false; })
    let StaffIDs = rootGetters['appointment/staff_id'] || undefined

    console.log("GBI", StartDate, LocationIDs, SessionTypeIDs, StaffIDs)

    return new Promise((resolve, reject) => {
      API.post(`/get_bookable_items`, { StartDate, LocationIDs, SessionTypeIDs, StaffIDs }).then(
        response => {
          resolve(response.data)
        },
        error => {
          reject(error.response.data);
        }
      )
    })
  },
  book({ commit, rootGetters }, { Booking }) {

    let StartDate = rootGetters['appointment/date']
    let Location = rootGetters['appointment/location_id']
    let Client = rootGetters['appointment/user_id']
    let Appointments = rootGetters['appointment/appointments']

    return new Promise((resolve, reject) => {
       let appointments = [];
      _.each(Appointments, (a) => {
        var duration = 0;
        _.each([].concat([a.service_id]).concat(a.addon_ids), function(service_id){

          var time = moment(a.appointment.Date).add('minutes', duration);
          var minutes = Math.ceil(time.minute() / 15) * 15;
          time = time.minute(minutes).second(0)

          console.log("Appointment", a,  duration, time.format('YYYY-MM-DDTHH:mm:ss'))

          appointments.push({
            Appointment: {
              StartDateTime: time.format('YYYY-MM-DDTHH:mm:ss'),
              Location: {
                ID: parseInt(Location)
              },
              Staff: {
                ID: a.appointment.ID
              },
              Client: {
                ID: Client
              },
              SessionType: { ID: service_id },
              Notes: `${Booking.promotion_code} ${Booking.notes}`
            }
          })

          duration+=rootGetters['services/duration'](service_id)
        })
        
     })

      API.post(`/appointment/book`, {
          Appointments: appointments,
          Booking
      }).then(
        response => {
          resolve(response.data)
        },
        error => {
          reject(error.response.data);
        }
      )
    })
  }
}
