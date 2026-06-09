<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  decades: {
    type: Array,
    default: () => ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
  },
  modelValue: {
    type: String,
    default: '2020s',
  },
})

const emit = defineEmits(['update:modelValue'])

const currentIndex = computed(() => {
  const idx = props.decades.indexOf(props.modelValue)
  return idx !== -1 ? idx : props.decades.length - 1
})

// Вычисляем цвет бегунка на основе позиции
const thumbColor = computed(() => {
  const index = currentIndex.value
  const total = props.decades.length - 1
  const position = index / total // позиция от 0 до 1

  // Градиент: #e46c56 (оранжево-красный) -> #6a7ac8 (сине-фиолетовый)
  const startColor = { r: 228, g: 108, b: 86 }  // #e46c56
  const endColor = { r: 106, g: 122, b: 200 }    // #6a7ac8

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * position)
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * position)
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * position)

  return `rgb(${r}, ${g}, ${b})`
})

function onInput(event) {
  const index = Number(event.target.value)
  emit('update:modelValue', props.decades[index])
}
</script>

<template>
  <div class="timeline">
    <div class="timeline__labels">
      <span
        v-for="(decade, index) in decades"
        :key="decade"
        :class="{ active: index === currentIndex }"
        class="timeline__label"
      >
        {{ decade }}
      </span>
    </div>
    <input
      type="range"
      :min="0"
      :max="decades.length - 1"
      :value="currentIndex"
      step="1"
      class="timeline__slider"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.timeline {
  width: 100%;
  padding: 40px 0;
}

.timeline__labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.timeline__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 40px;
  color: #666;
  transition: all 0.2s;
}

.timeline__label.active {
  color: #ffffff;
  font-size: 50px;
  font-weight: bold;
}

.timeline__slider {
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, #e46c56, #6a7ac8);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.timeline__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: v-bind(thumbColor);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: background 0.2s ease;
}
.timeline__slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: v-bind(thumbColor);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: background 0.2s ease;
}

.timeline__slider::-moz-range-track {
  height: 10px;
  background: linear-gradient(90deg, #e46c56, #6a7ac8);
  border-radius: 3px;
}

@media (max-width: 992px) {
  .timeline__label { font-size: 28px; }
  .timeline__label.active { font-size: 34px; }
}

@media (max-width: 768px) {
  .timeline { padding: 24px 0; }
  .timeline__label { font-size: 18px; }
  .timeline__label.active { font-size: 22px; }
}

@media (max-width: 480px) {
  .timeline__labels { gap: 0; }
  .timeline__label { font-size: 13px; }
  .timeline__label.active { font-size: 15px; }
}
</style>