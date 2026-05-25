<script setup>
import TagChip from './TagChip.vue'
import { useArticlesStore } from '@/stores/articles.js'

const store = useArticlesStore()
</script>

<template>
  <div class="tag-cloud__container">
    <TagChip :tags="store.allTags" :limit="10" />
  </div>
</template>

<style>
.tag-cloud__container {
  .tag-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;

    .tag-chip {
      font-size: 56px;
      font-weight: bold;
    }
  }
}
</style>
