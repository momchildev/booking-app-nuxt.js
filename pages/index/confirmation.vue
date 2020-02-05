<template>
  <section class="confirmation">
    <h3 class="bar">Confirm your appointment</h3>
    <section class="appointment">
      <section>
        <label>Date</label>
        <span>{{date|formatDate}}</span>
      </section>
      <section>
        <label>Location</label>
        <span>{{location}}</span>
      </section>
    </section>
    <section class="appointments">
      <section v-for="(appointment, index) in appointments" :key="index">
        <h4 v-if="false">Appointment #{{(index+1)}}</h4>

        <label>Time</label> {{appointment.appointment.Time}}<br/>
        <label>Esthetician</label> {{appointment.appointment.Name}}<br />
        <label>Service</label> {{service(appointment.service_id)}}<br />
        <span v-if="appointment.addon_ids && appointment.addon_ids.length">
          <span v-for="(addon, index) in addons(appointment.addon_ids)" :key="index">
             <label>Add-on</label> {{addon}}<br />
          </span>
        </span>
      </section>
    </section>
    <section class="break promotion">
      <label>Promotion Code</label>
      <div>
        <input type="text" v-model="booking.promotion_code" />
        <button type="button" v-if="false">Apply</button>
      </div>
    </section>
    <section class="break">
      <label>Notes</label>
      <p>If there is anything you would like for us to know prior to your appointment, let us know here.</p>
      <textarea v-model="booking.notes"></textarea>
    </section>
    <section class="break">
      <label>Payment</label>
      <p>
        Enter your credit card to hold this reservation.  You will not be charged until you come in for your appointment.  We only charge your credit card in advance if you cancel within 24 hours of your appointment or are a no-show.
      </p>
      <section>
        <section class="form-row">
          <section class="percent-50">
            <label>Card Number </label>
            <input type="text" data-vv-name="number" v-model="booking.card.number" v-validate="'credit_card'" />
            <small v-show="errors.has('number') && fields.number.touched" class="error">{{ errors.first('number') }}</small>
          </section>
          <section class="group percent-50">
            <section>
              <label>Expiration</label>
              <section class="group">
                <section>
                  <input type="text" data-vv-name="expiration"  v-model="booking.card.expiry.month"  v-validate="'required'" placeholder="MM" size="2" />
                </section>
                <section>
                  <input type="text" data-vv-name="expiration"  v-model="booking.card.expiry.year" v-validate="'required'" placeholder="YY" size="2" />
                </section>
              </section>

               <small v-show="errors.has('expiration')" class="error">{{ errors.first('expiration') }}</small>
            </section>
            <section>
              <label>CVV</label>
              <input type="text" data-vv-name="cvv" v-model="booking.card.cvv" v-validate="'required'" />
              <small v-show="errors.has('expiration')" class="error">{{ errors.first('cvv') }}</small>
            </section>
          </section>
        </section>
        <section class="form-row">
          <section class="group percent-50">
            <section>
              <label>First Name</label>
              <input type="text" data-vv-name="first_name"  v-model="booking.first_name" v-validate="'required'" />
              <small v-show="errors.has('first_name')" class="error">{{ errors.first('first_name') }}</small>
            </section>
            <section>
              <label>Last Name</label>
              <input type="text" data-vv-name="last_name"  v-model="booking.last_name" v-validate="'required'" />
              <small v-show="errors.has('last_name')" class="error">{{ errors.first('last_name') }}</small>
            </section>
          </section>
          <section class="percent-50" v-if="false">
            <label>Billing Address</label>
            <input type="text" data-vv-name="address"  v-model="booking.billing.address" v-validate="'required'" />
            <small v-show="errors.has('address')" class="error">{{ errors.first('address') }}</small>
          </section>
        </section>
        <section class="form-row" v-if="false">
          <section class="group percent-50">
            <section>
              <label>City</label>
              <input type="text" data-vv-name="city"  v-model="booking.billing.city"  v-validate="'required'"/>
              <small v-show="errors.has('city')" class="error">{{ errors.first('city') }}</small>
            </section>
            <section>
              <label>State</label>
              <input type="text" data-vv-name="state"  v-model="booking.billing.state" v-validate="'required'" />
              <small v-show="errors.has('state')" class="error">{{ errors.first('state') }}</small>
            </section>
          </section>
          <section class="percent-50">
            <label>Zip Code</label>
            <input type="text" data-vv-name="zip_code"  v-model="booking.billing.zip_code" v-validate="'required'" />
            <small v-show="errors.has('zip_code')" class="error">{{ errors.first('zip_code') }}</small>
          </section>
        </section>
      </section>
      <p>&nbsp;</p>
      <p>
        By booking this appointment, you confirm that you have read and understand our cancellation and lateness policy. <a href="https://www.silvermirror.com/about-us/faq-facial-bar/" target="_blank">Cancelation Policy</a>.
      </p>

      <section class="buttons">
        <a  class="btn btn-primary btn-continue right" @click="book()">Book Now</a>
        <nuxt-link to="/" class="btn btn-primary btn-continue">Try Again</nuxt-link>
      </section>

      <FormsMessage :messages="messages"  />

      <p>&nbsp;</p>
      <p>&nbsp;</p>

    </section>
  </section>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import FormsMessage from '~/components/forms/elements/Message.vue'
