<script setup>
import { computed } from 'vue'

const props = defineProps({
  // строка тег
  tag: {
    type: String,
    default: '',
  },
  // извлечение тегов из статьи
  article: {
    type: Object,
    default: null,
  },
  // извлечение тегов из массива тэгов
  tags: {
    type: Array,
    default: () => [],
  },
  // кликабилити
  linkable: {
    type: Boolean,
    default: true,
  },
  // количество тегов (если передано больше)
  limit: {
    type: Number,
    default: 0, // 0 = все
  },
})

// собираем теги из любого источника
const tagList = computed(() => {
  let list = []

  if (props.tags.length) {
    list = props.tags // передан массив
  } else if (props.article) {
    list = props.article.tags // из статьи
  } else if (props.tag) {
    list = [props.tag] // одна строка
  }

  return props.limit > 0 ? list.slice(0, props.limit) : list
})
</script>

<template>
  <div v-if="tagList.length" class="tag-list">
    <template v-if="linkable">
      <router-link
        v-for="t in tagList"
        :key="t"
        :to="`/articles?tag=${t}`"
        class="tag-chip semiBold ibm-mono"
      >
        <p>#{{ t }}</p>
      </router-link>
    </template>
    <template v-else>
      <p v-for="t in tagList" :key="t" class="tag-chip semiBold ibm-mono">#{{ t }}</p>
    </template>
  </div>
</template>

<style scoped>
.tag-chip {
  color: #bebebe;
  background: none;
}
.tag-chip:hover {
  color: #e46c56;
}
</style>