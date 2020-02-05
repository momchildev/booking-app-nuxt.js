<template>
  <div v-if="messages.length">
    <div :class="`message ${msg.type}`" v-for="(msg, index) in messages" :key="index">
      <font-awesome-icon icon="check" />
      {{msg.text}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    var self = this;

    /*
    setTimeout(()=>{
      self.messages = []
    }, 5000)
    */
  }
}
</script>


<style lang="scss" scoped>
.message {
  font-size: 16px;
  &.error {
    color: #cc0000;
  }
}
</style>