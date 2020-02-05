<template>
  <section class="confirmation">
    <h4>Your appointment is confirmed</h4>
    <h3 class="bar">Thank you for booking with Silver Mirror. See you at your next facial</h3>

    <section class="appointment">
      <section>
        <label>Date</label>
        <span>{{date|formatDate}}</span>
      </section>
      <section>
        <label>Location</label>
        <span>{{location}}</span>
      </section>
    </section>

    <section class="appointments">
      <section v-for="(appointment, index) in appointments" :key="index">
        <h4 v-if="false">Appointment #{{(index+1)}}</h4>

        <label>Time</label> {{appointment.appointment.Time}}<br/>
        <label>Esthatician</label> {{appointment.appointment.Name}}<br />
        <label>Service</label> {{service(appointment.service_id)}}<br />
        <span v-if="appointment.addon_ids && appointment.addon_ids.length">
          <span v-for="(addon, index) in addons(appointment.addon_ids)" :key="index">
             <label>Addon</label> {{addon}}<br />
          </span>
        </span>
      </section>
    </section>

    <section class="break" style="padding-top: 30px;">
      <p>
        <a @click="clear()">BOOK ANOTHER APPOINTMENT</a>
      </p>
      <p>
        <a href="/my-account/orders">VIEW MY APPOINTMENTS</a>
      </p>
    </section>
  </section>
</template>


<style lang="scss" scoped>

.break {
  > p {
    > a {
      &:link, &:visited, &:active {
        color: rgba(0,0,0,0.5);

      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}

</style>


<script>
import { mapMutations, mapGetters } from 'vuex'



export default {
  computed: {
    ...mapGetters({
      date: 'appointment/date',
      location_id: 'appointment/location_id',
      number_of_guests: 'appointment/number_of_guests',
      staff_id: 'appointment/staff_id',
      appointments: 'appointment/appointments',
    }),
    location () {
      try {
        return this.$store.getters['locations/by_id'](this.location_id).Name
      } catch(error) {
        return 'No location selected' + error
      }
    },
  },
  mounted() {
    this.$ga.event({
      eventCategory: 'booking',
      eventAction: 'confirmed',
      value: ''
    });
  },
  methods: {
    service (service_id) {
      try {
        var service = this.$store.getters['services/by_id'](service_id)
        return service.Name
      } catch(error) {
        return 'No service selected'
      }
    },
    addons (addon_ids) {
      try {
        var addons = []
        addon_ids.forEach((id)=> {
          let addon = this.$store.getters['services/by_id'](id)
          addons.push(addon.Name)
        })
        return addons
      } catch(error) {
        return []
      }
    },
    clear() {
      this.$store.commit('appointment/reset')
      this.$router.push('/')
    }
  }
}

</script>