/**
 * Plugin to format date in the Vue components
 * Usage only inside <template>: {{ value | date }}
 */

import Vue from 'vue'

const dateFilter = Vue.filter('date', function(date) {
  const formatedDate = new Date(date)

  return `${formatedDate.toLocaleString('en-US', {
    month: 'short'
  })} ${formatedDate.getDate()}, ${formatedDate.getFullYear()}`
})

Vue.use(dateFilter)
