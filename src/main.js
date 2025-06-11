import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './input.css';
import '../dist/output.css';

import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import GlobalComponents from './plugins/global-components.js';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueGoodTablePlugin);
app.use(GlobalComponents);

import './style.scss';
app.mount('#app');
