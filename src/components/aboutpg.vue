<template>
  <main class="about-page">
    <section class="about-hero">
      <img :src="heroImage" alt="Sri Shakram silk showroom" class="hero-media" />
      <div class="hero-veiling"></div>
      <div class="hero-content reveal " style="margin-top: 14%;">
        <p class="eyebrow">Kanchipuram Heritage House</p>
        <h1>Sarees with temple memory and modern poise.</h1>
        <p>
          Sri Shakram is a silk saree destination shaped by South Indian tradition,
          warm showroom hospitality, and a refined eye for color, zari, and drape.
        </p>
      </div>
    </section>

    <section class="story-intro">
      <div>
        <p class="eyebrow dark">Our Story</p>
        <h2>Where a saree is selected slowly, celebrated fully, and remembered for years.</h2>
      </div>
      <p>
        We believe luxury is not noise. It is the quiet weight of pure silk, the glow of zari,
        the confidence of a balanced border, and the care of choosing the right saree for a
        wedding, ritual, reception, or family milestone.
      </p>
    </section>

    <section class="temple-panel">
      <div class="temple-image">
        <img :src="legacyImage" alt="Traditional silk display" />
      </div>
      <div class="temple-copy reveal">
        <span class="vertical-mark">Sri Shakram</span>
        <p class="eyebrow dark">Heritage and Craft</p>
        <h2>Traditional Tamil richness, edited with boutique restraint.</h2>
        <p>
          Our collections are curated around the language of Kanchipuram silk: gleaming pallus,
          sculpted borders, auspicious colors, and motifs that feel ceremonial without becoming
          crowded. The result is a saree that feels grand, graceful, and deeply personal.
        </p>
      </div>
    </section>

    <section class="values-band">
      <article v-for="item in values" :key="item.title" class="value-card reveal">
        <span>{{ item.no }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </section>

    <section class="craft-section">
      <div class="section-heading">
        <p class="eyebrow dark">The Boutique Experience</p>
        <h2>From first glance to final fold, every detail is composed.</h2>
      </div>

      <div class="craft-grid">
        <article v-for="item in craft" :key="item.title" class="craft-card reveal">
          <img :src="item.image" :alt="item.title" />
          <div>
            <p>{{ item.kicker }}</p>
            <h3>{{ item.title }}</h3>
            <span>{{ item.text }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="journey-section">
      <div class="journey-copy">
        <p class="eyebrow dark">Journey</p>
        <h2>A luxury saree house built around trust.</h2>
        <p>
          The Sri Shakram experience is personal: guided selection, considered styling,
          thoughtful customization, and silk pieces that feel worthy of your occasion.
        </p>
      </div>
      <div class="timeline">
        <div v-for="step in timeline" :key="step.year" class="timeline-item">
          <strong>{{ step.year }}</strong>
          <span>{{ step.text }}</span>
        </div>
      </div>
    </section>

    <section class="atelier-section">
      <div class="video-frame" @click="dialog = true">
        <video :src="defaultVideo" autoplay muted loop playsinline></video>
        <button type="button">View Atelier Mood</button>
      </div>
      <div class="atelier-card reveal">
        <p class="eyebrow dark">Why Sri Shakram</p>
        <h2>For women who want heritage without compromise.</h2>
        <p>
          Our sarees are chosen for presence, comfort, and ceremony. Every collection is designed
          to feel premium in person and effortless to explore online.
        </p>
        <button type="button" @click="$router.push({ name: 'Collection', query: { category: 'All Kanchipuram Silk Saree' } })">
          Explore Silks
        </button>
      </div>
    </section>

    <!-- <section class="gallery-strip">
      <img :src="galleryOne" alt="Saree texture" />
      <img :src="galleryTwo" alt="Silk craft" />
      <img :src="galleryThree" alt="Traditional saree detail" />
    </section> -->

    <v-dialog v-model="dialog" max-width="780px">
      <v-card class="video-dialog">
        <v-card-title class="dialog-title">
          <span>Sri Shakram Atelier</span>
          <v-btn icon variant="text" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <video ref="modalVideo" :src="defaultVideo" controls autoplay playsinline class="modal-video"></video>
        </v-card-text>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import heroImage from '@/assets/about1.jpg'
import legacyImage from '@/assets/ab1.jpg'
import craftImageOne from '@/assets/Making Process.jpg'
import craftImageTwo from '@/assets/Making Process (1).jpg'
import craftImageThree from '@/assets/about2.jpg'
import galleryOne from '@/assets/about2.jpg'
import galleryTwo from '@/assets/about3.jpg'
import galleryThree from '@/assets/section4.jpg'
import demoVideo from '@/assets/video.mp4'

export default {
  name: 'AboutPg',
  data() {
    return {
      dialog: false,
      heroImage,
      legacyImage,
      galleryOne,
      galleryTwo,
      galleryThree,
      defaultVideo: demoVideo,
      values: [
        {
          no: '01',
          title: 'Silk With Soul',
          text: 'Curated color, drape, and texture for sarees that feel ceremonial and wearable.',
        },
        {
          no: '02',
          title: 'Zari Discipline',
          text: 'Richness is balanced with restraint so every border and pallu feels elegant.',
        },
        {
          no: '03',
          title: 'Showroom Care',
          text: 'A warm, guided buying experience for brides, families, and collectors.',
        },
      ],
      craft: [
        {
          kicker: 'Texture',
          title: 'Pure Silk Presence',
          text: 'Soft luster, graceful fall, and a tactile richness suited for meaningful occasions.',
          image: craftImageOne,
        },
        {
          kicker: 'Detail',
          title: 'Borders With Character',
          text: 'Temple-inspired lines, classic motifs, and zari highlights chosen with precision.',
          image: craftImageTwo,
        },
        {
          kicker: 'Styling',
          title: 'Occasion-Ready Curation',
          text: 'Collections for weddings, receptions, festivals, gifting, and heirloom wardrobes.',
          image: craftImageThree,
        },
      ],
      timeline: [
        { year: 'Heritage', text: 'Inspired by Kanchipuram silk traditions and Tamil ceremonial elegance.' },
        { year: 'Curation', text: 'Each saree is selected for color harmony, border balance, and finish.' },
        { year: 'Experience', text: 'Customers receive boutique guidance from discovery to checkout.' },
      ],
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
      const video = this.$refs.modalVideo
      if (video) video.pause()
    },
  },
}
</script>

<style scoped>
.about-page {
  --maroon: #5f0d10;
  --maroon-deep: #2d0909;
  --gold: #d9ae66;
  --cream: #fff8ee;
  --beige: #f2e2ca;
  --ink: #28150f;
  background: var(--cream);
  color: var(--ink);
  overflow: hidden;
}

.about-hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: flex-end;
  isolation: isolate;
}

.hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.hero-veiling {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(41, 7, 7, 0.88), rgba(41, 7, 7, 0.4) 56%, rgba(41, 7, 7, 0.08)),
    linear-gradient(0deg, rgba(28, 8, 5, 0.72), rgba(28, 8, 5, 0.08) 58%);
  z-index: -1;
}

