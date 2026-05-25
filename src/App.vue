<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MarqueeText from '@/components/marqueeText.vue'
import Footer from '@/components/footer.vue'
</script>
<template>
  <div class="container">
    <div class="grain"></div>
    <header>
      <MarqueeText />
    </header>
    <nav>
      <ul class="ibm-mono semiBold">
        <li>
          <a href=""><RouterLink to="/">MAIN</RouterLink></a>
        </li>
        <li>
          <a href=""><RouterLink to="/articles">ARTICLES</RouterLink></a>
        </li>
        <li>
          <a href=""><RouterLink to="/history">HISTORY</RouterLink></a>
        </li>
        <li>
          <a href=""><RouterLink to="/about">ABOUT</RouterLink></a>
        </li>
      </ul>
    </nav>
    <main>
      <RouterView />
    </main>
    <Footer></Footer>
  </div>
</template>

<style src="@/assets/css/general.css"></style>
