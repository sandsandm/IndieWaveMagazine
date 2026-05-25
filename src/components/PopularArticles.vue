<script setup>
import ArticlesCard from '@/components/ArticlesCard.vue'
import { useArticlesStore } from '@/stores/articles'

const store = useArticlesStore()

const props = defineProps({
  size: {
    type: String,
    default: 'small',
  },
})
</script>

<template>
  <div class="popular-articles_articles">
    <h5 class="ibm-sans-bold">POPULAR ARTICLES</h5>
    <div class="pop-articles__line"/>
    <ArticlesCard
      v-for="article in store.popularArticles"
      :key="article.id"
      :article="article"
      :show-genre="false"
      :show-date="true"
      :size="size"
    />
  </div>
</template>

<style scoped>
h5 {
  margin: 3.4rem 0 0 0 ;
  color: #9A9A9A;
}
  .popular-articles_articles {
    display: flex;
    flex-direction: column;
    margin: 0 0 50px 0
  }
  .pop-articles__line {
    border-bottom: #858585 3px solid;
    margin: 15px 0 30px 0;
  }

</style>