<script>
</script>

<template>
  <div class="under-header roboto">
    <div class="marquee__track">
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
      <p>put some fire in your plAYLIST</p>
    </div>
  </div>
</template>

<style scoped>
.marquee__track {
  display: flex;
  flex-direction: row;
  gap: 40px;
  white-space: nowrap;
  animation: scroll 40s linear infinite;
}

.marquee__track p {
  flex-shrink: 0;
  margin: 0;
  color: #fff;
  text-transform: uppercase;
}

.under-header {;
  background-color: #ff4825;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 17px;
  text-transform: uppercase;
  height: 48px;
  overflow: hidden;
  p {
    margin-right: 10px;
    width: 300px;
    color: black;
  }
}
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Сдвигаем ровно на половину (первый набор уезжает, второй заходит) */
    transform: translateX(-50%);
  }
}
@media (max-width: 1200px) {
  height: 25px;
}
</style>
