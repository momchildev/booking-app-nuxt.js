<template>
  <article>

  </article>
</template>

<style lang="scss" scoped>


</style>


<script>
import { mapGetters } from 'vuex'

export default {
	layout: 'administration',
	mounted() {
		this.$nextTick(() => {
    	this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
	}
}


</script>