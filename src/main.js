import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import "../public/css/style.css";
import "../public/css/fontawesome-all.min.css";
import CKEditor from '@ckeditor/ckeditor5-vue2';
import VueTelInput from 'vue-tel-input';
import VueSimpleAlert from "vue-simple-alert";
Vue.use(CKEditor);
Vue.use(VueTelInput);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')