<script setup>
import ArticlesCard from '@/components/ArticlesCard.vue'
import { useArticlesStore } from '@/stores/articles'

const store = useArticlesStore()

const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
})
</script>

<template>

  <div class="new-articles_articles">
    <ArticlesCard
      v-for="article in store.newArticles"
      :key="article.id"
      :article="article"
      :size="props.size"
    />
  </div>
</template>

<style scoped>
.new-articles_articles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 3rem;
  width: 100%;
  /* убираем min-height, если он не нужен */
}

/* Для среднего размера карточек можно уменьшить отступы */
@media (max-width: 768px) {
  .new-articles_articles {
    gap: 1rem;
  }
}


</style>