<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'READ ARTICLES',
  }
})
</script>
<template>
  <button class="orange-btn ibm-sans-bold">
    <h5>{{ props.label }}</h5>
  </button>
</template>

<style scoped>
.orange-btn {
  min-width: 300px;
  width: fit-content;
  height: 68px;
  border-radius: 145px;
  border: none;
  background-color: #E46C56;
  display: flex;
  justify-content: center;
  align-items: center;
}
.orange-btn:hover {
  background-color: #934435;
}
.orange-btn:active {
  background-color: #6A7AC8;
}
h5 {
color: white;
}

</style>
