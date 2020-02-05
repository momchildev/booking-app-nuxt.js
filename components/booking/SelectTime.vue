<template>
  <section>
  	<section>
  		<nav>
  			<a @click="select('morning')" :class="(timeframe=='morning') ? 'selected' : ''">Morning</a>
  			<a @click="select('lunchtime')" :class="(timeframe=='lunchtime') ? 'selected' : ''">Lunchtime</a>
  			<a @click="select('afternoon')" :class="(timeframe=='afternoon') ? 'selected' : ''">Afternoon</a>
  			<a @click="select('evening')" :class="(timeframe=='evening') ? 'selected' : ''">Evening</a>
  		</nav>
  	</section>
    <section class="booking-items" v-if="selected && selected.length>0">
      <a href="javascript: void(0)" v-for="(t, index) in selected" :key="index" @click="appointment(t)" :class="(t==value) ? 'selected' : ''" :data-date="t.Date">
        <strong>{{t.Time}}</strong>
        <span>({{t.Name}})</span>
      </a>
    </section>
    <section class="booking-items" v-else>
      No available booking times
    </section>
  </section>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    timeslots: {
      type: Object,
      required: true,
      default: () => {
        return {
          morning: [],
          lunchtime: [],
          afternoon: [],
          evening:[]
        }
      }
    }
  },
  data() {
    return {
      timeframe: 'morning',
      value: false
    }
  },
  computed: {
    ...mapGetters({
      addon_ids: 'appointment/addon_ids',
    }),
    selected() {
      return _.filter(_.uniq(this.timeslots[this.timeframe]), (o) => {
        var settings = this.$store.getters['staff/settings'](o.ID)
        settings['addon-services'] = _.map(settings['addon-services'], (as) => { return parseInt(as) })

        if (this.addon_ids.length==0) {
          return true;
        } 
        if (settings.status != 'Active') {
          return false;
        }

        var addons = this.addon_ids.every(i => settings['addon-services'].includes(i));

        //console.log(settings['addon-services'], this.addon_ids, addons)
        return addons
      })
    }
  },

  methods: {
    select(timeframe) {
      this.timeframe = timeframe
    },
    appointment(value) {
      this.value = value
      this.$emit('input', value)
    }
  }
}
</script>


<style lang="scss" scoped>


section {
  > section {
    &.booking-items {
      padding-top: 20px;
      display: flex;
      flex-wrap: wrap;
      > a {
        width: 33.33%;
    
        border: solid 1px #D7D7D7;
         
        padding: 20px 30px;


        @media (max-width: 640px) {
          width: 50%;
          padding: 10px;
        }


        text-align: center;

        color: #333;
        font-size: 14px;

        > strong {
          display: block;
        }
        > span {
          font-size: 12px;
        }


        &:hover {
          cursor: pointer;
          text-decoration: none;
          background-color: #eeeeee;
        }

        &.selected {
          background: #c7e5f9;
        }

      }
    }
  }
}

section > nav  {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2%;
}
section > nav  > a {
  background-color: #ECECEC;
  border: solid 1px #D7D7D7;
   
  padding: 20px 30px;
  width: 23%;
  margin-left: 2%;

  @media (max-width: 640px) {
      width: 100%;
  }

  text-transform: uppercase;
  text-align: center;

  cursor: pointer;

  &.selected {
    background-color: #C7E5F9;
  }
}

</style>
