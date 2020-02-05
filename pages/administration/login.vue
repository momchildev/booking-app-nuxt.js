<template>
  <section class="login">
    <form method="POST">
      <h2>Login for access</h2>
    
      <p class="error" v-if="message">{{message}}</p>
    
      <fieldset>
        <input type="password" name="password" v-model="password" value="mirror1209" placeholder="Enter your password" />
      </fieldset>
      <fieldset class="buttons">
        <button type="button" @click="login()">Login</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
 layout: 'login',
 middleware: 'no-auth',
 data() {
  return {
    message: false,
    password: ''
  }
 },
 mounted() {
   this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
 },
 methods: {
    login() {
      this.$store.dispatch('auth/login', { password: this.password }).then(()=>{
        this.$router.push('/administration')
      }).catch((message) => {
        this.message = message
      })
    }
 }
}
</script>



<style lang="scss">


body {
  padding: 30px;
  font-family: "Verdana", sans-serif;
}

body, article {
  position: relative;
  width: 100%;
  height: 100%;
}

form, fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

nav {
  > a {
    display: block;
    padding: 5px 15px !important;
    &.disabled {
      color: #aaa;
      &:hover {
        color: #bbb;
      }
    }
    &.active {
      color: #333 !important;
    }
    &.selected {
      background: #333;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}

SELECT {
  -webkit-appearance: none; 
   -moz-appearance: none;
   appearance: none; 
}

INPUT[type=text],
INPUT[type=password],
SELECT,
button {
  border: none;
  background: rgba(0,0,0,0.05);
  color: #333;

  padding: 10px;
  font-size: 16px;

  width: 100%;
  margin-bottom: 10px;
}

INPUT[type=checkbox] {
  margin-right: 10px;
}

button  {
    background: rgba(0,0,0,0.6);
    color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}

section.login {
  padding: 30px;
  position: absolute;
  max-width: 500px;
  width: 100%;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background: rgba(0,0,0,0.05);
}




</style>