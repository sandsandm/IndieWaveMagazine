<script setup>
import OrangeButton from '@/components/OrangeButton.vue'
</script>

<template>
  <section class="subscribe">
    <h4 class="ibm-sans-bold">STAY UPDATED</h4>
    <h1 class="anton">JOIN OUR CLUB</h1>
    <p class="azeret">
      Become part of the community! Receive notifications <br />
      about new articles or become an author yourself
    </p>
    <div class="ibm-mono drop">drop it like it’s hot.</div>
    <input class="input-email" type="email" placeholder="Your E-mail" name="email" />

    <div>
      <input type="checkbox" name="checkbox" id="checkbox" />
      <label for="checkbox" class="ibm-sans-bold">I agree to Indiegwave's Privacy Policy</label>
    </div>
    <RouterLink to="/about"> <OrangeButton label="SUBSCRIBE NOW" /> </RouterLink>
  </section>
</template>

<style scoped>
.subscribe {
  background-image: linear-gradient(#303159, rgba(0, 0, 0, 0));
  padding: 19vh 20vw 18vh 20vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
p {
  text-align: center;
}
.input-email {
  width: 830px;
  height: 50px;
  border-radius: 90px;
  border: #6a7ac8 4px solid;
  background: none;
  margin: 20px auto 42px auto;
  padding: 0 20px;
}
input::placeholder {
  font-family: Roboto, sans-serif;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
}
input {
  font-size: 24px;
  color: #ffffff;
}

div {
  margin: 0 0 50px 0;
}
div > input {
  margin: 20px;
  border: #6c6c6c 1px solid;
  background: rgba(217, 217, 217, 0.25);
}
div > label {
  color: #b6b6b6;
}
.drop {
  font-size: 36px;
  margin: 10px auto;
}
</style>
