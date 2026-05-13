<template>
  <!-- Hero Video -->
  <div class="video-wrapper" v-if="herovideo">
    <video autoplay muted playsinline loop class="hero-video">
      <source :src="herovideo" type="video/mp4" />
    </video>
  </div>

  <!-- Most Loved Silk Collections -->
  <!-- Most Loved Silk Collections -->
<section class="collections-section">
  <div class="collections-header">
    <p class="collections-label">Our Curation</p>
    <h3 class="collections-title">Most Loved Silk Collections</h3>
  </div>

  <div class="collections-bento">
    <div
      v-for="(item, index) in imagesnest"
      :key="index"
      class="bento-card"
      :class="{ 'bento-card--featured': index === 0 }"
      @click="showcategory(item.value)"
    >
      <div class="bento-bg" :style="{ backgroundImage: `url(${item.src})` }"></div>
      <div class="bento-overlay"></div>
      <div class="bento-body">
        <p class="bento-num">0{{ index + 1 }}{{ index === 0 ? ' / FEATURED' : '' }}</p>
        <div class="bento-divider"></div>
        <p class="bento-name">{{ item.title }}</p>
        <div class="bento-cta">
          <span class="bento-cta-line"></span>
          Explore
        </div>
      </div>
    </div>
  </div>
</section>

  <!-- New Soft Silk Sarees -->
  <section class="section-container">
    <h3 class="section-title">New Soft Silk Sarees</h3>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image-wrap" @click="showdetails(product)">
          <img :src="getImageUrl(product.img)" class="product-image" />
          
          <div v-if="product.instock || product.newArrival" class="ribbon">
            <span>
              {{ product.instock && product.newArrival ? 'NEW & INSTOCK' : product.newArrival ? 'NEW ARRIVAL' : 'INSTOCK' }}
            </span>
          </div>
        </div>

        <p class="product-title">{{ product.title }}</p>
        <p class="product-price">Rs. {{ product.price }} (MRP inclusive of all taxes)</p>
      </div>
    </div>

    <v-btn class="view-all-btn" @click="showcategory('Korvai')">
      VIEW ALL
    </v-btn>
  </section>

  <!-- Watch and Buy Section -->
  <section class="section-container">
    <h2 class="main-heading">Watch and Buy</h2>

    <div class="videos-grid">
      <div 
        v-for="(video, index) in videoList" 
        :key="index" 
        class="video-card"
        :class="{ 'mobile-hidden': index >= 4 }"
      >
        <video :src="video" autoplay muted loop playsinline></video>
      </div>
    </div>
  </section>

  <!-- Experience Section -->
  <section class="experience-section-modern">
  <div class="experience-wrapper">
    <div class="experience-intro">
      <h2>Elevate Your Silk Experience</h2>
      <p>
        At Sri Shakram, every saree tells a story — from the finest Kanchipuram silks to delicate zari details.  
        Discover elegance that’s timeless, curated for the modern connoisseur.
      </p>
    </div>

    <div class="experience-grid">
      <div class="experience-item">
        <div class="experience-item-content">
          <h3>Masterful Craftsmanship</h3>
          <p>
            Handwoven or handpicked, each saree reflects generations of weaving expertise and attention to detail.
          </p>
        </div>
      </div>

      <div class="experience-item">
        <div class="experience-item-content">
          <h3>Premium Materials</h3>
          <p>
            Only the finest silk and zari are sourced, ensuring unmatched quality and luxurious texture.
          </p>
        </div>
      </div>

      <div class="experience-item">
        <div class="experience-item-content">
          <h3>Seamless Experience</h3>
          <p>
            Personalized assistance, secure shopping, and a smooth journey whether online or in our stores.
          </p>
        </div>
      </div>

      <div class="experience-item">
        <div class="experience-item-content">
          <h3>Heritage Meets Modernity</h3>
          <p>
            Tradition woven into contemporary design — available in Kanchipuram, Bangalore, or delivered worldwide.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  

  <!-- Premium Quality Section -->
  <section class="premium-section">
  <div class="premium-left">
    <img :src="footerimg" alt="Premium Silk Sarees" class="premium-img" />
    
  </div>

  <div class="premium-right">
    <div class="premium-tag">
      <span class="premium-tag-dot"></span>
      <span class="premium-tag-label">Premium Quality</span>
    </div>

    <h2 class="premium-heading">
      Awe-inspiring silks<br>for <em>every occasion.</em>
    </h2>

    <div class="premium-rule"></div>

    <p class="premium-desc">
      Kanchipuram silk sarees are crafted with premium silk yarns, showcasing intricate 
      weaving techniques passed down through generations of master weavers. Each saree is 
      a testament to rich heritage — meticulously woven with precision and care, brought 
      to you at unmatched prices.
    </p>

    <div class="premium-stats">
      <div>
        <div class="premium-stat-num">200+</div>
        <div class="premium-stat-label">Collections</div>
      </div>
      <div>
        <div class="premium-stat-num">35+</div>
        <div class="premium-stat-label">Years legacy</div>
      </div>
      <div>
        <div class="premium-stat-num">100%</div>
        <div class="premium-stat-label">Pure silk</div>
      </div>
    </div>

    <div class="premium-actions">
      <v-btn class="premium-btn-primary" @click="showcategory('All')">
        Our Collection
      </v-btn>
    </div>
  </div>
