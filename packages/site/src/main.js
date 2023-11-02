import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import JworkerComponents from 'jworker-components';
import 'jworker-components/dist/style.css';

createApp(App)
    .use(JworkerComponents)
    .mount('#app')
