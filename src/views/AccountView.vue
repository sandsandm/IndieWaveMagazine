<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import ArticleCard from '@/components/ArticleCard.vue'

const store = useArticlesStore()
const router = useRouter()

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))

function logout() {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  router.push('/')
}
</script>

<template>
 <section class="first-section gradient">
   <div class="logout-container">
     <button class="orange-btn roboto bold" @click="logout">LOG OUT</button>
   </div>
    <h2 class="tilt-warp">MY ACCOUNT</h2>
   <p v-if="currentUser" class="account-username roboto">
   Hello, <strong>{{ currentUser.username }}</strong>
 </p>
 </section>
  <section class="second-section">
    <h3 class="roboto">
      Articles you have liked
    </h3>
    <div v-if="store.likedArticles.length" class="account-grid">
      <ArticleCard
        v-for="article in store.likedArticles"
        :key="article.id"
        :article="article"
        size="medium"
      />
    </div>
    <div v-else class="v-else">
      <p class="account-empty roboto">Seems like you haven't like any article yet :(</p>
        <button class="orange-btn roboto bold"><RouterLink to="/articles">READ ARTICLES</RouterLink> </button>
    </div>

  </section>
</template>

<style scoped>
h3 {
  margin: 10px 0 20px 0;
}
a {
  color: #ffffff;
}
a:hover {
  color: #ffffff;
}
.logout-container {
  width: 100%;
  display: flex;
  justify-content: end;
}
.second-section {
  padding: 2rem 5rem;
  max-width: 1920px;
  margin: 0 auto;
  color: #fff;
}
.v-else {
    display: flex;
  justify-content: space-between;
}
.orange-btn {
  padding: 5px 15px;
  width: fit-content;
  border-radius: 145px;
  border: none;
  background-color: #E46C56;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
}
.orange-btn:hover {
  background-color: #934435;
}
.orange-btn:active {
  background-color: #6A7AC8;
}
</style>
