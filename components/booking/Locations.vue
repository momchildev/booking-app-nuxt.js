<template>
  <select v-model="location_id">
    <option v-for="location in locations" :key="location.ID" :value="location.ID" v-if="location.PostalCode">
      {{location.Name}}
    </option>
  </select> 
</template>




<script>
/*

<ul class="locations">
    <li v-for="location in locations" :key="location.ID" v-if="location.PostalCode" @click="select(location.ID)" :class="(value==location.ID ? 'selected': '')">
      <strong>{{location.Name}}</strong>
      <small>{{location.City}}, {{location.PostalCode}}</small>
    </li>
  </ul>

*/
import { mapGetters } from 'vuex'


export default {
	computed: {
		...mapGetters({
			locations: 'locations/list'
		}),
    location_id: {
      get() {
        return this.$store.state.appointment.location_id
      },
      set(value) {
        this.$store.commit('appointment/location_id', value)
      }
    }
	},
  watch: {
    location_id(to, from) {
      this.$store.commit('appointment/location_id', to)
    }
  }
}
</script>

<style lang="scss" scoped>

ul.locations {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
  flex-wrap: wrap;
	margin-left: -5px;
	> li {
		border: solid 2px rgba(0,0,0,0.5);
		padding: 20px;
		margin: 5px;

    width: 50%;
    @media (max-width: 778px) {
      width: 100%;
    }
		> strong {
			display: block;
		}
		opacity: 0.5;
		&.selected {
			opacity: 1;
		}
		&:hover {
			cursor: pointer;
		}
	}
}

</style>
