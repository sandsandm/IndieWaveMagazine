<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
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
    <ArticleCard
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
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 3.4rem;
  width: 100%;
}
@media (max-width: 555px) {
  .new-articles_articles {
    width: 230px;

  }
}

</style>