</section>

  <!-- Client Love Section
  <section class="clientlove-section">
    <div class="clientlove-title">#CLIENTLOVE</div>
    
    <v-carousel hide-delimiters height="auto" class="clientlove-carousel">
      <v-carousel-item v-for="(item, i) in testimonials" :key="i">
        <div class="cards-row">
          <div 
            v-for="(card, idx) in getVisibleCards(i)" 
            :key="idx" 
            class="testimonial-card"
            :class="{ active: idx === 1 }"
          >
            <div class="stars">★★★★★</div>
            <p class="testimonial-text">{{ card.text }}</p>
            <div class="name">{{ card.name }}</div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </section> -->

  <!-- Store Location -->
  <section class="location-section">
    <div class="location-content">
      <div class="location-text">
        <p>Visit our store in</p>
        <h2>Kanchipuram</h2>
        <p>
          Kotrampalayam St,<br />
          Kanchipuram, Tamil Nadu 631501
        </p>
        <v-btn class="direction-btn" @click="openGoogleMaps">Get Direction</v-btn>
      </div>

      <div class="location-map">
        <iframe
          :src="googleMapsEmbedUrl"
          title="Sri Shakram store location on Google Maps"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>

  <!-- Saree Journal -->
  <section class="journal-section">
  <div class="journal-top">
    <div>
      <p class="journal-label">Our Stories</p>
      <h2 class="journal-title">The Saree <em>Journal</em></h2>
    </div>
    <v-btn class="journal-view-btn" elevation="0" @click="journalpage()">
      View all
    </v-btn>
  </div>

  <div class="journal-grid">
    <div
      v-for="(j, i) in journal"
      :key="i"
      class="journal-card"
      :class="{ 'journal-card--featured': i === 0 }"
      @click="Sareejournal(j.id)"
    >
      <div class="journal-img-wrap">
        <img :src="resolveMediaUrl(j.heroImage)" class="journal-img" alt="" />
      </div>
      <div class="journal-meta">
        <div class="journal-issue">
          <span class="journal-issue-line"></span>
          Issue 0{{ i + 1 }}
        </div>
        <p class="journal-name">{{ j.productName }}</p>
        <div class="journal-read">Read <span class="journal-read-arrow"></span></div>
      </div>
    </div>
  </div>
</section>

  <!-- Contact Form -->
  <section class="contact-section">
    <h3 class="section-title">Contact us</h3>

    <v-container class="form-container">
      <v-row>
        <v-col cols="12" md="6">
          <label class="field-label">NAME</label>
          <v-text-field 
            v-model="name" 
            variant="outlined" 
            hide-details 
            density="compact"
            class="custom-input"
          />
        </v-col>

        <v-col cols="12" md="6">
          <label class="field-label">EMAIL</label>
          <v-text-field 
            v-model="email" 
            variant="outlined" 
            hide-details 
            density="compact"
            class="custom-input"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <label class="field-label">MESSAGE</label>
          <v-textarea 
            v-model="message" 
            variant="outlined" 
            rows="4" 
            class="custom-input"
          />
        </v-col>
      </v-row>

      <v-btn class="send-btn" @click="savedata()">SEND</v-btn>

      <p class="captcha-text">
        This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
      </p>
    </v-container>
  </section>
</template>

<script setup>
import img11 from '@/assets/img1.jpg'
import img12 from '@/assets/img2.jpg'
import img13 from '@/assets/img3.jpg'
import img14 from '@/assets/img4.jpg'

const imagesnest = [
  { src: img11, title: 'Daily Wear Silks Collection', value: 'Korvai'},
  { src: img12, title: 'Soft Silk Collection', value: 'Silk' },
  { src: img13, title: 'Wear and Shine', value: 'Cotton' },
  { src: img14, title: 'Affordable Luxury Collection', value: 'Design' }
]

