<script setup>
import { useRoute } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { computed } from 'vue'
import ArticleCard from '@/components/ArticlesCard.vue'
import PopularArticles from '@/components/PopularArticles.vue'
const route = useRoute()
const store = useArticlesStore()

import TagChip from '@/components/TagChip.vue'

// Статья по id из URL
const article = computed(() => store.articles.find((a) => a.id === Number(route.params.id)))

// Похожие статьи (те же теги)
const similarArticles = computed(() => {
  if (!article.value) return []
  return store.articles
    .filter((a) => a.id !== article.value.id)
    .filter((a) => a.tags.some((t) => article.value.tags.includes(t)))
    .slice(0, 4)
})
</script>

<template>
  <div v-if="article" class="article-detail">
    <section class="first-section gradient">
      <img :src="article.coverImage" class="article-cover" />
    </section>
    <section class="article-detail__body">
      <div class="article-detail__meta">
        <h2 class="ibm-mono bold">{{ article.title }}</h2>
        <span class="ibm-mono bold">{{ article.date }}</span>
      </div>
      <div class="article-detail__main">
        <div class="article-detail__share ibm-sans-semibold sticky">
          <p class="underline">SHARE</p>
          <a href="">#facebook</a>
          <a href="">#twitter</a>
          <a href="">#instagram</a>
          <a href="">#telegram</a>
          <a href="">#whatsApp</a>
          <a href="">#viber</a>
          <a href="">#threads</a>
          <a href="">#pinterest</a>
          <a href="">#link</a>
        </div>

        <div class="article-detail__content">
          <div class="article-detail-text ibm-sans-bold" v-html="article.content" />
          <div class="articleTags">
            <TagChip v-if="article" :article="article" :limit="3" />
          </div>
        </div>

        <div class="article-detail__popular sticky">
          <PopularArticles :article="article" />
        </div>
      </div>
    </section>

    <section v-if="similarArticles.length" class="similar gradient">
      <h3 class="ibm-sans-bold">ARTICLES YOU MIGHT BE INTERESTED IN</h3>
      <div class="similar-container">
        <ArticleCard v-for="a in similarArticles" :key="a.id" :article="a" size="medium" />
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <h2>Статья не найдена</h2>
    <router-link to="/">← На главную</router-link>
  </div>
</template>

<style scoped>
.article-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.article-detail__body {
  padding: 70px 35px 30px 85px;
}
span {
  font-size: 32px;
}
.article-detail__main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 70px;
}
.article-detail__share {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  color: #9A9A9A;
  a {
    color: #9A9A9A;
  }

}
.article-detail__share p:first-of-type {
  margin: 70px 0 30px 0;
  text-decoration: underline;
  text-underline-offset: 20px;
}

.article-detail__content {
  width: 55%;
  margin: 60px auto;
}
.article-detail-text {
  display: flex;
  flex-direction: column;
}
.article-detail-text {
  display: flex;
  flex-direction: column;
  text-align: start;
  font-size: 32px;
}
.article-detail__popular {
  width: 510px;
}
.similar {
  padding: 70px 35px 30px 85px;
}
.similar-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
  overflow: hidden;
}
.article-detail-text :deep(h6) {
  font-size: 26px;
  margin: 20px 0 30px;
  color: #fff;
  font-weight: bold;

}

.article-detail-text :deep(p) {
  margin: 0 0 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.article-detail-text :deep(.reg-text) {
  color: #9A9A9A;
  margin: 0 0 20px;
  line-height: 1.7;
}

.article-detail-text :deep(img) {
  margin: 20px 0 30px;
  width: 80%;
  max-width: 100%;
  display: block;
}

.article-detail-text :deep(h3) {
  margin: 32px 0 14px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.article-detail-text :deep(strong) {
  color: #fff;
}

.article-detail-text :deep(em) {
  color: rgba(255, 255, 255, 0.9);
}

/* Адаптивность */
@media (max-width: 700px) {
  .footer-container {
    padding: 2rem 1.2rem;
  }
  .footer-grid {
    gap: 1.8rem;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
  .newsletter-form {
    flex-direction: column;
  }
  .btn-grunge {
    align-self: flex-start;
  }
}

/* Эффект "разорванной кромки" сверху футера — гранж */
.grunge-footer .footer-container::before {
  content: "✂︎ ✂︎ ✂︎";
  position: absolute;
  top: -18px;
  left: 5%;
  font-size: 14px;
  letter-spacing: 5px;
  color: #E46C56;
  background: #303159;
  padding: 0 10px;
  font-family: monospace;
  opacity: 0.7;
  transform: rotate(-1deg);
}
</style>