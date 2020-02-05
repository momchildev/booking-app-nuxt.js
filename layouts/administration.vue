<template>
  <article data-layout="administration">
  	<section class="two-column-layout">
      <section>
        <h2 style="padding-left: 15px; padding-bottom: 0; margin-bottom: 0;">Staff</h2>
        <nav>
          <nuxt-link :to="`/administration/staff/${member.ID}/modify`" v-for="member in staff" :key="member.ID" :class="style(member)">
            {{member.Name}}   
          </nuxt-link>
        </nav>
      </section>
      <section>
        <nuxt />
      </section>
    </section>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      staff: 'staff/list'
    })
  },
  methods: {
    style(staff) {
      let style = ''
      let settings = this.$store.getters['staff/settings'](staff.ID)

      style += ` ${settings.status.toLowerCase()}`

      return style
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
    &.nuxt-link-exact-active {
      background: #333;
      color: #fff !important;
      &:hover {
        color: #fff !important;
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



section.select {
	margin: 50px auto;
	width: 80%;
	padding: 20px;

	background: rgba(0,0,0,0.05);
}

section.select >  form {
	padding: 40px;
}

section.select >  form > fieldset{
	display: inline-block;
	width: 30%;
	padding: 1%;
}

section.select >  form  > fieldset.buttons {
	text-align: center;
	width: 100%;
	padding-top: 30px;
}


section.two-column-layout {
	display: flex;
}


section.two-column-layout > section > form > fieldset > fieldset {
	padding: 10px;
	margin-bottom: 20px;
}

section.two-column-layout > section {
	width: 70%;
}

section.two-column-layout > section:nth-of-type(1) {
	width: 25%;
}

section.two-column-layout > section > nav > a {
	display: block;
	padding: 3px;
	color: #ccc;
}

section.two-column-layout > section > nav > a.on {
	color: #fff;
}


fieldset.checkboxes > label {
	display: block;
	padding: 3px;
	color: #ccc;
}

fieldset.staff-edit {
	display: none;
}

</style>