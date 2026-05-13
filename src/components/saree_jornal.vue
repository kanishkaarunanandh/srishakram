<template>
  <div class="journal-back-wrap">
    <button class="journal-back-button" type="button" @click="goBackToJournal">
      <span>←</span>
      Back to Saree Journal
    </button>
  </div>

  <!-- HERO -->
  <div
    class="hero"
    :style="{ backgroundImage: `url(${heroImg})` }"
  >
    <div class="hero-content">
      <p class="tagline">Handcrafted Excellence</p>

      <h1>
        The Art of <br />
        Pure Silk Sarees
      </h1>

      <p class="desc">
        Discover the timeless elegance of handwoven silk sarees,
        crafted with centuries-old tradition and unparalleled artistry.
      </p>

      <div class="buttons">
        <button class="btn primary">COLLECTION</button>
        <button class="btn outline">LEARN OUR STORY</button>
      </div>
    </div>
  </div>

  <!-- JOURNEY SECTION (Static) -->
  <section class="journey">
    <h2 class="journey-title">The Journey of the Saree</h2>

    <div class="journey-track">
      <div
        class="journey-step"
        v-for="(step, index) in staticSteps"
        :key="index"
      >
        <div class="icon-wrapper">
          <img :src="step.icon" alt="icon" class="step-icon" />
        </div>
        <h4>{{ step.title }}</h4>
        <p>{{ step.desc }}</p>
      </div>
    </div>
  </section>

  <hr class="divider"/>
  <hr class="divider"/>

  <!-- HERITAGE SECTION -->
  <section class="heritage">
    <h2 class="heritage-title">OUR HERITAGE</h2>

    <div
      v-for="(step, index) in steps"
      :key="index"
      class="heritage-item"
      :class="{ 'reverse': index % 2 !== 0 }"
    >
      <div class="heritage-image">
        <img
          :src="resolveMediaUrl(step.image)"
          :alt="step.title"
        />
      </div>
      <div class="heritage-text">
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </section>

  <hr class="divider"/>
  <hr class="divider"/>

  <!-- ZARI CERTIFICATE -->
  <section class="zari-section" v-show="displayZari">
    <h2 class="zari-title">Zari Certificate</h2>
    <div class="zari-content">
      <div class="zari-image">
        <img :src="resolveMediaUrl(zari)" alt="Zari Certificate"/>
      </div>
      <div class="zari-text">
        <p>
          A Zari Certificate ensures the authenticity and purity of the zari used in the saree.
        </p>
        <p>
          This Royal Blue Kanchipuram Silk Saree is a celebration of tradition, craftsmanship, and elegance. 
          Every thread reflects the dedication of skilled artisans who bring centuries-old weaving techniques to life.
        </p>
        <p>
          This Royal Blue Kanchipuram Silk Saree is a celebration of tradition, craftsmanship, and elegance. 
          Every thread reflects the dedication of skilled artisans who bring centuries-old weaving techniques to life.
        </p>
      </div>
    </div>
  </section>

  <hr class="divider"/>
  <hr class="divider"/>

  <!-- REVIEW SECTION -->
  <section
    class="review-section"
    v-if="customerReview.length"
  >
    <h2 class="review-title">Customer Review</h2>

    <div
      class="review-card"
      v-for="(value, i) in customerReview"
      :key="i"
    >
      <div class="review-image">
        <img :src="resolveMediaUrl(value.image)" alt="Customer Saree" />
      </div>

      <div class="review-content">
        <span class="review-label">Customer Comments</span>

        <p class="review-text">
          "{{ value.content }}"
        </p>

        <div class="review-footer">
          <span class="review-name">
            — Verified Buyer {{ value.customerName }}
          </span>

          <a
            v-if="value.video"
            href="#"
            class="video-link"
          >
            Watch Customer Video →
          </a>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import api from "@/adminfolder/axios";
import step1 from '@/assets/step1.png'
import step2 from '@/assets/step2.png'
import step3 from '@/assets/step3.png'
import step4 from '@/assets/step4.png'
import { resolveMediaUrl } from '@/utils/mediaUrl'

