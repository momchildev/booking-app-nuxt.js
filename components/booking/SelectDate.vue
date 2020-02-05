<template>
	<section style="display: flex;">
  	<full-calendar :config="first_calendar"  />
    <full-calendar :config="second_calendar"  />
  </section>
</template>


<style lang="scss" scoped>

section {
  display: flex;


  > div {
    width: 100%;
    &:first-of-type {
      margin-right: 10px;
    }
    &:last-of-type {
      margin-left: 10px;
    }
  }

  @media (max-width: 640px) {
    flex-wrap: wrap;
    > div {
      margin: 0 !important;
    }
  }
}

</style>

<script>
import { mapGetters } from 'vuex'

import moment from 'moment'


export default {
  computed: {
    ...mapGetters({
      date: 'appointment/date'
    })
  },
	data() {
		var self = this;
		return {
      first_calendar: {
        height: 350,
        defaultView: 'month',
        selectable: true,
        header: {
          left:   'prev',
          center: 'title',
          right:  'next'
        },
        dayClick: function (date, jsEvent, view) {
          // console.log("IS PAST", event.target.parentElement.classList, event.target.parentElement.classList.contains("fc-past"))
          if (!( event.target.parentElement.classList.contains("fc-past") ) ) {
            self.$store.commit('appointment/date', date.format())
            self.$router.push('/services')
          }
        }
      },
      second_calendar: {
        defaultDate: moment(self.date).add(1, 'months'),
        height: 350,
        defaultView: 'month',
        selectable: true,
        header: {
          left:   'prev',
          center: 'title',
          right:  'next'
        },
        dayClick: function (date, jsEvent, view) {
          //console.log("IS PAST", event.target.parentElement.classList, event.target.parentElement.classList.contains("fc-past"))
          if (!( event.target.parentElement.classList.contains("fc-past") ) ) {
            self.$store.commit('appointment/date', date.format())
            self.$router.push('/services')
          }
        }
      }
    }
	}
}
</script>

