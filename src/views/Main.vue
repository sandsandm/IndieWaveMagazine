<script setup>
import { ref, computed, watch } from 'vue'

import { useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
const store = useArticlesStore()
import EditorsChoice from '@/components/EditorsChoice.vue'
import PopularArticles from '@/components/PopularArticles.vue'
import NewArticles from '@/components/NewArticles.vue'
import MarqueeText from '@/components/marqueeText.vue'
import OrangeButton from '@/components/OrangeButton.vue'
import SubscriptionForm from '@/components/SubscriptionForm.vue'
import TagCloud from '@/components/TagCloud.vue'


const router = useRouter()
const searchQuery = ref('')

function goToSearch() {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ path: '/articles', query: { q } })
  }
}
import AuthModal from '@/components/AuthModule.vue'
const showAuth = ref(false)

// Проверяем, есть ли залогиненный пользователь
const currentUser = computed(() => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null')
})

const isLoggedIn = computed(() => currentUser.value !== null)
</script>
<template>
  <section class="main">
    <div class="main-content">
      <div class="main-top">
        <div class="main__search">
          <button class="main__search-btn" @click="goToSearch">
            <img src="@/assets/images/search.png" alt="Search" />
          </button>
          <input
            v-model="searchQuery"
            class="main__search-input"
            type="text"
            name="search"
            id="main-search"
            placeholder="Search"
            @keyup.enter="goToSearch"
          />
        </div>
        <div class="profile">
          <RouterLink v-if="isLoggedIn" to="/account" class="login-link">
            <img src="@/assets/images/LOGIN.png" alt="" />
          </RouterLink>
          <a v-else href="#" @click.prevent="showAuth = true">
            <img src="@/assets/images/LOGIN.png" alt="" />
          </a>
          <AuthModal v-if="showAuth" @close="showAuth = false" />
        </div>
      </div>
      <div class="main-bottom ibm-mono">
        <h1>INDIE WAVE MAGAZINE</h1>
        <img class="line-main" src="@/assets/images/line.png" alt="" />
        <h5 class="main__under-title roboto">Stories from a world full of creative</h5>
      </div>
    </div>
  </section>
  <section class="choice gradient">
    <EditorsChoice></EditorsChoice>
  </section>
  <section class="new-articles">
    <div class="new-articles-container">
      <h4 class="ibm-mono">NEW ARTICLES</h4>
      <div class="new-articles__content">
        <div class="new-articles__items">
          <NewArticles size="medium" />
        </div>
        <div class="popular-articles sticky">
          <PopularArticles />
        </div>
      </div>
    </div>
  </section>
  <section>
    <MarqueeText></MarqueeText>
  </section>
  <section class="tags gradient">
    <TagCloud/>
  </section>
  <section class="cmore-section">
    <div class="cmore">
      <h2 class="ibm-sans-bold">WANNA SEE MORE?</h2>
      <h5 class="cmore-text ibm-sans-bold">
        We have an entire archive of articles about music culture. Check it out!
      </h5>
      <RouterLink to="/articles"> <OrangeButton /></RouterLink>
    </div>
  </section>
  <section class="sub-section">
    <SubscriptionForm />
  </section>
</template>

<style src="@/assets/css/main-page.css"></style>
