import Vue from 'vue'
import moment from 'moment'

moment.fn.fromNowOrNow = function (a) {
    if (Math.abs(moment().diff(this)) < 1000) { // 1000 milliseconds
        return 'just now';
    }
    return this.fromNow(a);
}

Vue.filter('capitalize', val => val.toUpperCase())
Vue.filter('lowercase', val => val.toLowerCase())
Vue.filter('length', val => val.length)
Vue.filter('truncate', function(string, value) {
    return string.substring(0, value) + '…';
})


Vue.filter('removeLastName', function(string) {
  var names = string.split(" ");
  return `${names[0]} ${names[1][0]}.`
})

Vue.filter('formatAddress', function(string) {
    return string.replace(/,/, ",<br />")
})

Vue.filter('day', function(value) {
  if (value) {
    return moment(String(value)).format('DD')
  }
})

Vue.filter('month', function(value) {
  if (value) {
    return moment(String(value)).format('MMM')
  }
})

Vue.filter('year', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY')
  }
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('ddd MMMM Do, Y')
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mmA')
  }
})

Vue.filter('formatNiceDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do, Y @ hh:mm')
  }
})

Vue.filter('formatFromNow', value => {
  return (value) ? moment(String(value)).fromNowOrNow() : 'Unknown'
})

Vue.filter('formatTimestamp', function(value) {
  if (value) {
    return moment(value).format('MM/DD/YYYY hh:mmA')
  }
})