// const testimonials = [
//   {
//     text: "A heartfelt thanks to THRIYA SILKS. Your collections are just amazing 😍 And the staff is extremely good. We were so good in showcasing their collections. And helped us in choosing the best silk sarees. A special thanks to Miss. Meena for attending us so patiently 🤗",
//     name: "Al Arsheen"
//   },
//   {
//     text: "Thank you Meena, for the service it was fantastic and the prices were reasonable! She is such a nice lady...so different from some of the experiences I've had with others. She really did save the day and helped us ALL out",
//     name: "Kavya G"
//   },
//   {
//     text: "It's good premium collection of sarees, especially for marriage or bride sarees you need visit here Overall it was pleasant experience",
//     name: "Nagraj Ht"
//   }
// ];
// function getVisibleCards(index) {
//   const prev = testimonials[index - 1] || testimonials[testimonials.length - 1];
//   const current = testimonials[index];
//   const next = testimonials[index + 1] || testimonials[0];
//   return [prev, current, next];
// }
</script>

<script>
import api from '@/adminfolder/axios'
import { resolveMediaUrl } from '@/utils/mediaUrl'

export default {
  data() {
    return {
      videoList: [],
      products: [],
      name: "",
      email: "",
      message: "",
      herovideo: "",
      footerimg: "",
      journal: [],
      googleMapsEmbedUrl: "https://www.google.com/maps?q=108%2F70%2C%20Vilakadi%20Koil%20St%2C%20near%20Rajeshwari%20Hall%2C%20Ennaikaran%2C%20Kanchipuram%2C%20Tamil%20Nadu%20631501&output=embed",
      googleMapsDirectionUrl: "https://www.google.com/maps/dir/?api=1&destination=108%2F70%2C%20Vilakadi%20Koil%20St%2C%20near%20Rajeshwari%20Hall%2C%20Ennaikaran%2C%20Kanchipuram%2C%20Tamil%20Nadu%20631501"
    }
  },

  mounted() {
    this.getProducts();
    this.getVideos();
    this.getjournal();
  },

  methods: {
    resolveMediaUrl,
    getImageUrl(path) {
      return resolveMediaUrl(path);
    },
    Sareejournal(id) {
      this.$router.push({ name: 'SareeJournal', params: { id } });
    },

    journalpage() {
      this.$router.push({ name: 'all_journal' });
    },

    getjournal() {
      api.get('api/saree-journal/recent/journal')
        .then((res) => {
          this.journal = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getProducts() {
      api.get('/upload/recent')
        .then((res) => {
          this.products = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getVideos() {
      api.get('/upload/display')
        .then((res) => {
          const data = res.data
          this.herovideo = data.img1 && data.img1 !== "null" ? resolveMediaUrl(data.img1) : ""
          this.footerimg = data.img10 && data.img10 !== "null" ? resolveMediaUrl(data.img10) : ""
          
          this.videoList = [
            data.img2,
            data.img3,
            data.img4,
            data.img5,
            data.img6
          ].filter(v => v).map(resolveMediaUrl)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    showdetails(product) {
      this.$router.push({
        name: 'showproduct',
        params: { id: product.id }
      })
    },

    savedata() {
      const params = {
        name: this.name,
        email: this.email,
        msg: this.message
      };
      api.post('contact/save', params)
      this.name = "";
      this.email = "";
      this.message = "";
    },

    showcategory() {
      this.$router.push({ name: 'Collection', query: { category: 'All Kanchipuram Silk Saree' } });
    },

    openGoogleMaps() {
      window.open(this.googleMapsDirectionUrl, "_blank", "noopener,noreferrer");
    }
  }
}
</script>

<style scoped>
/* ================= JOURNAL SECTION ================= */
.journal-section {
  padding: 80px 5%;
  background: #fff;
  font-family: 'Jost', sans-serif;
}

.journal-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
  border-bottom: 1px solid #e8ddd0;
  padding-bottom: 24px;
}

.journal-label {
  font-size: 10px;
  letter-spacing: 4px;
  color: #9a8068;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.journal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px;
  font-weight: 300;
  color: #1a1208;
  margin: 0;
  line-height: 1;
}

.journal-title em {
  font-style: italic;
  color: #8a6a3a;
}

.journal-view-btn {
  display: inline-flex !important;
  align-items: center;
  gap: 10px;
  font-size: 10px !important;
  letter-spacing: 3px !important;
  color: #5a4a38 !important;
  text-transform: uppercase;
  background: none !important;
  border: none !important;
  border-bottom: 1px solid #c9a97a !important;
  border-radius: 0 !important;
  padding-bottom: 3px;
  box-shadow: none !important;
  white-space: nowrap;
  height: auto !important;
}

.journal-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 0;
}

.journal-card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.journal-card:not(:last-child) {
  border-right: 1px solid #e8ddd0;
}

.journal-img-wrap {
  overflow: hidden;
}

.journal-card--featured .journal-img-wrap {
  height: 460px;
}

.journal-card:not(.journal-card--featured) .journal-img-wrap {
  height: 280px;
}

.journal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.journal-card:hover .journal-img {
  transform: scale(1.06);
}

.journal-meta {
  padding: 20px 24px 28px;
}

.journal-issue {
  font-size: 9px;
  letter-spacing: 3px;
  color: #c9a97a;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.journal-issue-line {
  display: inline-block;
  width: 20px;
  height: 1px;
  background: #c9a97a;
}

.journal-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 400;
  color: #1a1208;
  line-height: 1.35;
  margin: 0 0 14px;
}

.journal-card--featured .journal-name {
  font-size: 26px;
}

.journal-read {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 2px;
  color: #9a8068;
  text-transform: uppercase;
  transition: color 0.3s;
}

.journal-card:hover .journal-read {
  color: #1a1208;
}

.journal-read-arrow {
  display: inline-block;
  width: 20px;
  height: 1px;
  background: currentColor;
  transition: width 0.3s;
}

.journal-card:hover .journal-read-arrow {
  width: 30px;
}

/* Mobile */
@media (max-width: 700px) {
  .journal-grid {
    grid-template-columns: 1fr;
  }
  .journal-card:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid #e8ddd0;
  }
  .journal-card--featured .journal-img-wrap,
  .journal-card:not(.journal-card--featured) .journal-img-wrap {
    height: 240px;
  }
  .journal-title { font-size: 30px; }
  .journal-top { flex-direction: column; align-items: flex-start; gap: 16px; }
}
.premium-actions{
  padding: 5px;
}
.premium-img {
  width: 100%;
  max-width: 560px;
  margin-left: 0;
  margin-top: 15px;
  display: block;
  object-fit: cover;
}
/* ================= PREMIUM SECTION ================= */
.premium-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 280px;        /* was 540px */
  font-family: 'Jost', sans-serif;
  background: #faf7f2;
  overflow: hidden;
  width: 100%;
  margin-top: 50px;
  padding: 0 clamp(20px, 5vw, 80px);
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
  box-sizing: border-box;
}

.premium-right {
  padding: 40px 48px;       /* was 72px 64px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #faf7f2;
}

.premium-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 32px;          /* was 44px */
  font-weight: 300;
  line-height: 1.2;
  color: #1a1208;
  margin: 0 0 8px;
}

.premium-rule {
  width: 36px;
  height: 1px;
  background: #c9a97a;
  margin: 18px 0;           /* was 28px 0 */
}

.premium-desc {
  font-size: 13px;          /* was 14px */
  line-height: 1.75;
  color: #5a4a38;
  max-width: 420px;
  margin: 0 0 28px;         /* was 40px */
}

.premium-stats {
  display: flex;
  gap: 28px;                /* was 36px */
  margin-bottom: 28px;      /* was 44px */
  padding-bottom: 24px;     /* was 36px */
  border-bottom: 1px solid #e8ddd0;
}

.premium-stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;          /* was 36px */
  font-weight: 300;
  color: #1a1208;
  line-height: 1;
}

.premium-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;      /* was 28px */
}

/* Mobile */
@media (max-width: 768px) {
  .premium-section {
    grid-template-columns: 1fr;
    padding: 0 16px 42px;
    gap: 0;
  }
  .premium-left {
    height: 240px;          /* was 320px */
    overflow: hidden;
  }
  .premium-img {
    width: 100%;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .premium-right {
    padding: 32px 24px;     /* was 44px 28px */
  }
  .premium-heading {
    font-size: 26px;        /* was 32px */
  }
}
/* ================= COLLECTIONS SECTION ================= */
.collections-section {
  padding: 80px clamp(20px, 5vw, 76px);
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  box-sizing: border-box;
}

.collections-bento {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-template-rows: 260px 260px;
  gap: 10px;
  width: 100%;             /* ← full width of parent */
  max-width: 100%;         /* ← no cap */
  margin: 0;
  padding: 0;              /* ← no padding here */
  box-sizing: border-box;
}

.collections-header {
  text-align: center;
  margin-bottom: 48px;
  padding: 0 20px;        /* add padding here instead */
}

.collections-label {
  font-size: 10px;
  letter-spacing: 4px;
  color: #9a8a78;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.collections-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 38px;
  font-weight: 300;
  color: #2a1f14;
  letter-spacing: 1px;
  margin: 0;
}


/* Card 1 — tall left feature */
.bento-card:nth-child(1) {
  grid-row: 1 / 3;
}

/* Card 2 & 3 — top right pair */
.bento-card:nth-child(2) { grid-column: 2; grid-row: 1; }
.bento-card:nth-child(3) { grid-column: 3; grid-row: 1; }

/* Card 4 — wide bottom banner */
.bento-card:nth-child(4) {
  grid-column: 2 / 4;
  grid-row: 2;
}

.bento-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
}

.bento-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.bento-card:hover .bento-bg { transform: scale(1.07); }

.bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.52) 100%);
  transition: background 0.4s ease;
}

