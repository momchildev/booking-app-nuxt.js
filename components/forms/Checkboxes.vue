<template>
  <div class="checkboxes">
    <span v-for="(checkbox, index) in checkboxes" @click="toggle(String(checkbox.value))" :class="selected_checkboxes.indexOf(String(checkbox.value))>=0 ? 'active' : ''" :key="index">
      <span></span> {{checkbox.name}}
    </span>
  </div>
</template>


<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    checkboxes: {
      type: Array,
      default: () => { return [] }
    },
    values: {
      type: Array,
      default:  () => { return [] }
    }
  },
  $_veeValidate: {
    // value getter
    value () {
      return this.selected_checkboxes;
    },
    // name getter
    name () {
      return this.name;
    }
  },
  data() {
    return {
      selected_checkboxes: []
    }
  },
  mounted() {
    this.selected_checkboxes = (this.values) ? Object.assign([], this.values) : []
  },
  watch:{
    selected_checkboxes(from, to) {
      this.$emit('input', this.selected_checkboxes)
    }
  },
  methods: {
    toggle(checkbox) {
      var index = this.selected_checkboxes.indexOf(checkbox);
      if (index ==-1) {
        this.selected_checkboxes.push(checkbox)
      } else {
        this.selected_checkboxes.splice(index, 1);
      }
    },
    clear() {
      this.selected_checkboxes = []
    }
  }
}
</script>


<style lang="scss" scoped>

  .checkboxes {
    > span {
      display: inline-block;
        margin: 10px;
      margin-right: 35px;
      margin-left: 0;
     font-size: 16px;

      > span {
        position: relative;
        bottom: -6px;
        display: inline-block;
        background: rgba(0,0,0,0.1);
        color: rgba(255,255,255,0.8);
        border: solid 1px rgba(255,255,255,0.8);
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }

      &.active {
        > span {
          background: rgba(0,0,0,0.8);
        }
      }
    }
      
  }

</style>