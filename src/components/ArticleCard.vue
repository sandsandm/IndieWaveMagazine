<script setup>
// props — это параметры, которые мы передаём в компонент снаружи
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'full'].includes(value),
  },
  showCover: { type: Boolean, default: true },
  showGenre: { type: Boolean, default: true },
  showDate: { type: Boolean, default: true },
  showTags: { type: Boolean, default: true },
  showAuthor: { type: Boolean, default: false },
  showPreview: { type: Boolean, default: false },
})

const getCoverUrl = (imageName) => {
  // Базовый путь из конфига Vite
  const base = import.meta.env.BASE_URL;
  return `${base}covers/${imageName}`;
};
</script>

<template>
  <router-link :to="`/article/${article.id}`" class="article-card-link">
    <div :class="['article-card', `article-card--${size}`]">
      <img
        v-if="showCover && article.coverImage"
        :src="getCoverUrl(article.coverImage)"
        :alt="article.title"
        :class="['article-cover', `article-cover--${size}`]"
      />

      <div :class="['article-card-content', `article-card-content--${size}`]">
        <p v-if="showGenre" class="article-genre ibm-sans-bold">
          {{ article.genre }}
        </p>

        <p class="article-title ibm-sans-bold">
          {{ article.title }}
        </p>

        <span v-if="showPreview" class="article-preview ibm-sans-bold">
          {{ article.previewText }}
        </span>

        <span v-if="showDate" class="article-date ibm-sans-bold">
          {{ article.date }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.article-card {
  display: flex;
}
@media (min-width: 1200px) {
  .article-card-link {
    width: fit-content;
  }
}
@media (max-width: 1200px) {
  .article-card-link {
    max-width: 220px;
  }
}
@media (min-width: 1200px) {

  /*MEDIUM*/
  .article-card--medium {
    width: 300px;
    flex-direction: column;
  }
  .article-cover--medium {
    max-width: 290px;
    height: 270px;
    border-radius: 35px;
  }
  .article-card-content--medium {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 9px;
    .article-title {
      text-align: start;
    }
  }
}
/*LARGE*/
/*используется в editors choice only*/
.article-card--large {
  width: 375px;
  height: 420px;
  flex-direction: column;
}
.article-cover--large {
  max-width: 375px;
  height: 345px;
  border-radius: 35px;
}
.article-card-content--large {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 9px;
  .article-title {
    text-align: center;
  }
}
/*SMALL*/
.article-card--small {
  max-width: 510px;
  height: 120px;
  border-radius: 35px;
  flex-direction: row;
  justify-content: start;
}
.article-cover--small {
  max-width: 100px;
  height: 100px;
  border-radius: 20px;
  margin: 0 20px 0 0;
}
.article-card-content--small {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
/*FULL*/
.article-card--full {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.article-cover--full {
  max-width: 375px;
  height: 345px;
  border-radius: 35px;
  margin: 0 20px 0 0;
}
.article-card-content--full {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  .article-genre {
    color: #bcbcbc;
    font-size: 36px;
  }
  .article-title {
    font-size: 64px;
    text-transform: uppercase;
    text-align: start;
  }
  .article-preview {
    font-size: 24px;
  }
  .article-date {
    font-size: 24px;
    color: #bcbcbc;
  }
}
.article-genre {
  font-size: 16px;
  text-transform: uppercase;
}
.article-genre,
.article-date {
  color: #bcbcbc;
}
.article-title {
  font-size: 20px;
}
.article-date {
  font-size: 15px;
  text-transform: uppercase;
}

@media (max-width: 992px) {
  .article-card--large {
    width: 300px;
    height: auto;
  }
  .article-cover--large {
    max-width: 300px;
    height: 270px;
  }
  .article-card--full {
    width: 100%;
  }
  .article-cover--full {
    max-width: 280px;
    height: 260px;
  }
  .article-card-content--full .article-title {
    font-size: 44px;
  }
  .article-card-content--full .article-genre {
    font-size: 26px;
  }
  .article-card-content--full .article-preview {
    font-size: 20px;
  }
  .article-card-content--full .article-date {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  /* Large — уменьшаем */
  .article-card--large {
    width: 240px;
    height: auto;
  }
  .article-cover--large {
    max-width: 240px;
    height: 210px;
    border-radius: 24px;
  }

  /* Medium — уменьшаем */
  .article-card--medium {
    width: 350px;
    display: flex;
    flex-direction: column;
  }
  .article-cover--medium {
    max-width: 250px;
    height: 220px;
    border-radius: 24px;
  }

  /* Full — переходим в колонку */
  .article-card--full {
    flex-direction: column;
  }
  .article-cover--full {
    max-width: 100%;
    width: 100%;
    height: 220px;
    margin: 0 0 14px 0;
    border-radius: 24px;
  }
  .article-card-content--full .article-title {
    font-size: 28px;
  }
  .article-card-content--full .article-genre {
    font-size: 18px;
  }
  .article-card-content--full .article-preview {
    font-size: 16px;
  }
  .article-card-content--full .article-date {
    font-size: 15px;
  }

  .article-card--small {
    height: auto;
    min-height: 90px;
  }
  .article-cover--small {
    max-width: 80px;
    height: 80px;
    border-radius: 14px;
  }
}

@media (max-width: 480px) {
  .article-card--large {
    width: 180px;
  }
  .article-cover--large {
    max-width: 180px;
    height: 160px;
    border-radius: 18px;
  }
  .article-cover--medium {
    height: 190px;
    border-radius: 18px;
  }
  .article-card-content--full .article-title {
    font-size: 22px;
  }
}
</style>