.bento-card:hover .bento-overlay {
  background: linear-gradient(160deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.68) 100%);
}

.bento-body {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 22px 20px;
}

.bento-num {
  font-size: 10px;
  letter-spacing: 3px;
  color: #e8c99a;
  margin-bottom: 6px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.35s ease;
}

.bento-card:hover .bento-num { opacity: 1; transform: translateY(0); }

.bento-divider {
  width: 32px;
  height: 1px;
  background: #c9a97a;
  margin: 8px 0;
}

.bento-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  color: #f5f0ea;
  margin: 0;
  letter-spacing: 0.5px;
}

.bento-card:nth-child(1) .bento-name { font-size: 26px; line-height: 1.35; }
.bento-card:not(:nth-child(1)) .bento-name { font-size: 18px; }

.bento-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 9px;
  letter-spacing: 3px;
  color: #c9a97a;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(6px);
  transition: all 0.35s ease 0.07s;
}

.bento-card:hover .bento-cta { opacity: 1; transform: translateY(0); }

.bento-cta-line {
  display: inline-block;
  width: 22px;
  height: 1px;
  background: #c9a97a;
}

/* Mobile */
@media (max-width: 700px) {
  .collections-bento {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 200px);
  }
  .bento-card:nth-child(1) { grid-row: 1; grid-column: 1 / 3; }
  .bento-card:nth-child(2) { grid-column: 1; grid-row: 2; }
  .bento-card:nth-child(3) { grid-column: 2; grid-row: 2; }
  .bento-card:nth-child(4) { grid-column: 1 / 3; grid-row: 3; }
}
.experience-section-modern {
  padding: 100px 20px;
  
  color: #222;
  font-family: 'Helvetica Neue', sans-serif;
}

