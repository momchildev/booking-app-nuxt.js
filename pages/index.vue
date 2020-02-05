<template>
  <article>
    <form>
      <nuxt-child  :keep-alive-props="{ exclude: ['modal'] }" />
    </form>
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {

  data() {
    return {
      messages: []
    }
  },
  mounted() {
    var self = this;
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event)
    {
      history.pushState(null, document.title, location.href);
      self.flow = false
      self.date = ''
    });
  }
}
</script>

