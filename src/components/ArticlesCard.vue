<script setup>

// props — это параметры, которые мы передаём в компонент снаружи
// defineProps не нужно импортировать — это макрос Vue, доступен всегда
const props = defineProps({
    article: {
      type: Object,
      required: true,
    },
    //размер карточки
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'full'].includes(value),
    },
    showCover: { type: Boolean, default: true },
    showGenre: { type: Boolean, default: true },
    showDate: { type: Boolean, default: true },
    showPreview: { type: Boolean, default: true },
    showTags: { type: Boolean, default: true },
    showAuthor: { type: Boolean, default: false },
    showPreview: { type: Boolean, default: false },
  })

</script>

<template>
  <router-link :to="`/article/${article.id}`" class="article-card-link">
  <div :class="['article-card', `article-card--${size}`]">
  <!-- Обложка -->
    <img
      v-if="showCover && article.coverImage"
      :src="article.coverImage"
      :alt="article.title"
      :class="['article-cover', `article-cover--${size}`]"
    />
    <div :class="['article-card', `article-card-content--${size}`]">
      <p
        v-if="showGenre"
        class="article-genre ibm-sans-bold">
        {{ article.genre }}
      </p>
      <p class="article-title ibm-sans-bold">
        <router-link :to="`/article/${article.id}`">
          {{ article.title}}
        </router-link>
      </p>
      <span v-if="showPreview"
          class="article-preview ibm-sans-bold">
        {{ article.previewText }}
      </span>
      <span
        v-if="showDate"
        class="article-date ibm-sans-bold">
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
.article-card-link {
  width: fit-content;
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
/*MEDIUM*/
.article-card--medium {
   width: 300px;
   flex-direction: column;

 }
.article-cover--medium {
  max-width: 300px;
  height: 270px;
  border-radius: 35px;
}
.article-card-content--medium {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start  ;
  justify-content: start;
  padding: 9px;
  .article-title {
    text-align: start;
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
.article-cover--small{
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
.article-cover--full{
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
    color: #BCBCBC;
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
    color: #BCBCBC;
  }


}
.article-genre {
  font-size: 16px;
  text-transform: uppercase;
}
.article-genre, .article-date {
  color: #BCBCBC;
}
.article-title {
  font-size: 20px;
}
.article-date {
  font-size: 15px;
  text-transform: uppercase;
}
</style>