import '@gouvfr/dsfr/dist/core/core.main.min.css'
import '@gouvfr/dsfr/dist/component/component.main.min.css'
import '@gouvfr/dsfr/dist/utility/utility.main.min.css'
import '@gouvminint/vue-dsfr/styles'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDsfr from '@gouvminint/vue-dsfr'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueDsfr)

app.mount('#app')
