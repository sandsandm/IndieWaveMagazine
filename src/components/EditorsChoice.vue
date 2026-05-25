<script setup>
import { ref, onUnmounted } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticlesStore } from '@/stores/articles'
import { computed } from 'vue'

const store = useArticlesStore()
const galleryRef = ref(null)

let targetSpeed = 0
let animationId = null
let isHovering = false

function onMouseMove(event) {
  const gallery = galleryRef.value
  if (!gallery) return
  const rect = gallery.getBoundingClientRect()
  const center = (event.clientX - rect.left) / rect.width - 0.5
  targetSpeed = center * 600
}

function smoothScroll() {
  const gallery = galleryRef.value
  if (!gallery) return
  gallery.scrollLeft += targetSpeed * 0.5

  if (Math.abs(targetSpeed) < 0.9 && !isHovering) {
    animationId = null
    return
  }
  animationId = requestAnimationFrame(smoothScroll)
}

function onMouseEnter() {
  isHovering = true
  if (!animationId) {
    animationId = requestAnimationFrame(smoothScroll)
  }
}

function onMouseLeave() {
  isHovering = false
}

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<template>
  <div class="choice__content">
    <h4 class="ibm-mono">EDITORS' CHOICE</h4>
    <div
      ref="galleryRef"
      class="choice__gallery"
      @mouseenter="onMouseEnter"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <ArticleCard
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
@media (min-width: 1200px) {
  .choice__gallery {
    display: grid;
    column-gap: 20px;
    grid-template-columns: repeat(9, 400px);
  }
}
@media (max-width: 1200px) {
  .choice__gallery {
    display: grid;
    column-gap: 20px;
    grid-template-columns: repeat(9, 300px);
  }
}
.choice__gallery {
  display: grid;
  flex-direction: row;
  gap: 20px;
  max-height: 460px;
  margin: 20px 0;
  max-width: 90%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 15px;
}

.choice__gallery :deep(.article-card):hover {
  transform: scale(1.05); /* не 105%, а 1.05 — scale принимает число */
  transition: transform 0.3s;
  cursor: pointer;
}

.choice__gallery :deep(.article-card):active {
  transform: scale(1.02);
}
@media (max-width: 768px) {
  .choice__gallery {
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
  }
}
</style>