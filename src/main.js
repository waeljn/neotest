import { GOOGLE_API_KEY } from "./.env.local";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import router from "./router";
import { Plugin as VueFragment } from "vue-fragment";
import firebase from "firebase";
import { FIREBASE_CONFIG } from "./constants";
import VueI18n from "vue-i18n";
import messages from "./constants/locales";

firebase.initializeApp(FIREBASE_CONFIG);
Vue.use(VueI18n);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: "fr", // set locale
  messages, // set locale messages
});

Vue.use(VueFragment);
Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
    libraries: "places",
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
