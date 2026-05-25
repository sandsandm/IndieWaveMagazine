<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])

// Переключение между логином и регистрацией
const isLogin = ref(true)

// Данные формы
const form = ref({
  username: '',
  email: '',
  password: '',
  remember: false,
})

// Состояния
const submitted = ref(false)
const error = ref('')

function toggleMode() {
  isLogin.value = !isLogin.value
  error.value = ''
  form.value = { username: '', email: '', password: '', remember: false }
}

function submit() {
  error.value = ''

  // Валидация
  if (!form.value.email || !form.value.password) {
    error.value = 'Fill all required fields'
    return
  }

  if (!isLogin.value && !form.value.username) {
    error.value = 'Username is required'
    return
  }

  if (!form.value.email.includes('@')) {
    error.value = 'Enter a valid email'
    return
  }

  // Имитация отправки
  if (isLogin.value) {
    // Логин
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === form.value.email && u.password === form.value.password)
    if (user) {
      if (form.value.remember) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
      submitted.value = true
    } else {
      error.value = 'Wrong email or password'
    }
  } else {
    // Регистрация
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === form.value.email)
    if (exists) {
      error.value = 'User with this email already exists'
      return
    }
    const newUser = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    submitted.value = true
  }
}

function close() {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <!-- Крестик -->
        <button class="modal-close" @click="close">&times;</button>

        <!-- Успех -->
        <template v-if="submitted">
          <div class="success-state">
            <h2 class="anton">{{ isLogin ? 'WELCOME BACK!' : 'REGISTERED!' }}</h2>
            <p class="roboto">
              {{ isLogin ? 'You have successfully logged in.' : 'Your account has been created.' }}
            </p>
            <button class="submit-btn" @click="close">CLOSE</button>
          </div>
        </template>

        <!-- Форма -->
        <template v-else>
          <p class="ibm-sans-bold subtitle">
            {{ isLogin ? 'welcome back!!' : 'don\'t have an account?' }}
          </p>
          <h2 class="anton title">{{ isLogin ? 'LOGIN' : 'REGISTER' }}</h2>

          <form class="modal-form" @submit.prevent="submit">
            <template v-if="!isLogin">
              <label class="label-for roboto" for="username">Username</label>
              <input
                v-model="form.username"
                class="reg-input"
                type="text"
                id="username"
                placeholder="your username"
              />
            </template>

            <label class="label-for roboto" for="email">E-mail</label>
            <input
              v-model="form.email"
              class="reg-input"
              type="email"
              id="email"
              placeholder="your@email.com"
            />

            <label class="label-for roboto" for="pwd">Password</label>
            <input
              v-model="form.password"
              class="reg-input"
              type="password"
              id="pwd"
              placeholder="········"
            />

            <!-- Запомнить меня (только для логина) -->
            <div v-if="isLogin" class="remember-row">
              <input v-model="form.remember" id="remember" type="checkbox" />
              <label for="remember" class="ibm-sans-bold">Remember me</label>
            </div>

            <!-- Ошибка -->
            <p v-if="error" class="error-text roboto">{{ error }}</p>

            <button type="submit" class="submit-btn">
              {{ isLogin ? 'Login' : 'Register' }}
            </button>
          </form>

          <!-- Переключение -->
          <button class="toggle-link roboto" @click="toggleMode">
            {{ isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login' }}
          </button>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.modal-container {
  position: relative;
  background: linear-gradient(180deg, #171815 0%, #303159 100%);
  border-radius: 24px;
  padding: 50px 45px 40px;
  max-width: 520px;
  width: 90%;
  color: #fff;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: #999;
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #E46C56;
}

.subtitle {
  text-align: center;
  color: #9A9A9A;
  margin: 0 0 4px;
  font-size: 16px;
}

.title {
  text-align: center;
  font-size: 2.5rem;
  margin: 0 0 30px;
  color: #fff;
  letter-spacing: 0.06em;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-for {
  font-size: 16px;
  color: #bbb;
  margin-top: 10px;
}

.reg-input {
  width: 100%;
  height: 52px;
  border-radius: 12px;
  background: rgba(217, 217, 217, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 16px;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.reg-input:focus {
  border-color: #E46C56;
}

.reg-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.remember-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.remember-row label {
  font-size: 14px;
  color: #bbb;
  cursor: pointer;
}

.remember-row input[type='checkbox'] {
  accent-color: #E46C56;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.error-text {
  color: #E46C56;
  font-size: 14px;
  margin: 8px 0 0;
  text-align: center;
}

.submit-btn {
  margin-top: 24px;
  padding: 14px;
  width: 100%;
  border: none;
  border-radius: 54px;
  background: #E46C56;
  color: #fff;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #303159;
}

.toggle-link {
  display: block;
  margin-top: 20px;
  background: none;
  border: none;
  color: #9A9A9A;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  text-decoration: underline;
  transition: color 0.2s;
}

.toggle-link:hover {
  color: #E46C56;
}


.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
}
.success-state h2 {
  margin: 0 0 8px;
  color: #fff;
}

.success-state p {
  color: #9A9A9A;
  margin: 0 0 24px;
}
</style>