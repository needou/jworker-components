import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import JworkerComponents from 'jworker-components';
import 'jworker-components/dist/style.css';

const app = createApp(App);

app.use(Antd);
app.use(JworkerComponents);
app.mount('#app');