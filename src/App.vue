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
          <RouterLink to="/">MAIN</RouterLink>
        </li>
        <li>
          <RouterLink to="/articles">ARTICLES</RouterLink>
        </li>
        <li>
          <RouterLink to="/history">HISTORY</RouterLink>
        </li>
        <li>
         <RouterLink to="/about">ABOUT</RouterLink>
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
