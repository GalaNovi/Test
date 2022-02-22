import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import router from './router';
import store from './store';
import App from './App.vue';
import 'primevue/resources/themes/saga-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue);

app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('InputNumber', InputNumber);

app.mount('#app');