import AlertModal from "~/components/AlertModal";



export default {
  components: {
    FormsMessage
  },
  computed: {
    ...mapGetters({
      date: 'appointment/date',
      location_id: 'appointment/location_id',
      number_of_guests: 'appointment/number_of_guests',
      appointments: 'appointment/appointments',
      user_id: 'appointment/user_id',
    }),
    location () {
      try {
        return this.$store.getters['locations/by_id'](this.location_id).Name
      } catch(error) {
        return 'No location selected'
      }
    },
    time () {
      try {
        return this.appointment.Time
      } catch(error) {
        return 'No time selected.'
      }
    }
  },
  data() {
    return {
      messages: [],
      problems: [],
      booking: {
        card: {
          number: '', // 4242424242424242
          expiry: {
            year: '', //19
            month: '' // 05
          },
          cvv: '' // 123
        },
        first_name: '', // Testing
        last_name: '', // User
        billing: {
          address: '', // 1187 MINUTES Rd.
          city: '', // Beverly Hills
          state: '', // CA
          zip_code: '' // 90201
        },
        promotion_code: '',
        notes: ''
      },

      loadingSubmit: false
    }
  },
  methods: {
    service (service_id) {
      try {
        var service = this.$store.getters['services/by_id'](service_id)
        return service.Name
      } catch(error) {
        return 'No service selected'
      }
    },
    addons (addon_ids) {
      try {
        var addons = []
        addon_ids.forEach((id)=> {
          let addon = this.$store.getters['services/by_id'](id)
          addons.push(addon.Name)
        })
        return addons
      } catch(error) {
        return []
      }
    },
    book() {
      var self = this;
      self.messages = []

      if (this.loadingSubmit) return

      this.$validator.validateAll().then(result => {
        if (result) {
          this.loadingSubmit = true
          self.$nuxt.$loading.start()

          this.$store.dispatch('booking/book', {
            Booking: this.booking
           }).then((bookings)=> {
            console.log("Bookings", bookings)


            let problems = [];
            bookings.forEach(booking => {
              if (booking.Action ==  "Failed") {
                problems.push(booking)
                booking.Messages.string.forEach(message => {
                  self.messages.push({
                    type: 'error',
                    text: `${message}`
                  })
                })
              }
            })

            if (!problems.length) {
              this.$router.push('/confirmed')
            } else {
              self.messages.unshift({
                type: 'error',
                text: 'There were problems with your booking.'
              })
              self.messages.push({
                type: 'error',
                text: `Please call us at (212) 702-8742 and we will help you resolve your issues.`
              })
              this.$modal.show(AlertModal, {
                heading: 'Problems with booking.',
                messages: self.messages,
                callback: () => {

                }
              }, {
                height: 'auto'
              })
            }
            setTimeout(() => self.$nuxt.$loading.finish(), 500)
          }).catch((error)=> {
            self.messages.unshift({
              type: 'error',
              text: 'There were problems with your booking.'
            })
            self.messages.push({
              type: 'error',
              text: `Please call us at (212) 702-8742 and we will help you resolve your issues.`
            })

            this.$modal.show(AlertModal, {
              heading: 'Problems with booking.',
              messages: self.messages,
              callback: () => {

              }
            }, {
              height: 'auto'
            })

            setTimeout(() => {
              self.$nuxt.$loading.finish()
            }, 500)
          })
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loadingSubmit = false
      })
    }
  }
}

</script>
