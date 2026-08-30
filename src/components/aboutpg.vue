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

<style scoped src="@/components/stylesheets/aboutpg.css"></style>
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


