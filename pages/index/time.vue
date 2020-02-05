<template>
  <section>
    <h3 class="bar">Select an appointment time</h3>
    <BookingSelectTime :timeslots="timeslots" v-model="timeslot" />
    <section class="buttons">
      <a class="btn btn-primary btn-continue right" @click="add()" v-if="timeslot">Continue</a>
      <nuxt-link to="/services" class="btn btn-primary btn-back">&lt;&lt; Back</nuxt-link>
    </section>
  </section>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import BookingSelectTime from '~/components/booking/SelectTime.vue'
import AlertModal from "~/components/AlertModal";

export default {
  components: {
    BookingSelectTime
  },
  computed: {
    ...mapGetters({
      appointments: 'appointment/appointments',
      number_of_guests: 'appointment/number_of_guests',
    })
  },
  data() {
    return {
      timeslot: false,
      timeslots: {
        morning: [],
        lunchtime: [],
        afternoon: [],
        evening:[]
      },

      loadingSubmit: false
    }
  },
  mounted() {
    //this.$store.commit('appointment/appointments', [])
    this.get_booking_times()
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.loadingSubmit = true

      //setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  methods: {
    get_booking_times() {
      this.$store.dispatch('booking/get_bookable_items').then((timeslots)=> {
        console.log(timeslots)
        this.timeslots = this.appointments_filter(timeslots['schedule'], this.appointments)
        this.$nuxt.$loading.finish()
      }).catch((error)=> {
        this.$nuxt.$loading.finish()
        this.$modal.show(AlertModal, {
          heading: 'No bookings available.',
          message: error,
          callback: () => {
            self.$router.push('/date')
          }
        }, {
          height: 'auto'
        })
      }).finally(() => {
        this.loadingSubmit = false
      })
    },
    appointments_filter(schedule, appointments) {
      _.each(appointments, (a) => {
        _.each(schedule, (t, timeslot) => {
          console.log(`Checking ${timeslot}`, t, schedule[timeslot])
          schedule[timeslot] = _.filter(schedule[timeslot], (o) => {
            console.log(o, a, o.ID==a.appointment.ID, o.Date==a.appointment.Date)
            return !(o.ID==a.appointment.ID && o.Date==a.appointment.Date)
          })
        })
      });
      return schedule;
    },
    add() {
      this.$store.dispatch('appointment/add', { appointment: this.timeslot }).then((appointments)=>{
        if (this.appointments.length < this.number_of_guests) {
          this.$router.push('/services')
        } else {
          this.$router.push('/confirmation')
        }
      })
    }
  }
}
</script>
