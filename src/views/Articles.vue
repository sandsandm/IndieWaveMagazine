<script setup>
import { ref, computed } from 'vue'
import { useArticlesStore } from '../stores/articles'
import ArticleCard from '@/components/ArticleCard.vue'

const store = useArticlesStore()
const selectedTags = ref([])
const dateFrom = ref('')
const dateTo = ref('')
const visibleCount = ref(8) // Начальное количество статей
const showAllTags = ref(false) // Флаг для отображения всех тегов
const initialTagsLimit = 10
import { watch } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const searchQuery = ref(route.query.q || '')

import SubscriptionForm from '@/components/SubscriptionForm.vue'
watch([searchQuery, selectedTags, dateFrom, dateTo], () => {
  resetAndLoadMore()
})
// резы
const results = computed(() => {
  let filtered = store.articles

  // Фильтр по тексту
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()

    filtered = filtered.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(q)

      let authorMatch = false
      if (Array.isArray(article.author)) {
        authorMatch = article.author.some(author => author.toLowerCase().includes(q))
      } else if (typeof article.author === 'string') {
        authorMatch = article.author.toLowerCase().includes(q)
      }

      return titleMatch || authorMatch
    })
  }

  // фильтр по тегам
  if (selectedTags.value.length) {
    filtered = filtered.filter(a =>
      selectedTags.value.some(t => a.tags.includes(t))
    )
  }

  // фильтр по дате
  if (dateFrom.value) {
    filtered = filtered.filter(a => new Date(a.date) >= new Date(dateFrom.value))
  }
  if (dateTo.value) {
    filtered = filtered.filter(a => new Date(a.date) <= new Date(dateTo.value))
  }

  return sortArticles(filtered)
})

const displayedArticles = computed(() => {
  return results.value.slice(0, visibleCount.value)
})

// "Загрузить еще"
const hasMore = computed(() => {
  return visibleCount.value < results.value.length
})

// Отображаемые теги
const displayedTags = computed(() => {
  if (showAllTags.value) {
    return store.allTags // Показываем все теги
  }
  return store.allTags.slice(0, initialTagsLimit) // Показываем только первые N тегов
})

// Флаг, показывать ли кнопку "more tags"
const hasMoreTags = computed(() => {
  return store.allTags.length > initialTagsLimit
})



// Функция загрузки еще статей
function loadMore() {
  visibleCount.value += 6
}

// Сброс количества при изменении фильтров
function resetAndLoadMore() {
  visibleCount.value = 6
}
// Функция показа всех тегов
function showMoreTags() {
  showAllTags.value = true
}

// Функция скрытия тегов (опционально)
function showLessTags() {
  showAllTags.value = false
}
function toggleTag(tag) {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}
const sortBy = ref('date')

  const sortArticles = (articles) => {
    let sorted = [...articles]

    switch(sortBy.value) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
      case 'popular':
        return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      case 'popular-asc':
        return sorted.sort((a, b) => (a.likes || 0) - (b.likes || 0))
      default:
        return sorted
    }
  }
</script>

<template>
  <div class="search-page-wrapper">
    <div class="search-page__first-section first-section gradient">
      <h2 class="tilt-warp">THE ARTICLES</h2>
      <h4 class="ibm-sans-bold">Stories From The Creative World</h4>
    </div>
    <div class="search-page-container">
      <div class="search-categories-container">
        <div class="ibm-mono p-search">SEARCH CATEGORIES</div>
        <div class="filters-container">
          <div class="filter-tags ibm-mono">
            <button
              v-for="tag in displayedTags"
              :key="tag"
              :class="{ active: selectedTags.includes(tag)}"
              @click="toggleTag(tag)">
              #{{ tag }}
            </button>
            <button
              v-if="hasMoreTags && !showAllTags"
              @click="showMoreTags"
              class="more-tags-btn">
              #more tags
            </button>
            <button
              v-if="showAllTags && hasMoreTags"
              @click="showLessTags"
              class="less-tags-btn">
              #show less
            </button>
            <button>
            <RouterLink to="/history">
              #Search by date
            </RouterLink>
          </button>
          </div>
        </div>
      </div>
      <div class="search-articles-content">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="search-input"
            name="search"
          />
          <select v-model="sortBy" @change="resetAndLoadMore" class="sortBtn ibm-sans-bold">
            <option value="date">Sort by date (newest first)</option>
            <option value="date-asc">Sort by date (oldest first)</option>
            <option value="popular">Sort by popularity (most liked)</option>
            <option value="popular-asc">Sort by popularity (least liked)</option>
          </select>
        </div>
        <p class="shown ibm-sans-bold">shown: {{ displayedArticles.length }} from {{ results.length }} articles</p>

        <div class="search-results">
          <ArticleCard
            v-for="article in displayedArticles"
            :key="article.id"
            :article="article"
          />
        </div>

        <button
          v-if="hasMore"
          @click="loadMore"
          class="moreBtn">
          show more
        </button>

        <p v-else-if="results.length > 0" class="ibm-sans-bold p-res">
          You have looked all {{ results.length }} articles
        </p>

        <p v-if="results.length === 0" class="ibm-sans-bold p-res">
          no articles found :(
        </p>
      </div>
      </div>
  </div>
  <SubscriptionForm></SubscriptionForm>
</template>
<style src="@/assets/css/articles-page.css"></style>
