<template>
  <section>
    <div :data-id="addon.ID" v-for="addon in addons" :key="addon.ID" :class="(addon_ids.indexOf(addon.ID)>=0) ? 'active' : ''" @click="set(addon.ID)">
      <div>
        <h4>{{addon.Name}}</h4>
        <small v-if="false">{{addon.DefaultTimeLength}} MINUTES </small> 
        <span v-if="addon.price">${{addon.price}}</span>
      </div>
    </div>
	</section> 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected: []
    }
  },
  computed: {
    ...mapGetters({
      services: 'services/regular',
      service_id: 'appointment/service_id',
      //addon_ids: 'appointment/addon_ids'
    }),
    addons() {
      return this.$store.getters['services/addons'](this.service_id) 
    },
    addon_ids: {
      get() {
        return this.$store.getters['appointment/addon_ids']
      },
      set(values) {
        this.$store.commit('appointment/addon_ids', values)
      }
    }
  },
  created() {
    this.selected = this.addon_ids
  },
  methods: {
    set(addon) {
      var index = this.addon_ids.indexOf(addon);
      if (index ==-1) {
        this.addon_ids.push(addon)
      } else {
        this.addon_ids.splice(index, 1);
      }
      console.log("SETTING ADDON IDS", this.addon_ids)
      //this.$store.commit('appointment/addon_ids', this.addon_ids)
    }
  }
}
</script>


<style lang="scss" scoped>
  section {
    display: flex;
    flex-wrap: wrap;
     box-sizing: border-box;
     margin-left: -2%;

    @media (max-width: 640px) {
      margin-left: -4%;
    }
    > div {
      margin-left: 2%;
      margin-bottom: 2%;
      width: 18%;

      @media (max-width: 640px) {
        width: 46%;
        margin-bottom: 4%;
        margin-left: 4%;
      }

      
      > div {
        position: relative;
        padding: 20px;
        background: #fcf4d1;
        min-height: 150px;
        >h4 {
          font-size: 14px;
          margin-top: 0px;
          font-weight: bold;
          word-wrap: break-word;
        }
        > small {
          display: block;
          margin-bottom: 20px;
        }
        > span {
          position: absolute;
          font-weight:bold;
          right: 0;

          bottom: 20px;
          left: 20px;
        }
      }
    
      &:hover, &.active {
        cursor: pointer;
        > div {
          box-shadow: 8px 8px #d7eaff;
          > h4 {
            color: #5fa7f0;
          }
        }
        
      }
    }
   
  }
</style>