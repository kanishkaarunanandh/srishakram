<template>
  <!-- Hero Video -->
  <div class="video-wrapper" v-if="herovideo">
  <video
    :key="herovideo"
    :src="herovideo"
    autoplay
    muted
    playsinline
    loop
    class="hero-video"
  ></video>
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
    <p class="creator-credit">
  The videos featured in this section belong to their respective creators.
  All credits and rights belong to the original creators.
</p>
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
        At Sri Shakram Silks, every saree tells a story — from Sri Chakram saree searches to the finest
        Kanchipuram silk sarees, traditional silk sarees, pure silk sarees, and delicate zari details.
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
            Tradition woven into contemporary design — available in Kanchipuram, or delivered worldwide.
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
          No 45/18 Kotrampalayam St,<br />
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
  <!-- Saree Journal -->
<section class="journal-section">

  <div class="journal-top">
    <div>
      <p class="journal-label">Our Stories</p>

      <h2 class="journal-title">
        The Saree <em>Journal</em>
      </h2>
    </div>

    <v-btn
      class="journal-view-btn"
      elevation="0"
      @click="journalpage()"
    >
      View all
    </v-btn>
  </div>


  <!-- Journal Cards -->
  <div class="journal-grid">
    <div
      v-for="(j, i) in journal"
      :key="j.id || i"
      class="journal-card"
      :class="{ 'journal-card--featured': i === 0 }"
      @click="Sareejournal(j.id)"
    >
      <!-- Journal Image -->
      <div class="journal-img-wrap">
        <img
          :src="getJournalImage(j)"
          :alt="j.productName || 'Saree Journal'"
          class="journal-img"
        />
      </div>
      <!-- Journal Details -->
      <div class="journal-meta">
        <div class="journal-issue">
          <span class="journal-issue-line"></span>
          Issue 0{{ i + 1 }}
        </div>
        <p class="journal-name">
          {{ j.productName }}
        </p>
        <div class="journal-read">
          Read
          <span class="journal-read-arrow"></span>
        </div>
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
  { src: img12, title: 'Wear and Shine', value: 'Space Silk' },
  { src: img14, title: 'Daily Wear Collection', value: 'Daily Wear' },
  { src: img13, title: 'Soft Silk Collection', value: 'Soft Silk' },
  { src: img11, title: 'Affordable Luxury Collection', value: 'Affordable Luxury' }
]

</script>

<style scoped src="@/components/stylesheets/homepg.css"></style>
<script>
import api from '@/adminfolder/axios'

import { resolveMediaUrl } from '@/utils/mediaUrl'



// Static fallback data
import { demoProducts } from '@/data/demoProducts'
import { demoVideos } from '@/data/demoVideos'
import { demoJournal } from '@/data/demoJournal'
import { demoHomepageMedia } from '@/data/demoHomepageMedia'


export default {

  data() {

    return {
      products: [...demoProducts].slice(-6).reverse(),
      videoList: [...demoVideos],
      journal: [...demoJournal],
      herovideo: demoHomepageMedia.img1,
      footerimg: demoHomepageMedia.img10,
      backendAvailable: false,
      name: "",
      email: "",
      message: "",
      googleMapsEmbedUrl:
        "https://www.google.com/maps?q=108%2F70%2C%20Vilakadi%20Koil%20St%2C%20near%20Rajeshwari%20Hall%2C%20Ennaikaran%2C%20Kanchipuram%2C%20Tamil%20Nadu%20631501&output=embed",
      googleMapsDirectionUrl:
        "https://www.google.com/maps/dir/?api=1&destination=108%2F70%2C%20Vilakadi%20Koil%20St%2C%20near%20Rajeshwari%20Hall%2C%20Ennaikaran%2C%20Kanchipuram%2C%20Tamil%20Nadu%20631501"
    }
  },

  mounted() {

    this.loadBackendData()

  },

  methods: {
    resolveMediaUrl,
    getJournalImage(journal) {

  if (!journal || !journal.heroImage) {
    return "";
  }

  // Static frontend demo journal
  if (journal.isDemo) {
    return journal.heroImage;
  }

  // Backend journal
  return resolveMediaUrl(journal.heroImage);
},
  getImageUrl(path) {

  console.log("IMAGE PATH FROM BACKEND:", path);

  if (!path) return "";

  if (
    path.startsWith("/") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const url = resolveMediaUrl(path);

  console.log("FINAL IMAGE URL:", url);

  return url;
},
    async loadBackendData() {
      try {

        const response = await api.get('/upload/recent')

        if (response.data?.length) {

          this.products = response.data

          this.backendAvailable = true

          console.log(
            "Backend products loaded successfully"
          )

        }

      } catch (error) {

        console.log(
          "Backend starting. Using demo products."
        )


      }

      try {

        const response = await api.get(
          '/upload/display'
        )

        const data = response.data

        if (data) {


          this.herovideo =

            data.img1 &&
            data.img1 !== "null"

              ? resolveMediaUrl(data.img1)

              : demoHomepageMedia.img1

          this.footerimg =

            data.img10 &&
            data.img10 !== "null"

              ? resolveMediaUrl(data.img10)

              : demoHomepageMedia.img10



          const backendVideos = [

            data.img2,
            data.img3,
            data.img4,
            data.img5,
            data.img6

          ]

            .filter(video => {

              return (
                video &&
                video !== "null"
              )

            })

            .map(video => {

              return resolveMediaUrl(video)

            })


          if (backendVideos.length > 0) {

            this.videoList = backendVideos

          }

          console.log(
            "Backend homepage media loaded successfully"
          )

        }

      } catch (error) {

        console.log(
          "Backend starting. Using demo homepage media."
        )

      }

      try {

        const response = await api.get(
          '/api/saree-journal/recent/journal'
        )

        if (response.data?.length) {

          this.journal = response.data

          console.log(
            "Backend journal loaded successfully"
          )

        }

      } catch (error) {

        console.log(
          "Backend starting. Using demo journal."
        )

      }

    },


    showdetails(product) {

      this.$router.push({

        name: 'showproduct',

        params: {

          id: product.id

        }

      })

    },


    Sareejournal(id) {

      this.$router.push({

        name: 'SareeJournal',

        params: {

          id: id

        }

      })

    },

    journalpage() {

      this.$router.push({

        name: 'all_journal'

      })

    },

    async savedata() {

      const params = {

        name: this.name,

        email: this.email,

        msg: this.message

      }


      try {

        await api.post(

          '/contact/save',

          params

        )

        this.name = ""

        this.email = ""

        this.message = ""


        console.log(
          "Message sent successfully"
        )


      } catch (error) {

        console.log(
          "Unable to send message. Backend may be unavailable."
        )

      }

    },


    showcategory(category) {
  this.$router.push({
    name: 'Collection',
    query: {
      category: category
    }
  });
},

    openGoogleMaps() {

      window.open(

        this.googleMapsDirectionUrl,

        "_blank",

        "noopener,noreferrer"

      )

    }

  }

}
</script>