.hero-content {
  width: min(980px, calc(100% - 48px));
  margin: 0 auto 96px;
  color: #fff;
}

.eyebrow {
  margin: 0 0 16px;
  color: var(--gold);
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 700;
}

.eyebrow.dark {
  color: #9b5b2f;
}

h1,
h2 {
  font-family: Georgia, 'Times New Roman', serif;
  letter-spacing: 0;
  font-weight: 400;
}

.hero-content h1 {
  max-width: 900px;
  margin: 0;
  font-size: clamp(44px, 7vw, 96px);
  line-height: 0.95;
}

.hero-content p:last-child {
  max-width: 650px;
  margin-top: 24px;
  color: #f4e0c8;
  font-size: 18px;
  line-height: 1.8;
}

.story-intro,
.temple-panel,
.craft-section,
.journey-section,
.atelier-section {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

.story-intro {
  padding: 100px 0 76px;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 56px;
  align-items: end;
}

.story-intro h2,
.temple-copy h2,
.section-heading h2,
.journey-copy h2,
.atelier-card h2 {
  margin: 0;
  font-size: clamp(32px, 4.8vw, 58px);
  line-height: 1.05;
}

.story-intro > p,
.temple-copy p,
.craft-card span,
.journey-copy p,
.timeline-item span,
.atelier-card p {
  color: #664736;
  font-size: 16px;
  line-height: 1.8;
}

.temple-panel {
  display: grid;
  grid-template-columns: minmax(320px, 0.92fr) minmax(320px, 1fr);
  gap: 34px;
  min-height: 620px;
}

.temple-image,
.temple-copy,
.craft-card,
.video-frame,
.atelier-card {
  border: 1px solid rgba(118, 58, 28, 0.18);
}

.temple-image {
  overflow: hidden;
}

.temple-image img,
.craft-card img,
.gallery-strip img,
.video-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.temple-copy {
  position: relative;
  background: #fffdf8;
  padding: clamp(34px, 6vw, 78px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vertical-mark {
  position: absolute;
  right: 24px;
  top: 28px;
  writing-mode: vertical-rl;
  color: rgba(95, 13, 16, 0.18);
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.values-band {
  margin: 96px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--maroon-deep);
  color: #fff8ee;
}

.value-card {
  min-height: 310px;
  padding: clamp(28px, 4vw, 54px);
  border-right: 1px solid rgba(217, 174, 102, 0.24);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent),
    var(--maroon);
}

.value-card span {
  color: var(--gold);
  letter-spacing: 0.24em;
  font-size: 12px;
}

.value-card h3 {
  margin: 50px 0 14px;
  font-size: 26px;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
}

.value-card p {
  color: #edd8bf;
  line-height: 1.8;
}

.craft-section {
  padding-bottom: 100px;
}

.section-heading {
  max-width: 780px;
  margin-bottom: 42px;
}

.craft-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.craft-card {
  background: #fffdf8;
  min-height: 560px;
  display: grid;
  grid-template-rows: 1fr auto;
  transition: transform 420ms ease, box-shadow 420ms ease;
}

.craft-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 50px rgba(95, 13, 16, 0.12);
}

.craft-card img {
  min-height: 340px;
}

.craft-card div {
  padding: 28px;
}

.craft-card p {
  margin: 0 0 10px;
  color: #a76a34;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.craft-card h3 {
  margin: 0 0 12px;
  color: #4b1714;
  font-size: 24px;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
}

.journey-section {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  gap: 64px;
  padding: 86px 0;
  border-top: 1px solid rgba(118, 58, 28, 0.14);
  border-bottom: 1px solid rgba(118, 58, 28, 0.14);
}

.timeline {
  display: grid;
  gap: 16px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 22px;
  align-items: start;
  padding: 22px 0;
  border-bottom: 1px solid rgba(118, 58, 28, 0.14);
}

.timeline-item strong {
  color: var(--maroon);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 24px;
  font-weight: 400;
}

.atelier-section {
  padding: 100px 0;
  display: grid;
  grid-template-columns: 0.96fr 1fr;
  gap: 34px;
  align-items: stretch;
}

.video-frame {
  position: relative;
  min-height: 560px;
  overflow: hidden;
  background: #1d0d09;
  cursor: pointer;
}

.video-frame button,
.atelier-card button {
  border: 1px solid rgba(217, 174, 102, 0.55);
  background: rgba(95, 13, 16, 0.84);
  color: #fff8ee;
  padding: 13px 22px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
  cursor: pointer;
}

.video-frame button {
  position: absolute;
  right: 24px;
  bottom: 24px;
}

.atelier-card {
  background:
    linear-gradient(135deg, rgba(217, 174, 102, 0.14), transparent 38%),
    #fffdf8;
  padding: clamp(34px, 5vw, 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.atelier-card button {
  width: fit-content;
  margin-top: 28px;
  background: var(--maroon);
}

.gallery-strip {
  display: grid;
  grid-template-columns: 1.2fr 0.85fr 1fr;
  height: 440px;
}

.video-dialog {
  border-radius: 0;
}

.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--maroon);
  font-family: Georgia, 'Times New Roman', serif;
}

.modal-video {
  width: 100%;
  max-height: 72vh;
  display: block;
  background: #000;
}

.reveal {
  animation: revealUp 780ms ease both;
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .about-page {
    background:
      radial-gradient(circle at 12% 2%, rgba(217, 174, 102, 0.14), transparent 26%),
      linear-gradient(180deg, #fff8ee 0%, #f5e7d3 100%);
  }

  .about-hero {
    min-height: 76vh;
    align-items: flex-end;
  }

  .hero-veiling {
    background:
      linear-gradient(180deg, rgba(41, 7, 7, 0.16), rgba(41, 7, 7, 0.72)),
      linear-gradient(90deg, rgba(41, 7, 7, 0.68), rgba(41, 7, 7, 0.18));
  }

  .hero-content {
    margin-top: 0 !important;
  }

  .story-intro,
  .temple-panel,
  .journey-section,
  .atelier-section {
    grid-template-columns: 1fr;
  }

  .values-band,
  .craft-grid {
    grid-template-columns: 1fr;
  }

  .temple-image,
  .video-frame {
    min-height: 420px;
  }

  .story-intro,
  .temple-panel,
  .craft-section,
  .journey-section,
  .atelier-section {
    width: min(100% - 40px, 760px);
  }

  .story-intro {
    padding: 76px 0 52px;
    gap: 24px;
  }

  .temple-panel,
  .craft-card,
  .video-frame,
  .atelier-card,
  .journey-section {
    border-radius: 22px;
    box-shadow: 0 18px 42px rgba(72, 23, 12, 0.09);
    overflow: hidden;
  }

  .values-band {
    width: min(100% - 40px, 760px);
    margin: 72px auto;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 20px 44px rgba(45, 9, 9, 0.16);
  }

  .value-card {
    min-height: auto;
    padding: 34px 28px;
    border-right: 0;
    border-bottom: 1px solid rgba(217, 174, 102, 0.22);
  }

  .value-card h3 {
    margin-top: 28px;
  }

  .craft-grid {
    gap: 18px;
  }

  .craft-card {
    min-height: auto;
  }

  .craft-card img {
    min-height: 280px;
    max-height: 340px;
  }

  .journey-section {
    padding: 42px 28px;
    background: rgba(255, 253, 248, 0.76);
    border-color: rgba(118, 58, 28, 0.16);
  }

  .atelier-section {
    gap: 22px;
  }

  .gallery-strip {
    grid-template-columns: 1fr;
    height: auto;
  }

  .gallery-strip img {
    height: 320px;
  }
}

@media (max-width: 620px) {
  .about-page {
    overflow-x: hidden;
  }

  .about-hero {
    min-height: 68vh;
  }

  .hero-content,
  .story-intro,
  .temple-panel,
  .craft-section,
  .journey-section,
  .atelier-section {
    width: min(100% - 32px, 1180px);
  }

  .hero-content {
    margin-bottom: 38px;
    padding: 0 2px;
  }

  .hero-content h1 {
    font-size: clamp(34px, 12vw, 48px);
    line-height: 1.03;
  }

  .hero-content p:last-child {
    font-size: 15px;
    line-height: 1.65;
    margin-top: 16px;
  }

  .story-intro {
    padding: 58px 0 36px;
  }

  .story-intro h2,
  .temple-copy h2,
  .section-heading h2,
  .journey-copy h2,
  .atelier-card h2 {
    font-size: clamp(28px, 9vw, 38px);
    line-height: 1.1;
  }

  .story-intro > p,
  .temple-copy p,
  .craft-card span,
  .journey-copy p,
  .timeline-item span,
  .atelier-card p {
    font-size: 14px;
    line-height: 1.75;
  }

  .temple-image {
    min-height: 300px;
    max-height: 360px;
  }

  .temple-copy,
  .atelier-card {
    padding: 28px 22px;
  }

  .vertical-mark {
    display: none;
  }

  .values-band {
    width: calc(100% - 32px);
    margin: 52px auto;
    border-radius: 20px;
  }

  .value-card {
    min-height: auto;
    padding: 28px 22px;
  }

  .value-card h3 {
    margin: 22px 0 10px;
    font-size: 23px;
  }

  .value-card p {
    margin-bottom: 0;
    font-size: 14px;
  }

  .craft-section,
  .atelier-section {
    padding-bottom: 56px;
  }

  .section-heading {
    margin-bottom: 24px;
  }

  .craft-card div {
    padding: 22px;
  }

  .craft-card img {
    min-height: 240px;
  }

  .journey-section {
    padding: 32px 22px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .video-frame {
    min-height: 320px;
  }

  .video-frame button,
  .atelier-card button {
    padding: 11px 15px;
    font-size: 10px;
  }

  .video-frame button {
    right: 16px;
    bottom: 16px;
  }
}
</style>
