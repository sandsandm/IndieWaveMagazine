import { createApp } from 'vue'      // 1. импортируем функцию создания приложения
import { createPinia } from 'pinia'  // 2. импортируем функцию создания хранилища
//import piniaPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'        // 4. импортируем настройки маршрутов
import App from './App.vue'          // 5. импортируем корневой компонент

const app = createApp(App)           // 6. создаём приложение
const pinia = createPinia()          // 7. создаём хранилище
//pinia.use(piniaPersistedstate)       // 8. подключаем плагин к хранилищу

router.isReady().then(() => {
  const redirect = sessionStorage.getItem('redirect')
  if (redirect) {
    sessionStorage.removeItem('redirect')
    router.push(redirect)
  }
})
app.use(pinia)    //  Pinia
app.use(router)   // Vue Router
app.mount('#app')