<script>
import { defineComponent } from 'vue'
import SubscriptionForm from '@/components/SubscriptionForm.vue'

export default defineComponent({
  components: { SubscriptionForm }
})
</script>

<template>
  <div class="about=container">
    <div class="first-section gradient tilt-warp">
      <h2>WE ARE INDIE WAVE!</h2>
      <h3>MAGAZINE THAT LOVES TO TELL YOU ABOUT NEWS OF THE MUSIC WORLD</h3>
    </div>
  </div>
  <div class="second-section">
    <div class="abit tilt-warp">
      <h2>a bit about us</h2>
    </div>
    <div class="textAbout">
      <p class="ibm-sans-bold">
        Indiewave is an online magazine for those who want
        to understand music, not just hit like.
        We launched as a small experiment in creating quality
        music journalism in the age of
        clickbait. <br>
        For us, every record is context. We tell
        not just "how it sounds," but why it
        matters. Where that guitar overdrive came from, which
        movie the author watched while writing
        the lyrics, and how 90s shoegaze is reflected in the beats
        of 2024.<br>  Our story is the story
        of people who treat sound as art. We do not publish news
        like "Kanye released a track." We
        analyze what will remain in playlists for years.
        Indiewave is an archive of meanings for
        future generations of music lovers.
      </p>
    </div>
  </div>
  <SubscriptionForm/>
</template>

<style scoped>
h3 {
  color: #b6b6b6;
}
h3   {
  text-align: center;
}
.second-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 135px 90px 90px 90px;
  gap: 80px;
}
.abit {
  min-width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
p {
  font-size: 40px
}
</style>
