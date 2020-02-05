<template>
  <section>
    <h3 class="bar">Let's plan your visit</h3>
    <BookingSelectDate  />
    <section class="buttons">
      <nuxt-link to="/" class="btn btn-primary btn-back">
        &lt;&lt; Back
      </nuxt-link>
    </section>
  </section>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import BookingSelectDate from '~/components/booking/SelectDate.vue'


export default {
  components: {
    BookingSelectDate
  }
}

</script>