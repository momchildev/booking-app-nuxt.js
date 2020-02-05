<template>
	<form method="POST" v-if="staff">
	  <fieldset>
	    <fieldset>
	      <h2>Manage Staff Member ({{staff.Name}}) <span :class="`status ${settings.status.toLowerCase()}`">{{settings.status}}</span></h2>
	    </fieldset>
	    <fieldset>
	      <legend>Set the Staff Members Status</legend>
	      <select name="status" v-model="settings.status">
	        <option>Active</option>
	        <option>Disabled</option>
	      </select>
	    </fieldset>
  		<fieldset class="checkboxes">
	      <legend>Select locations</legend>
	      <Checkboxes name="locations" v-model="settings.locations" :checkboxes="locations" :values="settings.locations" v-validate.disable="'required'" />
	    </fieldset>	   
	    <fieldset class="checkboxes">
	      <legend>Select addon-services</legend>
	      <Checkboxes name="addons" v-model="settings['addon-services']" :checkboxes="addons" :values="settings['addon-services']" v-validate.disable="'required'" />
	    </fieldset>
	    <fieldset class="buttons">
	      <button type="button" @click="save()">Update / Save</button>
	    </fieldset>
	  </fieldset>
	</form>
</template>
<style lang="scss" scoped>


.status {
	padding: 10px 20px;

	background: rgba(0,0,0,0.2);
	color: #333;
	font-size:30%;
	font-family: "Helvetica";
	text-transform: uppercase;
	&.active {
		background: #00cc00;
	}
}

</style>

<script>
import { mapGetters } from 'vuex'
import Checkboxes from '~/components/forms/Checkboxes'

export default {
  layout: 'administration',
  components: {
    Checkboxes
  },
  data() {
    return {
      selected_staff: false
    }
  },
  computed: {
    staff() {
    	return this.$store.getters['staff/by_id'](this.$route.params.id)
    },
    settings() {
    	return this.$store.getters['staff/settings'](this.$route.params.id)
    },
    addons() {
      return _.map(_.filter(this.$store.getters['services/list'], { ProgramID: 4 }), (o) => {
        return { value: o.ID, name: o.Name }
      })
    },
    locations() {
      return _.map(this.$store.getters['locations/list'], (o) => {
        return { value: o.ID, name: o.Name }
      })
    }
  },
  methods: {
   	save() {
   		var self = this
   		console.log(self.settings)
   		this.$store.dispatch('staff/save', { 
   			id: this.$route.params.id,  
   			settings: self.settings
   		}).then(()=> {

   		})
   	}
  }
}


</script>