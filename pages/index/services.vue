<template>
  <section id="select-service">
    <h3 class="bar">Select a service length that fits your schedule:</h3>
    <section class="service-images">
      <section>
        <img src="/booking/images/30min.jpg" width="100%" @click="set(30)"/>
      </section>
      <section>
        <img src="/booking/images/50min.jpg" width="100%" @click="set(50)"/>
      </section>
    </section>
    <h2 v-if="number_of_guests > 1" style="margin-top: 40px;">Now Booking Appointment # {{(appointments.length+1)}}</h2>
    <section v-if="duration" id="booking">
      <section>
        <h3 class="bar">Select a {{duration}} minute maintenance facial</h3>
        <BookingServices :duration="duration" />
      </section>
      <section>
        <h3 class="bar">Select an add-on (if desired)</h3>
        <BookingAddons />
      </section>
    </section>
    <section class="buttons">
      <nuxt-link to="/time" class="btn btn-primary btn-continue right" v-if="service_id">Continue</nuxt-link>
      <nuxt-link to="/date" class="btn btn-primary btn-back">&lt;&lt; Back</nuxt-link>
    </section>
  </section>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import BookingAddons from '~/components/booking/Addons.vue'
import BookingServices from '~/components/booking/Services.vue'



export default {
  components: {
    BookingAddons,
    BookingServices
  },
  computed: {
    ...mapGetters({
      number_of_guests: 'appointment/number_of_guests',
      appointments: 'appointment/appointments',
      service_id: 'appointment/service_id',
      duration: 'appointment/duration'
    })
  },
  data() {
    return {
      messages: []
    }
  },
  watch: {
    duration(to, from) {
      setTimeout(()=>{
         window.scrollTo({ 
          top:  document.getElementById('booking').offsetTop - 30, 
          behavior: 'smooth' 
        })
      }, 300)
    }
  },
  methods: {
    set(duration) {
      this.$store.commit('appointment/duration', duration)
      this.$store.commit('appointment/service_id', '')
      this.$store.commit('appointment/addon_ids', [])
    }
  }
}


</script>