<script setup>
import { useRoute } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { computed } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import PopularArticles from '@/components/PopularArticles.vue'
import TagChip from '@/components/TagChip.vue'

const route = useRoute()
const store = useArticlesStore()

// Функция для правильного пути к изображению (такая же, как в ArticleCard)
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http') || imagePath.startsWith('/IndieWaveMagazine/')) {
    return imagePath
  }
  const base = import.meta.env.BASE_URL
  return `${base}${imagePath}`
}

const article = computed(() =>
  store.articles.find((a) => a.id === Number(route.params.id))
)

const similarArticles = computed(() => {
  if (!article.value) return []
  return store.articles
    .filter((a) => a.id !== article.value.id)
    .filter((a) => a.tags?.some((t) => article.value.tags?.includes(t)))
    .slice(0, 4)
})

const isLiked = computed(() =>
  store.likedIds.includes(Number(route.params.id))
)
</script>
<template>
  <div v-if="article" class="article-detail">
    <section class="first-section gradient">
      <img :src="getImageUrl(article.coverImage)" class="article-cover" />
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
            <button
              class="like-btn"
              :class="{ liked: isLiked }"
              @click="store.toggleLike(article.id)"
            >
              <svg class="heart-icon" viewBox="0 0 24 24" width="22" height="22">
                <path
                  :fill="isLiked ? '#E46C56' : 'none'"
                  :stroke="isLiked ? '#E46C56' : '#999999'"
                  stroke-width="2.5"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
              <span>{{ isLiked ? 'Liked' : 'Like' }}</span>
            </button>
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
.article-detail__meta span {
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
}
.article-detail__share a {
  color: #9A9A9A;
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
.articleTags {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.like-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  width: fit-content;
}
.like-btn:hover {
  border-color: #E46C56;
}
.like-btn.liked {
  border-color: #E46C56;
  background: rgba(228, 108, 86, 0.15);
}
.heart-icon {
  transition: transform 0.2s;
}
.like-btn:hover .heart-icon {
  transform: scale(1.15);
}
.like-btn.liked .heart-icon {
  animation: heartBeat 0.4s ease;
}
@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.25); }
  100% { transform: scale(1); }
}
@media (max-width: 992px) {
  .article-detail__popular { display: none; }
  .article-detail__content { width: 80%; margin: 40px 0; }
}

@media (max-width: 768px) {
  .article-detail__body { padding: 25px 20px; }
  .article-detail__main { flex-direction: column; gap: 16px; }
  .article-detail__share {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px 16px;
    order: 2;
  }
  .article-detail__share p:first-of-type {
    width: 100%;
    margin: 0 0 6px 0;
  }
  .article-detail__content { width: 100%; margin: 16px 0; order: 1; }
  .article-detail-text { font-size: 20px; }
  .similar { padding: 30px 20px; }
  .similar-container { flex-direction: column; gap: 20px; }
}

@media (max-width: 480px) {
  .article-detail__body { padding: 16px 14px; }
  .article-detail-text { font-size: 17px; }
  .similar { padding: 18px 14px; }
}
</style>