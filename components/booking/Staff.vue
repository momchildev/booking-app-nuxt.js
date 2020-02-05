<template>
	<select v-model="staff_id">
    <option value="">Any Esthetician</option>
    <option :value="member.ID" v-for="member in staff" :key="member.ID">
    	{{member.Name|removeLastName}}
    </option>
  </select> 
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      location_id: 'appointment/location_id'
    }),
    staff() {
      return this.$store.getters['staff/by_location'](this.location_id)
    },
    staff_id: {
      get() {
        return this.$store.state.appointment.staff_id
      },
      set(value) {
        this.$store.commit('appointment/staff_id', value)
      }
    }
  },
  watch: {
    staff_id(to, from) {
      this.$store.commit('appointment/staff_id', to)
    }
  }
}
</script>