export default {
  data() {
    return {
      heroImg: "",
      steps: [],
      customerReview: [],
      zari: "",
      reviewImg: "",
      staticSteps: [
        { icon: step1, title: 'Silk Selection', desc: 'Finest silk from Karnataka' },
        { icon: step2, title: 'Dyeing Process', desc: 'Natural dyes for rich hues' },
        { icon: step3, title: 'Hand Weaving', desc: '10 days of craftsmanship' },
        { icon: step4, title: 'Final Finishing', desc: 'Zari work & quality check' }
      ],
      displayZari: false,
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchJournal(id);
  },
  methods: {
    resolveMediaUrl,
    goBackToJournal() {
      if (window.history.length > 1) {
        this.$router.back();
        return;
      }

      this.$router.push('/all_journal');
    },
    async fetchJournal(id) {
      try {
        const res = await api.get(
          `api/saree-journal/${id}`
        );

        const data = res.data;

        this.heroImg = resolveMediaUrl(data.heroImage);
        this.zari = resolveMediaUrl(data.zariCertificateImage);
        this.displayZari = !!this.zari;

        this.steps = Array.isArray(data.heritageSteps)
          ? data.heritageSteps
          : JSON.parse(data.heritageSteps || "[]");

        this.customerReview = Array.isArray(data.customerReview)
          ? data.customerReview
          : JSON.parse(data.customerReview || "[]");

      } catch (err) {
        console.error("Failed to fetch saree journal:", err);
      }
    }
  }
}
</script>

<style scoped>
/* Base styles */
* {
  box-sizing: border-box;
}

.journal-back-wrap {
  position: relative;
  z-index: 3;
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto -86px;
  padding-top: 118px;
}

.journal-back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(217, 174, 102, 0.58);
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.92);
  color: #5f0d10;
  padding: 10px 18px;
  box-shadow: 0 14px 30px rgba(45, 9, 9, 0.16);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.journal-back-button:hover {
  transform: translateY(-2px);
  border-color: rgba(217, 174, 102, 0.9);
  box-shadow: 0 18px 36px rgba(45, 9, 9, 0.2);
}

.divider {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  border: none;
  border-top: 1px solid #e0d3c4;
}

/* Hero Section */
.hero {
  width: 100%;
  height: 100vh;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.hero-content {
  position: relative;
  color: white;
  max-width: 600px;
  padding: 20% 30px 30px;
}

.tagline {
  color: #ff5722;
  letter-spacing: 1px;
  margin-bottom: 10px;
  font-size: 14px;
}

h1 {
  font-size: 48px;
  line-height: 1.2;
  margin-bottom: 15px;
}

.desc {
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.6;
}

.buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
}

.primary {
  background: #ff5722;
  border: none;
  color: white;
}

.primary:hover {
  background: #e64a19;
}

.outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Journey Section */
.journey {
  padding: 90px 40px;
  text-align: center;
}

.journey-title {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 70px;
  color: #5a3a2e;
}

.journey-track {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  position: relative;
  gap: 20px;
}

.journey-step {
  flex: 1;
  padding: 0 15px;
  position: relative;
  z-index: 1;
}

.icon-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e0d3c4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
}

.step-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.journey-step h4 {
  font-size: 16px;
  font-weight: 500;
  color: #5a3a2e;
  margin-bottom: 6px;
}

.journey-step p {
  font-size: 14px;
  color: #7a6a5f;
  line-height: 1.5;
}

/* Heritage Section */
.heritage {
  padding: 50px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.heritage-title {
  text-align: center;
  color: #5a3a2e;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 70px;
}

.heritage-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 60px;
  gap: 40px;
}

.heritage-item.reverse {
  flex-direction: row-reverse;
}

.heritage-image {
  border: 1px solid black;
  border-radius: 60px;
  width: 45%;
  max-width: 500px;
  height: 45vh;
  min-height: 300px;
  overflow: hidden;
}

.heritage-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 60px;
}

.heritage-text {
  width: 45%;
  max-width: 500px;
}

.heritage-text h3 {
  font-size: 24px;
  color: #5a3a2e;
  margin-bottom: 15px;
}

.heritage-text p {
  font-size: 16px;
  line-height: 1.8;
  color: #3d2a20;
}

