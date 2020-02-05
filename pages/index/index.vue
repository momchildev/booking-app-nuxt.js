<template>
  <section>
    <h3 class="bar">Let's get started!</h3>
    <section class="flex">
      <label>Select location</label>
      <BookingLocations />
    </section> 
    <section class="flex">
      <label>Number of Guests</label>
      <BookingNumberOfGuests />
    </section>
    <section class="flex" v-if="number_of_guests == 1">
      <label>Esthetician</label>
      <BookingStaff  />
    </section>

    <section class="buttons">
      <nuxt-link to="/date" class="btn btn-primary btn-continue right">
        Continue
      </nuxt-link>
    </section>
  </section>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'

import BookingLocations from '~/components/booking/Locations.vue'
import BookingNumberOfGuests from '~/components/booking/NumberOfGuests.vue'
import BookingStaff from '~/components/booking/Staff.vue'


export default {
  components: {
    BookingLocations,
    BookingNumberOfGuests,
    BookingStaff
  },
  computed: {
    ...mapGetters({
      number_of_guests: 'appointment/number_of_guests',
      user_id: 'appointment/user_id',
    })
  },
  mounted() {
    this.$store.commit('appointment/reset')
  }
}

</script>