<template>
  <footer class="luxury-footer">
    <div class="footer-aura"></div>

    <div class="footer-inner">
      <section class="footer-brand">
        <p class="footer-kicker">Sri Shakram Silks</p>
        <h2>Handwoven elegance for ceremonies, heirlooms, and luminous everyday grace.</h2>
        <p>
          Rooted in Kanchipuram silk tradition, Sri Shakram curates sarees with temple-inspired detail,
          refined zari work, and a quiet showroom luxury made for modern celebrations.
        </p>
      </section>

      <section class="newsletter-panel">
        <span class="seal">SS</span>
        <div>
          <p class="footer-kicker">Private Preview</p>
          <h3>Receive first looks at new silk arrivals.</h3>
        </div>
        <form class="newsletter-form" @submit.prevent>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="submit">Join</button>
        </form>
      </section>

      <div class="footer-grid">
        <div class="footer-column">
          <h4>Visit</h4>
          <p>
            No 45/18 Kotrampalayam St,<br />
            Kanchipuram, Tamil Nadu 631501
          </p>
        </div>

        <div class="footer-column">
          <h4>Collections</h4>
          <button @click="goCollection('All Kanchipuram Silk Saree')">Kanchipuram Silks</button>
          <button @click="goCollection('Pure Silk')">Pure Silk</button>
          <button @click="goCollection('Morning-Evening')">Morning-Evening</button>
          <button @click="$router.push('/all_journal')">Saree Journal</button>
        </div>

        <div class="footer-column">
          <h4>Support</h4>
          <button @click="$router.push('/orderStatus')">Track Orders</button>
          <button @click="$router.push('/contact')">Contact Care</button>
          <button @click="$router.push('/about')">About Sri Shakram</button>
          <button @click="$router.push('/coming-soon?type=customization')">Customization</button>
        </div>

        <div class="footer-column contact-column">
          <h4>Concierge</h4>
          <a href="mailto:sales@Srishakram.com">sales@Srishakram.com</a>
          <a href="mailto:support@Srishakram.com">support@Srishakram.com</a>
          <a href="tel:+919600335577">+91 96003 35577</a>
          <div class="social-row" aria-label="Social links">
            <span><v-icon size="18">mdi-instagram</v-icon></span>
            <span><v-icon size="18">mdi-facebook</v-icon></span>
            <span><v-icon size="18">mdi-youtube</v-icon></span>
            <span><v-icon size="18">mdi-pinterest</v-icon></span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>Copyright 2026 Sri Shakram</span>
        <span>Pure silk. Patient craft. Kanchipuram soul.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "LuxuryFooter",
  methods: {
    goCollection(category) {
      this.$router.push({ name: "Collection", query: { category } });
    },
  },
};
</script>

<style scoped>
.luxury-footer {
  position: relative;
  overflow: hidden;
  color: #fff8ee;
  background:
    radial-gradient(circle at 10% 10%, rgba(218, 166, 82, 0.22), transparent 28%),
    linear-gradient(135deg, #2a0708 0%, #5b0d10 48%, #1d0d09 100%);
}

.luxury-footer::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image:
    linear-gradient(30deg, rgba(255, 230, 180, 0.5) 12%, transparent 12.5%, transparent 87%, rgba(255, 230, 180, 0.5) 87.5%),
    linear-gradient(150deg, rgba(255, 230, 180, 0.5) 12%, transparent 12.5%, transparent 87%, rgba(255, 230, 180, 0.5) 87.5%);
  background-size: 72px 72px;
}

.footer-aura {
  position: absolute;
  inset: auto 8% 0 auto;
  width: 360px;
  height: 360px;
  background: rgba(212, 165, 92, 0.2);
  filter: blur(80px);
}

.footer-inner {
  position: relative;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 82px 0 32px;
}

.footer-brand {
  max-width: 820px;
}

.footer-kicker {
  margin: 0 0 12px;
  color: #e6bd75;
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 700;
}

.footer-brand h2,
.newsletter-panel h3 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: 0;
}

.footer-brand h2 {
  font-size: clamp(32px, 5vw, 60px);
  line-height: 1.05;
}

.footer-brand p {
  max-width: 650px;
  margin-top: 22px;
  color: #f0dcc3;
  line-height: 1.8;
}

.newsletter-panel {
  margin: 54px 0;
  display: grid;
  grid-template-columns: auto 1fr minmax(280px, 420px);
  align-items: center;
  gap: 24px;
  padding: 24px;
  border: 1px solid rgba(230, 189, 117, 0.32);
  background: rgba(255, 249, 238, 0.08);
  backdrop-filter: blur(14px);
}

.seal {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(230, 189, 117, 0.6);
  border-radius: 50%;
  color: #e6bd75;
  font-family: Georgia, "Times New Roman", serif;
}

.newsletter-panel h3 {
  font-size: clamp(22px, 3vw, 34px);
}

.newsletter-form {
  display: flex;
  border-bottom: 1px solid rgba(230, 189, 117, 0.7);
}

.newsletter-form input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #fff8ee;
  padding: 14px 4px;
}

.newsletter-form input::placeholder {
  color: rgba(255, 248, 238, 0.68);
}

.newsletter-form button,
.footer-column button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.newsletter-form button {
  color: #e6bd75;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  padding: 0 4px 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr repeat(3, 1fr);
  gap: 34px;
  padding-top: 36px;
  border-top: 1px solid rgba(230, 189, 117, 0.22);
}

.footer-column h4 {
  margin: 0 0 18px;
  color: #e6bd75;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.footer-column p,
.footer-column a,
.footer-column button {
  display: block;
  width: fit-content;
  margin: 0 0 10px;
  color: #f1dfca;
  text-decoration: none;
  line-height: 1.7;
  font-size: 14px;
  text-align: left;
  transition: color 220ms ease, transform 220ms ease;
}

.footer-column a:hover,
.footer-column button:hover {
  color: #fff;
  transform: translateX(4px);
}

.social-row {
  display: flex;
  gap: 10px;
  margin-top: 18px;
}

.social-row span {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(230, 189, 117, 0.35);
  border-radius: 50%;
  color: #e6bd75;
  transition: transform 220ms ease, background 220ms ease;
}

.social-row span:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.08);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-top: 30px;
  margin-top: 36px;
  border-top: 1px solid rgba(230, 189, 117, 0.16);
  color: rgba(255, 248, 238, 0.74);
  font-size: 12px;
}

@media (max-width: 900px) {
  .newsletter-panel,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    margin-top: 10px;
  }
}

@media (max-width: 620px) {
  .footer-inner {
    width: min(100% - 32px, 1180px);
    padding-top: 60px;
  }

    .newsletter-panel {
    padding: 16px;
  }

  .newsletter-form {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    gap: 6px;
  }

  .newsletter-form input {
    width: 70%;
    font-size: 12px;
    padding: 10px 12px;
  }

  .newsletter-form button {
    width: 30%;
    min-width: 70px;
    font-size: 11px;
    padding: 10px 8px;
  }

  .footer-bottom {
    flex-direction: column;
  }
}
</style>