/* Zari Section */
.zari-section {
  padding: 50px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.zari-title {
  text-align: center;
  color: #5a3a2e;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 40px;
}

.zari-content {
  display: flex;
  justify-content: space-around;
  gap: 40px;
  align-items: flex-start;
}

.zari-image {
  border: 1px solid black;
  width: 45%;
  max-width: 400px;
  height: 70vh;
  min-height: 400px;
}

.zari-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.zari-text {
  width: 45%;
  max-width: 400px;
}

.zari-text p {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.8;
  color: #3d2a20;
}

/* Review Section */
.review-section {
  padding: 100px 40px;
  background: #fff;
}

.review-title {
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  color: #5a3a2e;
  margin-bottom: 60px;
}

.review-card {
  max-width: 1100px;
  margin: 0 auto 60px;
  display: flex;
  gap: 60px;
  align-items: center;
}

.review-image {
  flex: 1;
}

.review-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  object-fit: cover;
}

.review-content {
  flex: 1;
}

.review-label {
  font-size: 14px;
  color: #b36b2c;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 10px;
}

.review-text {
  font-size: 18px;
  line-height: 1.8;
  color: #3d2a20;
  margin-bottom: 30px;
  position: relative;
  padding-left: 20px;
}

.review-text::before {
  content: "";
  font-size: 60px;
  color: #e5d5c6;
  position: absolute;
  left: -25px;
  top: -20px;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.review-name {
  font-size: 14px;
  color: #7a6a5f;
}

.video-link {
  font-size: 14px;
  color: #b36b2c;
  text-decoration: none;
  font-weight: 500;
}

.video-link:hover {
  text-decoration: underline;
}

/* ========== MOBILE RESPONSIVE STYLES ========== */

@media (max-width: 768px) {
  .journal-back-wrap {
    width: calc(100% - 32px);
    margin-bottom: -78px;
    padding-top: 100px;
  }

  .journal-back-button {
    padding: 9px 14px;
    font-size: 10px;
  }

  /* Hero Section */
  .hero {
    height: 85vh;
    min-height: 550px;
    background-position: center center;
    background-size: cover;
    display: flex;
    align-items: flex-end;
  }

  .hero::before {
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.2) 0%, 
      rgba(0, 0, 0, 0.4) 50%, 
      rgba(0, 0, 0, 0.7) 100%);
  }

  .hero-content {
    padding: 30px 25px 40px;
    max-width: 100%;
    width: 100%;
  }

  .tagline {
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 15px;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .desc {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 25px;
    opacity: 0.95;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }

  .buttons {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .btn {
    width: auto;
    max-width: 200px;
    text-align: center;
    padding: 12px 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  /* Journey Section */
  .journey {
    padding: 70px 25px;
    background: linear-gradient(to bottom, #fafaf8 0%, #ffffff 100%);
  }

  .journey-title {
    font-size: 26px;
    margin-bottom: 50px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .journey-track {
    flex-direction: column;
    gap: 35px;
    max-width: 100%;
  }

  .journey-step {
    padding: 25px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(90, 58, 46, 0.08);
    transition: transform 0.3s ease;
  }

  .journey-step:active {
    transform: scale(0.98);
  }

  .icon-wrapper {
    width: 90px;
    height: 90px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(90, 58, 46, 0.1);
  }

  .step-icon {
    width: 70px;
    height: 70px;
  }

  .journey-step h4 {
    font-size: 17px;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .journey-step p {
    font-size: 14px;
    line-height: 1.6;
  }

  /* Heritage Section */
  .heritage {
    padding: 70px 25px;
    background: #fafaf8;
  }

  .heritage-title {
    font-size: 26px;
    margin-bottom: 50px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .heritage-item,
  .heritage-item.reverse {
    flex-direction: column;
    gap: 25px;
    margin-bottom: 50px;
    background: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(90, 58, 46, 0.08);
  }

  .heritage-image,
  .heritage-text {
    width: 100%;
    max-width: 100%;
  }

  .heritage-image {
    height: 280px;
    border-radius: 16px;
    border: none;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .heritage-image img {
    border-radius: 16px;
    transition: transform 0.3s ease;
  }

  .heritage-text {
    padding: 0 5px;
  }

  .heritage-text h3 {
    font-size: 22px;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .heritage-text p {
    font-size: 15px;
    line-height: 1.8;
    color: #5a4a40;
  }

  /* Zari Section */
  .zari-section {
    padding: 70px 25px;
    background: white;
  }

  .zari-title {
    font-size: 26px;
    margin-bottom: 50px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .zari-content {
    flex-direction: column;
    gap: 30px;
  }

  .zari-image,
  .zari-text {
    width: 100%;
    max-width: 100%;
  }

  .zari-image {
    height: auto;
    min-height: 350px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }

  .zari-image img {
    border-radius: 16px;
  }

  .zari-text {
    background: #fafaf8;
    padding: 25px;
    border-radius: 16px;
  }

  .zari-text p {
    font-size: 15px;
    line-height: 1.8;
    margin-bottom: 18px;
    color: #5a4a40;
  }

  .zari-text p:last-child {
    margin-bottom: 0;
  }

  /* Review Section */
  .review-section {
    padding: 70px 25px;
    background: linear-gradient(to bottom, #fafaf8 0%, #ffffff 100%);
  }

  .review-title {
    font-size: 26px;
    margin-bottom: 50px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .review-card {
    flex-direction: column;
    gap: 25px;
    margin-bottom: 40px;
    background: white;
    padding: 25px;
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(90, 58, 46, 0.08);
  }

  .review-image {
    width: 100%;
  }

  .review-image img {
    max-width: 100%;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .review-content {
    padding: 0;
  }

  .review-label {
    font-size: 12px;
    font-weight: 600;
  }

  .review-text {
    font-size: 16px;
    line-height: 1.9;
    padding-left: 20px;
    margin-bottom: 25px;
  }

  .review-text::before {
    font-size: 50px;
    left: -10px;
    top: -18px;
  }

  .review-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .review-name {
    font-size: 13px;
    font-weight: 500;
  }

  .video-link {
    font-size: 13px;
    font-weight: 600;
  }

  /* Divider */
  .divider {
    margin: 0 25px;
    max-width: calc(100% - 50px);
  }
}

@media (max-width: 480px) {
  /* Hero Section */
  .hero {
    height: 80vh;
    min-height: 500px;
    background-position: center center;
  }

  .hero::before {
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.15) 0%, 
      rgba(0, 0, 0, 0.35) 40%, 
      rgba(0, 0, 0, 0.75) 100%);
  }

  .hero-content {
    padding: 25px 20px 35px;
  }

  .tagline {
    font-size: 10px;
    letter-spacing: 1.2px;
  }

  h1 {
    font-size: 28px;
    line-height: 1.25;
    margin-bottom: 12px;
  }

  .desc {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 22px;
  }

  .btn {
    padding: 11px 18px;
    font-size: 10px;
    max-width: 180px;
  }

  /* Section Titles */
  .journey-title,
  .heritage-title,
  .zari-title,
  .review-title {
    font-size: 23px;
    margin-bottom: 40px;
  }

  /* Journey Section */
  .journey {
    padding: 60px 20px;
  }

  .journey-step {
    padding: 20px;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .step-icon {
    width: 60px;
    height: 60px;
  }

  .journey-step h4 {
    font-size: 16px;
  }

  .journey-step p {
    font-size: 13px;
  }

  /* Heritage Section */
  .heritage {
    padding: 60px 20px;
  }

  .heritage-item,
  .heritage-item.reverse {
    padding: 15px;
    margin-bottom: 40px;
  }

  .heritage-image {
    height: 240px;
    border-radius: 12px;
  }

  .heritage-image img {
    border-radius: 12px;
  }

  .heritage-text h3 {
    font-size: 20px;
  }

  .heritage-text p {
    font-size: 14px;
  }

  /* Zari Section */
  .zari-section {
    padding: 60px 20px;
  }

  .zari-image {
    min-height: 300px;
    border-radius: 12px;
  }

  .zari-image img {
    border-radius: 12px;
  }

  .zari-text {
    padding: 20px;
  }

  .zari-text p {
    font-size: 14px;
  }

  /* Review Section */
  .review-section {
    padding: 60px 20px;
  }

  .review-card {
    padding: 20px;
    margin-bottom: 30px;
  }

  .review-text {
    font-size: 15px;
    padding-left: 15px;
  }

  .review-text::before {
    font-size: 45px;
  }

  /* Divider */
  .divider {
    margin: 0 20px;
    max-width: calc(100% - 40px);
  }
}
</style>
