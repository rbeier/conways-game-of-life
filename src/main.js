// create a new vue root instance and render the main Vue File
import Vue from 'vue'
import App from './App'

// import buefy
// import Buefy from 'buefy';
//
// Vue.use(Buefy);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