.experience-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.experience-intro {
  text-align: center;
  margin-bottom: 70px;
}

.experience-intro h2 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.experience-intro p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  max-width: 700px;
  margin: 0 auto;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.experience-item {
  position: relative;
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.06);
  transition: transform 0.4s, box-shadow 0.4s;
  overflow: hidden;
}

.experience-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(120deg, beige, #fff8f3);
  transform: skewX(-25deg) translateX(-100%);
  transition: transform 0.5s;
  z-index: 0;
}

.experience-item:hover::before {
  transform: skewX(-25deg) translateX(0);
}

.experience-item-content {
  position: relative;
  z-index: 1;
}

.experience-item h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
}

.experience-item p {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
}

@media (max-width: 768px) {
  .experience-intro h2 {
    font-size: 28px;
  }
}
/* ================= BASE STYLES ================= */
* {
  box-sizing: border-box;
}

.section-container {
  margin: 50px auto;
  width: min(100% - 56px, 1320px);
}

.section-title {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
}

.main-heading {
  text-align: center;
  font-size: 35px;
  font-weight: 400;
  margin-bottom: 50px;
}

/* ================= HERO VIDEO ================= */
.video-wrapper {
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ================= COLLECTIONS GRID ================= */
.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
  max-width: 1200px;
  margin: 0 auto;
}

.collection-card {
  position: relative;
  height: 160px;
  cursor: pointer;
  overflow: hidden;
}

.collection-image {
  height: 100%;
  transition: transform 0.4s ease;
}

.collection-card:hover .collection-image :deep(.v-img__img) {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.55));
}

.image-text {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  z-index: 2;
}

