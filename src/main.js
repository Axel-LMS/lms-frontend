import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import 'aos/dist/aos.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";
import App from './App.vue'
import router from './router'
import './index.css'
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')
