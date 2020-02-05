<template>
  <section v-if="loading">
    <cube loading="loading" color="#000">

    </cube>
  </section>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
section {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(255, 255, 255, 0.7);
 
  > div {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;

    font-size: 30px;
    font-family: sans-serif;
  }
}
</style>
