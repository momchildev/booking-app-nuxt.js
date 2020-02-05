<template>
	<select v-model="number_of_guests">
    <option :value="option" v-for="option in options" :key="option">{{option}}</option>
  </select> 
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    number_of_guests: {
      get() {
        return this.$store.state.appointment.number_of_guests
      },
      set(value) {
        this.$store.commit('appointment/number_of_guests', value)
      }
    }
  },
	data() {
    return {
      options: [1,2,3]
    }
  },
	watch: {
    number_of_guests(to, from) {
      this.$store.commit('appointment/number_of_guests', to)
    }
  }
}
</script>
