<template>
  <article>
    <a @click="$emit('close')" data-rel="close"><font-awesome-icon icon="times" /></a>
    <section>
      <h2 v-if="heading">{{heading}}</h2>
      <p v-if="message">
        {{message}}
      </p>
      <p v-if="messages" v-for="message in messages">
        {{message.text}}
      </p>
    </section>
  </article>
</template>

<script>
import $ from 'jquery'

export default {
  props: ['message', 'messages', 'heading'],
  data () {
    return {
    }
  },
  methods: {
    
  }
}
</script>