/* ================= PRODUCTS GRID ================= */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px 22px;
  margin-bottom: 30px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.product-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.product-image-wrap {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1.16;
  overflow: hidden;
  cursor: pointer;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image-wrap:hover .product-image {
  transform: scale(1.05);
}

.ribbon {
  position: absolute;
  top: 12px;
  left: -40px;
  width: 140px;
  background: black;
  text-align: center;
  transform: rotate(-45deg);
  z-index: 10;
}

.ribbon span {
  display: block;
  color: white;
  font-size: 9px;
  font-weight: bold;
  padding: 6px 0;
  letter-spacing: 1px;
}

.product-title {
  font-size: 12px;
  font-weight: bold;
  margin: 10px 0 0;
  line-height: 1.35;
}

.product-price {
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.35;
}

.view-all-btn {
  display: block;
  margin: 0 auto;
  background-color: black;
  color: white;
}

/* ================= VIDEOS GRID ================= */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
  justify-content: center;
  max-width: 1370px;
  margin: 0 auto;
}

.video-card {
  width: 100%;
  aspect-ratio: 9 / 16;
  max-height: 450px;
  overflow: hidden;
}

.video-card video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.video-card:hover video {
  transform: scale(1.15);
}

.mobile-hidden {
  display: block;
}

/* ================= EXPERIENCE SECTION ================= */
/* .experience-section {
  width: 100%;
  background-color: beige;
  padding: 60px 20px;
  margin-top: 90px;
}

.experience-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.experience-content h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.experience-content p {
  font-size: 13px;
  font-family: Montserrat, sans-serif;
  line-height: 1.6;
  margin-bottom: 16px;
} */

/* ================= FAQ SECTION ================= */
/* .faq-section {
  margin-top: 60px;
}

.faq-card {
  max-width: 700px;
  margin: 0 auto;
  background-color: transparent;
}

.faq-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 400;
}

:deep(.v-expansion-panel-title) {
  min-height: 48px !important;
  padding: 12px 16px !important;
  background-color: #fbf7f2;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 16px;
} */

/* ================= PREMIUM SECTION ================= */
/* .premium-section {
  width: 100%;
  background-color: beige;
  padding: 60px 20px;
  margin-top: 60px;
}

.premium-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.premium-text {
  padding: 20px;
}

.premium-label {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 10px;
}

.premium-text h2 {
  font-size: 28px;
  margin-bottom: 16px;
}

.premium-description {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.collection-btn {
  background-color: black;
  color: white;
  font-size: 10px;
  border-radius: 0;
}

.premium-image {
  width: 100%;
  height: 400px;
}

.premium-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

/* ================= CLIENT LOVE SECTION ================= */
/* .clientlove-section {
  background: #fbf7f2;
  padding: 60px 20px;
  text-align: center;
  margin-top: 60px;
}

.clientlove-title {
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.cards-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
}

.testimonial-card {
  width: 300px;
  background: white;
  padding: 20px;
  transition: all 0.4s ease;
  opacity: 0.7;
  transform: scale(0.95);
}

.testimonial-card.active {
  transform: scale(1.05);
  opacity: 1;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
}

.stars {
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.testimonial-text {
  font-size: 11px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.name {
  font-weight: 600;
  font-size: 14px;
} */

/* ================= LOCATION SECTION ================= */
.location-section {
  padding: 80px 20px;
}

.location-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.location-text {
  text-align: center;
}

.location-text p:first-child {
  font-size: 14px;
  margin-bottom: 8px;
}

.location-text h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.location-text p {
  line-height: 1.6;
  margin-bottom: 20px;
}

.direction-btn {
  border: 1px solid rgba(157, 107, 39, 0.34);
  color: #6f1d18;
  height: 42px;
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.62);
  box-shadow: 0 10px 24px rgba(72, 23, 12, 0.08);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.direction-btn:hover {
  transform: translateY(-2px);
  background: rgba(221, 180, 109, 0.14);
  box-shadow: 0 14px 30px rgba(72, 23, 12, 0.13);
}

.location-map {
  position: relative;
  width: 100%;
  height: 325px;
  overflow: hidden;
  border: 1px solid rgba(157, 107, 39, 0.28);
  border-radius: 22px;
  background:
    radial-gradient(circle at 18% 12%, rgba(221, 180, 109, 0.18), transparent 36%),
    #fffaf4;
  box-shadow: 0 22px 52px rgba(72, 23, 12, 0.12);
}

.location-map::before {
  content: "";
  position: absolute;
  inset: 10px;
  z-index: 1;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.68);
  border-radius: 16px;
}

.location-map iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
}

