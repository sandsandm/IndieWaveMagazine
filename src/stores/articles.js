import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import articlesData from '../data/articles.json'

export const useArticlesStore = defineStore('articles', () => {
  const baseUrl = import.meta.env.BASE_URL

  const processedArticles = articlesData.map(article => ({
    ...article,
    //coverImage: `${baseUrl}covers/${article.coverImage}`
  }))

  const articles = ref(processedArticles)
  const likedIds = ref([])

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

  function toggleLike(articleId) {
    const index = likedIds.value.indexOf(articleId)
    if (index === -1) {
      likedIds.value.push(articleId)
    } else {
      likedIds.value.splice(index, 1)
    }
  }


  function getArticleById(id) {
    return articles.value.find(a => a.id === Number(id))
  }

  //нереализовано
  function toggleLang() {
    currentLang.value = currentLang.value === 'ru' ? 'en' : 'ru'
  }

  return {
    articles,
    likedIds,
    featuredArticles,
    newArticles,
    popularArticles,
    allTags,
    likedArticles,
    toggleLike,
  }
},
{
  persist: {
    key: 'articles',
      pick: ['likedIds'],
  },
})