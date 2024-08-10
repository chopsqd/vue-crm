import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import {firebaseConfig} from "@/config";

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

let vueInstance;

onAuthStateChanged(auth, () => {
  if (!vueInstance) {
    vueInstance = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
