import { createApp } from 'vue';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router';
import store from './store';
import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('InputNumber', InputNumber);

app.mount('#app');
