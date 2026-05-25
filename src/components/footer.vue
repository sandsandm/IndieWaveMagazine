<template>
  <footer class="footer">
    <div class="footer__noise"></div>

    <div class="footer__inner">
      <div class="footer__grid">
        <div class="footer__col">
          <h4 class="footer__heading anton">NAVIGATION</h4>
          <RouterLink to="/">Main</RouterLink>
          <RouterLink to="/articles">Articles</RouterLink>
          <RouterLink to="/history">History</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading anton">CONTACT</h4>
          <a href="mailto:hello@indiewavemag.com">hello@indiewavemag.com</a>
          <a href="#">Instagram</a>
          <a href="#">Telegram</a>
          <a href="#">Spotify</a>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading anton">SUBSCRIBE</h4>
          <p class="footer__text roboto">
            Get weekly drops of new indie releases, editor picks and live culture notes.
          </p>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading anton">ABOUT</h4>
          <p class="footer__text roboto">
            Independent magazine focused on indie music, visual culture and editorial noise.
          </p>
        </div>
      </div>

      <div class="footer__bottom">
        <span class="footer__copyright roboto">© 2026 Indie Wave Magazine</span>
        <span class="footer__tag anton">independent music / visual noise / editorial culture</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

.footer__noise {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 18px 18px;
  pointer-events: none;
  mix-blend-mode: screen;
}

.footer__inner {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 90px 40px 30px;
  color: #ffffff;
}

.footer__brand {
  max-width: 760px;
  margin-bottom: 48px;
}

.footer__title {
  margin: 0;
  font-size: clamp(3rem, 7vw, 6.5rem);
  line-height: 0.9;
  letter-spacing: 0.03em;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 3px 3px 0 rgba(228, 108, 86, 0.35);
}

.footer__subtitle {
  max-width: 560px;
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 18px;
  line-height: 1.65;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  padding: 34px 0 42px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__heading {
  margin: 0 0 6px;
  color: #e46c56;
  font-size: 15px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.footer__col a {
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 16px;
  transition: 0.25s ease;
}

.footer__col a:hover {
  color: #e46c56;
  transform: translateX(4px);
}

.footer__text {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.65;
}

.footer__btn {
  width: fit-content;
  margin-top: 6px;
  padding: 14px 22px;
  border: 2px solid #e46c56;
  background: transparent;
  color: #ffffff;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.25s ease;
}

.footer__btn:hover {
  background: #e46c56;
  color: #1d1e34;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-top: 24px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer__tag {
  color: #ffffff;
}

.ibm-plex-sans {
  font-family: "IBM Plex Sans", sans-serif;
}

.roboto {
  font-family: Roboto, sans-serif;
}

.anton {
  font-family: Anton, sans-serif;
  letter-spacing: 0.08em;
}

.tilt-warp {
  font-family: "Tilt Warp", sans-serif;
}

@media (max-width: 1100px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .footer__inner {
    padding: 64px 20px 24px;
  }

  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom {
    flex-direction: column;
  }

  .footer__title {
    transform: none;
  }
}
</style>