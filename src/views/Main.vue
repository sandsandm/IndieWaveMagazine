<script setup>
import { useArticlesStore } from '@/stores/articles'
import EditorsChoice from '@/components/EditorsChoice.vue'
import PopularArticles from '@/components/PopularArticles.vue'
import NewArticles from '@/components/NewArticles.vue'
import TagChip from '@/components/TagChip.vue'
import MarqueeText from '@/components/marqueeText.vue'
import OrangeButton from '@/components/OrangeButton.vue'
import SubscriptionForm from '@/components/SubscriptionForm.vue'
import TagCloud from '@/components/TagCloud.vue'
const store = useArticlesStore()
</script>
<template>
  <section class="main">
    <div class="main-content">
      <div class="main-top">
        <div class="main__search">
          <button class="main__search-btn">
            <a href="#"> <img src="@/assets/images/search.png" alt="" /> </a>
          </button>
          <input
            class="main__search-input"
            type="text"
            name="search"
            id="main-search"
            placeholder="Search"
          />
        </div>
        <div class="profile">
          <RouterLink to="/account">
            <img src="@/assets/images/LOGIN.png" alt="" />
          </RouterLink>
          <div class="roboto">
            <a class="language-selected" href="#"> ENG </a>
            /
            <a class="language-unselected" href="#"> РУ </a>
          </div>
        </div>
      </div>
      <div class="main-bottom ibm-mono">
        <h1>INDIE WAVE MAGAZINE</h1>
        <img src="@/assets/images/line.png" alt="" />
        <h5 class="main__under-title roboto">Stories from a world full of creative</h5>
      </div>
    </div>
  </section>
  <section class="choice gradient">
    <EditorsChoice></EditorsChoice>
  </section>
  <section class="new-articles">
    <div class="new-articles-container">
      <h4 class="ibm-mono">NEW ARTICLES</h4>
      <div class="new-articles__content">
        <div class="new-articles__items">
          <NewArticles size="medium" />
        </div>
        <div class="popular-articles sticky">
          <PopularArticles />
        </div>
      </div>
    </div>
  </section>
  <section>
    <MarqueeText></MarqueeText>
  </section>
  <section class="tags gradient">
    <TagCloud/>
  </section>
  <section class="cmore-section">
    <div class="cmore">
      <h2 class="ibm-sans-bold">WANNA SEE MORE?</h2>
      <h5 class="cmore-text ibm-sans-bold">
        We have an entire archive of articles about music culture. Check it out!
      </h5>
      <RouterLink to="/articles"> <OrangeButton /></RouterLink>
    </div>
  </section>
  <section class="sub-section">
    <SubscriptionForm />
  </section>
</template>

<style src="@/assets/css/main-page.css"></style>
