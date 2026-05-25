import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// Импортируем исходные данные
import articlesData from '../data/articles.json'

export const useArticlesStore =
  defineStore('articles', () => {
  // state
  // Все статьи
  const articles = ref(articlesData)

  // ID понравившихся статей
  const likedIds = ref([])

  // Реакции
  const reactions = ref([])

  // Текущий язык
  const currentLang = ref('ru')

  // computed
  // cтатьи для Editors' Choice
  const featuredArticles = computed(() =>
    articles.value.filter(a => a.featured)
  )

  // сортировка по дате (новые сверху)
  const ByNewArticles = computed(() =>
    [...articles.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  )
    //срез 6 новых статей
    const newArticles = computed(() =>
      [...articles.value].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0,6)
    )
  // поп статьи
  const popularArticles = computed(() =>
    [...articles.value].sort((a, b) => b.likes - a.likes).slice(0, 4)
  )

  // теги
  const allTags = computed(() => {
    const tags = new Set()
    articles.value.forEach(a => a.tags.forEach(t => tags.add(t)))
    return [...tags]
  })

  // лайкнутые статьи
  const likedArticles = computed(() =>
    articles.value.filter(a => likedIds.value.includes(a.id))
  )

  // actions
  function toggleLike(articleId) {
    const index = likedIds.value.indexOf(articleId)
    if (index === -1) {
      likedIds.value.push(articleId)    // лайкнуть
    } else {
      likedIds.value.splice(index, 1)   // убрать лайк
    }
  }
  function addReaction(articleId, emoji) {
    const existing = reactions.value.find(
      r => r.articleId === articleId && r.emoji === emoji
    )
    if (existing) {
      existing.count++    // увеличить счётчик
    } else {
      reactions.value.push({ articleId, emoji, count: 1 })  // новая реакция
    }
  }
  function getArticleById(id) {
    return this.articles.find(a => a.id === Number(id))
  }
  function toggleLang() {
    currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru'
  }
  return {
    // состояние
    articles, likedIds, reactions, currentLang,
    // геттеры
    featuredArticles, newArticles, popularArticles, allTags, likedArticles,
    // действия
    toggleLike, addReaction, getArticleById, toggleLang,
  }
})