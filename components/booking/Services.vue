<template>
  <section>
    <div :data-ID="service.ID" v-for="service in services" :key="service.ID" v-if="service.DefaultTimeLength==parseInt(duration)" :class="(service.ID==service_id) ? 'active' : ''" @click="set(service.ID)">
      <div>
        <img :src="`/booking/images/icons/${slugify(service.Name)}.png`" />
        <span v-if="service.price">${{service.price}}</span>
      </div>

      <span v-if="false">/booking/imgaes/icons/{{slugify(service.Name)}}.png</span>
      <h4>{{service.Name}} </h4>
      <small v-if="false">{{service.DefaultTimeLength}} MINUTES </small> 
    </div>
  </section>
</template>

<style lang="scss" scoped>
  section {
    display: flex;
    flex-wrap: wrap;
    margin-left: -2.33%;

    > div {
 
      width: 31%;
      margin-left: 2.33%;
      margin-bottom: 2.33%;

      @media (max-width: 640px) {
        width: 47%;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;
        padding: 20px;
        background: #e1fbed;
        min-height:150px;

        &:after {
          padding-top: 100%;
        }
        > em {

        }
        > span {
          position: absolute;
          font-weight:bold;
          right: 20px;
          bottom: 20px;

          @media (max-width: 640px) {
            right: 10px;
            bottom: 10px;
          }
        }
      }
      >h4 {
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 0px;
        text-align: center;
        font-weight: bold;
      }
      &:hover, &.active {
        cursor: pointer;
        > div {
          box-shadow: 8px 8px #d7eaff;
        }
        > h4 {
          color: #5fa7f0;
        }
      }
    }
   
  }
</style>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    duration: {
      type: Number,
      required: true
    }
  },
	computed: {
		...mapGetters({
			services: 'services/regular',
      addon_ids: 'appointment/addon_ids',
      durations: 'appointment/duration'
		}),
    service_id: {
      get() {
        return this.$store.state.appointment.service_id
      },
      set(value) {
        this.$store.commit('appointment/service_id', value)
      }
    }
	},
  methods: {
    slugify(text) {
      return text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
    },
    set(value) {
      this.$store.commit('appointment/service_id', value)
    }
  }
}
</script>