/* ================= JOURNAL SECTION ================= */
/* .journal-section {
  margin-top: 40px;
  padding: 0 77px;
}

.journal-header {
  background-color: antiquewhite;
  text-align: center;
  padding: 30px 20px;
  margin-bottom: 40px;
}

.journal-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.journal-view-btn {
  height: 25px;
  font-size: 10px;
  border-radius: 0;
  background-color: transparent;
  border: 1px solid gray;
}

.journal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 0 auto;
}

.journal-card {
  background: #fff;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.journal-card:hover {
  transform: translateY(-5px);
}

.journal-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.journal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.journal-name {
  font-size: 12px;
  font-weight: 700;
  margin-top: 8px;
  padding: 0 8px;
} */

/* ================= CONTACT SECTION ================= */
.contact-section {
  width: 100%;
  background-color: #faf7f2;
  padding: 40px 20px 60px;
  margin-top: 50px;
}

.form-container {
  max-width: 900px;
}

.field-label {
  font-size: 11px;
  letter-spacing: 2px;
  color: #000;
  margin-bottom: 8px;
  display: block;
}

.custom-input :deep(.v-field) {
  border-radius: 0;
}

.send-btn {
  margin-top: 20px;
  background: #000;
  color: #fff;
  letter-spacing: 2px;
  font-size: 12px;
  height: 40px;
  border-radius: 2px;
}

.captcha-text {
  margin-top: 18px;
  font-size: 12px;
  color: #333;
}

/* ================= MOBILE RESPONSIVE ================= */
@media (max-width: 768px) {
  :deep(.v-main),
  :deep(.v-container) {
    max-width: 100%;
  }

  .collections-section {
    width: 100%;
    margin: 0;
    padding: 42px 16px;
  }

  .collections-header {
    margin-bottom: 26px;
    padding: 0;
  }

  .collections-title {
    font-size: 30px;
    line-height: 1.1;
  }

  .collections-bento {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 16px;
  }

  .bento-card,
  .bento-card:nth-child(1),
  .bento-card:nth-child(2) {
    grid-column: auto;
    grid-row: auto;
    min-height: 240px;
    border-radius: 18px;
  }

  .bento-card:nth-child(n + 3) {
    display: none;
  }

  .bento-body {
    padding: 18px 16px;
  }

  .bento-card:nth-child(1) .bento-name,
  .bento-card:not(:nth-child(1)) .bento-name {
    font-size: 21px;
    line-height: 1.25;
  }

  .section-container {
    width: 100%;
    margin: 54px auto;
    padding: 0 16px;
  }

  .section-title {
    font-size: 25px;
    line-height: 1.18;
    margin-bottom: 26px;
  }

  .main-heading {
    font-size: 28px;
    margin-bottom: 28px;
  }

  /* Hero Video */
  .video-wrapper {
    height: clamp(360px, 62svh, 520px);
    min-height: 0;
    margin-bottom: 0;
    background: #fffaf4;
  }

  .hero-video {
    object-fit: cover;
    object-position: center 34%;
  }

  /* Collections Grid */
  .collections-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .collection-card {
    height: 180px;
  }

  /* Products Grid */
  .products-grid {
    grid-template-columns: 1fr;
    gap: 22px;
    max-width: 360px;
    width: 100%;
    margin: 0 auto 34px;
  }

  .product-card {
    padding: 8px 8px 13px;
    border: 1px solid rgba(194, 148, 78, 0.18);
    border-radius: 18px;
    background: rgba(255, 250, 244, 0.72);
    box-shadow: 0 14px 30px rgba(72, 23, 12, 0.07);
  }

  .product-image-wrap {
    height: auto;
    aspect-ratio: 1 / 1.12;
    border-radius: 15px;
    box-shadow: 0 12px 26px rgba(36, 8, 7, 0.09);
  }

  .product-title {
    margin: 11px 3px 0;
    color: #34110e;
    font-size: 14px;
    line-height: 1.35;
  }

  .product-price {
    margin: 5px 3px 0;
    color: rgba(58, 21, 17, 0.72);
    font-size: 12px;
    line-height: 1.4;
  }

  .view-all-btn {
    min-width: 150px;
    height: 44px;
  }

  /* Videos Grid - Show only 4 videos */
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    max-width: 520px;
  }

  .video-card {
    width: 100%;
    height: auto;
    max-height: none;
    border-radius: 16px;
  }

  .mobile-hidden {
    display: none;
  }

  /* Experience Section */
  .experience-section {
    padding: 40px 16px;
  }

  .experience-section-modern {
    padding: 58px 16px;
  }

  .experience-wrapper {
    width: 100%;
  }

  .experience-content h2 {
    font-size: 22px;
  }

  .experience-intro {
    text-align: left;
    margin-bottom: 28px;
  }

  .experience-intro h2 {
    font-size: 30px;
    line-height: 1.16;
  }

  .experience-intro p,
  .experience-item p {
    font-size: 15px;
    line-height: 1.75;
  }

  .experience-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .experience-item {
    min-height: 220px;
    border-radius: 20px;
  }

  /* Premium Section */
  .premium-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .premium-section {
    margin: 54px 0;
    border-radius: 0;
  }

  .premium-text h2 {
    font-size: 22px;
  }

  .premium-image {
    height: 300px;
  }

  /* Client Love */
  .cards-row {
    flex-direction: column;
    align-items: center;
  }

 

  /* Location */
  .location-section {
    padding: 56px 16px;
  }

  .location-content {
    grid-template-columns: 1fr;
    gap: 28px;
    width: 100%;
  }

  .location-text h2 {
    font-size: 32px;
    line-height: 1.15;
  }

  .location-text p {
    font-size: 15px;
    line-height: 1.7;
  }

  .location-map {
    height: 300px;
    border-radius: 20px;
  }

  /* Journal Grid */
  .journal-grid {
    grid-template-columns: 1fr;
  }

  .journal-section {
    padding: 56px 16px;
  }

  .journal-top {
    align-items: flex-start;
    gap: 18px;
    flex-direction: column;
  }

  .journal-title {
    font-size: 32px;
    line-height: 1.1;
  }

  /* FAQ */
  .faq-card {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .section-container {
    padding: 0 14px;
  }

  .video-wrapper {
    height: clamp(330px, 58svh, 430px);
    min-height: 0;
  }

  .collections-section {
    padding-top: 36px;
  }

  .bento-card,
  .bento-card:nth-child(1),
  .bento-card:nth-child(2) {
    min-height: 220px;
  }

  .videos-grid {
    gap: 12px;
  }

  .products-grid {
    max-width: 100%;
    gap: 20px;
  }

  .product-card {
    border-radius: 18px;
  }

  .collections-section,
  .location-section,
  .journal-section {
    padding-left: 14px;
    padding-right: 14px;
  }
}

