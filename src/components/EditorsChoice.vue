<script setup>
import ArticlesCard from '@/components/ArticlesCard.vue'
import { useArticlesStore } from '@/stores/articles'
import { computed, ref } from 'vue'

const store = useArticlesStore()

const galleryRef = ref(null)

function onMouseMove(event) {
  const gallery = galleryRef.value
  if (!gallery) return

  const rect = gallery.getBoundingClientRect()
  // Положение мыши относительно центра галереи (от -0.5 до +0.5)
  const center = (event.clientX - rect.left) / rect.width - 0.5
  // Умножаем на коэффициент скорости
  const speed = center * 600

  gallery.scrollLeft += speed
}
</script>

<template>
  <div class="choice__content">
    <h4 class="ibm-mono">EDITORS' CHOICE</h4>
    <div ref="galleryRef" class="choice__gallery" @mousemove="onMouseMove">
      <ArticlesCard
        v-for="article in store.featuredArticles"
        :key="article.id"
        :article="article"
        size="large"
        :show-date="false"
      />
    </div>
  </div>
</template>

<style scoped>
.choice__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.choice__gallery {
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(9, 400px);
  flex-direction: row;
  gap: 20px;
  height: 460px;
  margin: 20px 0;
  max-width: 90%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.choice__gallery :deep(.article-card):hover {
  transform: scale(1.05); /* не 105%, а 1.05 — scale принимает число */
  transition: transform 0.3s;
  cursor: pointer;
}

.choice__gallery :deep(.article-card):active {
  transform: scale(1.02);
}
</style>