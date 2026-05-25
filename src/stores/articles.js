import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// Импортируем исходные данные
import articlesData from '../data/articles.json'

export const useArticlesStore = defineStore('articles', () => {
  // Базовый путь для GitHub Pages
  const baseUrl = import.meta.env.BASE_URL // '/IndieWaveMagazine/'

  // Обрабатываем изображения при загрузке
  const processedArticles = articlesData.map(article => ({
    ...article,
    coverImage: `${baseUrl}covers/${article.coverImage}`,
    // Если есть другие поля с изображениями — тоже обработай
    // image: `${baseUrl}covers/${article.image}`,
  }))

  // state
  const articles = ref(processedArticles)  // Используем обработанные данные

  // ID понравившихся статей
  const likedIds = ref([])

  // Реакции
  const reactions = ref([])

  // Текущий язык
  const currentLang = ref('ru')

  // computed
  const featuredArticles = computed(() =>
    articles.value.filter(a => a.featured)
  )

  const ByNewArticles = computed(() =>
    [...articles.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  )

  const newArticles = computed(() =>
    [...articles.value].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)
  )

  const popularArticles = computed(() =>
    [...articles.value].sort((a, b) => b.likes - a.likes).slice(0, 4)
  )

  const allTags = computed(() => {
    const tags = new Set()
    articles.value.forEach(a => a.tags.forEach(t => tags.add(t)))
    return [...tags]
  })

  const likedArticles = computed(() =>
    articles.value.filter(a => likedIds.value.includes(a.id))
  )

  // actions
  function toggleLike(articleId) {
    const index = likedIds.value.indexOf(articleId)
    if (index === -1) {
      likedIds.value.push(articleId)
    } else {
      likedIds.value.splice(index, 1)
    }
  }

  function addReaction(articleId, emoji) {
    const existing = reactions.value.find(
      r => r.articleId === articleId && r.emoji === emoji
    )
    if (existing) {
      existing.count++
    } else {
      reactions.value.push({ articleId, emoji, count: 1 })
    }
  }

  function getArticleById(id) {
    return articles.value.find(a => a.id === Number(id))
  }

  function toggleLang() {
    currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru'
  }

  return {
    articles, likedIds, reactions, currentLang,
    featuredArticles, newArticles, popularArticles, allTags, likedArticles,
    toggleLike, addReaction, getArticleById, toggleLang,
  }
})