/* Tablet adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .video-wrapper {
    height: clamp(500px, 58svh, 650px);
    min-height: 0;
    background: #fffaf4;
  }

  .hero-video {
    object-fit: cover;
    object-position: center 36%;
  }

  .collections-section {
    padding: 56px 24px;
  }

  .collections-header {
    margin-bottom: 34px;
  }

  .collections-bento {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 260px;
    gap: 18px;
  }

  .bento-card,
  .bento-card:nth-child(1),
  .bento-card:nth-child(2) {
    grid-column: auto;
    grid-row: auto;
    min-height: 260px;
    border-radius: 18px;
  }

  .bento-card:nth-child(n + 3) {
    display: none;
  }

  .bento-card:nth-child(1) .bento-name,
  .bento-card:not(:nth-child(1)) .bento-name {
    font-size: 22px;
    line-height: 1.25;
  }

  .section-container {
    width: calc(100% - 48px);
    margin: 64px auto;
  }

  .videos-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    max-width: 720px;
  }

  .video-card {
    max-height: none;
    border-radius: 18px;
  }

  .mobile-hidden {
    display: none;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 20px;
    max-width: 780px;
  }

  .product-card {
    padding: 9px 9px 13px;
    border: 1px solid rgba(194, 148, 78, 0.16);
    border-radius: 18px;
    background: rgba(255, 250, 244, 0.66);
  }

  .product-image-wrap {
    aspect-ratio: 1 / 1.14;
    border-radius: 15px;
  }

  .product-title {
    font-size: 14px;
  }

  .product-price {
    font-size: 12px;
  }

  .premium-section {
    padding: 46px 24px;
    gap: 28px;
  }

  .premium-right {
    padding: 28px 12px;
  }

  .premium-heading {
    font-size: 28px;
  }

  .premium-stats {
    gap: 18px;
  }

  .experience-section-modern,
  .journal-section,
  .location-section {
    padding-left: 24px;
    padding-right: 24px;
  }

  .journal-grid {
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .journal-card,
  .journal-card:not(:last-child) {
    border-right: none;
  }

  .journal-card--featured {
    grid-column: 1 / 3;
  }

  .journal-card--featured .journal-img-wrap {
    height: 360px;
  }

  .location-content {
    gap: 28px;
  }
}
</style>
