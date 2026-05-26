

<script setup>
import { ref } from 'vue'

const modal = ref({
  isOpen: false,
  type: '',
  data: {}
})

const modalTitle = ref('')
const modalMessage = ref('')
const copied = ref(false)
const copyBtnText = ref('')

function openModal(type, data) {
  modal.value = { isOpen: true, type, data }
  copied.value = false

  if (type === 'email') {
    modalTitle.value = 'Copy email'
    modalMessage.value = `Copy address ${data.email} to clipboard?`
    copyBtnText.value = 'Copy'
  } else if (type === 'social') {
    modalTitle.value = `Go to ${data.platform}`
    modalMessage.value = `You are going to external site:\n${data.platform}\n${data.url}`
    copyBtnText.value = 'Go'
  }
}

function closeModal() {
  modal.value.isOpen = false
  copied.value = false
}

function confirmAction() {
  if (modal.value.type === 'email') {
    navigator.clipboard.writeText(modal.value.data.email).then(() => {
      copied.value = true
      copyBtnText.value = 'Copied!'
    })
  } else if (modal.value.type === 'social') {
    window.open(modal.value.data.url, '_blank')
    closeModal()
  }
}

const socials = [
  { platform: 'Instagram', url: 'https://instagram.com/indiewavemag' },
  { platform: 'Telegram', url: 'https://t.me/mxmaesandd' },
  { platform: 'Spotify', url: 'https://open.spotify.com/user/ullkd3y1pycrsnfgim69npeqq' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__noise"></div>

    <div class="footer__inner">
      <div class="footer__grid">
        <div class="footer__col">
          <h4 class="footer__heading anton">NAVIGATION</h4>
          <RouterLink to="/">Main</RouterLink>
          <RouterLink to="/articles">Articles</RouterLink>
          <RouterLink to="/history">History</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading anton">CONTACT</h4>
          <a href="mailto:hello@indiewavemag.com" @click.prevent="openModal('email', { email: 'hello@indiewavemag.com' })">
            hello@indiewavemag.com
          </a>
          <button
            v-for="s in socials"
            :key="s.platform"
            class="footer__contact-btn"
            @click="openModal('social', s)"
          >
            {{ s.platform }}
          </button>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading anton">SUBSCRIBE</h4>
          <p class="footer__text roboto">
            Get weekly drops of new indie releases, editor picks and live culture notes.
          </p>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading anton">ABOUT</h4>
          <p class="footer__text roboto">
            Independent magazine focused on indie music, visual culture and editorial noise.
          </p>
        </div>
      </div>

      <div class="footer__bottom">
        <span class="footer__copyright roboto">© 2026 Indie Wave Magazine</span>
        <span class="footer__tag anton">independent music / visual noise / editorial culture</span>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="modal.isOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-container">
            <div class="modal-header">
              <h3 class="modal-title">{{ modalTitle }}</h3>
              <button class="modal-close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
              <p>{{ modalMessage }}</p>
            </div>
            <div class="modal-footer">
              <button class="modal-btn modal-btn-cancel" @click="closeModal">Cancel</button>
              <button
                class="modal-btn modal-btn-confirm"
                :class="{ 'modal-btn-copied': copied }"
                @click="confirmAction"
                :disabled="copied"
              >
                {{ copied ? 'Copied!' : copyBtnText }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

.footer__noise {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 18px 18px;
  pointer-events: none;
  mix-blend-mode: screen;
}

.footer__inner {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 90px 40px 30px;
  color: #ffffff;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  padding: 34px 0 42px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__heading {
  margin: 0 0 6px;
  color: #e46c56;
  font-size: 19px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.footer__col a {
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 16px;
  transition: 0.25s ease;
}

.footer__col a:hover {
  color: #e46c56;
  transform: translateX(4px);
}

.footer__text {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.65;
}

.footer__contact-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.88);
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: 0.25s ease;
  width: fit-content;
}

.footer__contact-btn:hover {
  color: #E46C56;
  transform: translateX(4px);
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-top: 24px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer__tag {
  color: #ffffff;
}

@media (max-width: 1100px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .footer__inner {
    padding: 64px 20px 24px;
  }

  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom {
    flex-direction: column;
  }

  .footer__title {
    transform: none;
  }
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: #1d1e34;
  border-radius: 16px;
  max-width: 440px;
  width: 90%;
  padding: 28px 32px;
  color: #fff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  margin: 0;
  font-size: 1.4rem;
  color: #E46C56;
  font-family: Anton, sans-serif;
  letter-spacing: 0.06em;
}

.modal-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #E46C56;
}

.modal-body {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 24px;
  word-break: break-word;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  transition: all 0.2s;
}

.modal-btn-cancel {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
}

.modal-btn-cancel:hover {
  background: rgba(255, 255, 255, 0.08);
}

.modal-btn-confirm {
  background: #E46C56;
  color: #fff;
}

.modal-btn-confirm:hover {
  background: #c94a35;
}

.modal-btn-copied {
  background: #2ecc71 !important;
  cursor: default;
}

/* Анимация */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* ===== АДАПТИВ МОДАЛКИ ===== */
@media (max-width: 600px) {
  .modal-container {
    max-width: 95%;
    width: 95%;
    padding: 20px 16px;
    border-radius: 14px;
  }

  .modal-title {
    font-size: 1.2rem;
  }

  .modal-close {
    font-size: 24px;
  }

  .modal-body {
    font-size: 0.9rem;
    margin-bottom: 18px;
  }

  .modal-footer {
    flex-direction: column-reverse;
    gap: 8px;
  }

  .modal-btn {
    width: 100%;
    padding: 12px;
    text-align: center;
    font-size: 15px;
    border-radius: 10px;
  }
}

@media (max-width: 380px) {
  .modal-container {
    padding: 16px 12px;
    border-radius: 12px;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .modal-body {
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .modal-btn {
    padding: 10px;
    font-size: 14px;
  }
}
</style>