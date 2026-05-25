<script setup>
import { ref, computed } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import ArticleCard from '@/components/ArticlesCard.vue'
import DecadeTimeline from '@/components/DecadeTimeline.vue'

const store = useArticlesStore()
const selectedDecade = ref('2020s')

const articles = computed(() => store.articles.find(a => a.id === 3))

const filteredArticles = computed(() =>
  store.articles.filter(a => a.decade === selectedDecade.value)
)
</script>

<template>
  <div class="history-page">
    <div class="first-section gradient">
      <h2 class="tilt-warp">THE HISTORY</h2>
      <h4 class="ibm-sans-bold ">Stories From The Creative World</h4>
    </div>
    <div class="second-section">
      <DecadeTimeline v-model="selectedDecade" />

      <div class="history-articles">

        <ArticleCard
          v-for="article in filteredArticles"
          :key="article.id"
          :article="article"
          :show-date="true"
          :show-preview="true"
          size="full"
        />

      </div>

      <p v-if="filteredArticles.length === 0" class="ibm-sans-bold">
        No articles for {{ selectedDecade }}
      </p>
    </div>

  </div>
</template>

<style scoped>
.history-articles {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 70px;
}
.second-section {
  padding: 50px;
}
</style>