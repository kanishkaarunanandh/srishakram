<template>
  <div class="saree-journal-page">
    <div class="journal-back-wrap">
      <button class="journal-back-button" type="button" @click="goBackToJournal">
        <span>←</span>
        Back to Saree Journal
      </button>
    </div>

    <div class="hero" :style="{ backgroundImage: heroImg ? `url(${heroImg})` : '' }">
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

    <section class="journey">
      <h2 class="journey-title">The Journey of the Saree</h2>

      <div class="journey-track">
        <div
          v-for="(step,index) in staticSteps"
          :key="index"
          class="journey-step"
        >
          <div class="icon-wrapper">
            <img
              :src="step.icon"
              :alt="step.title"
              class="step-icon"
            />
          </div>

          <h4>{{ step.title }}</h4>

          <p>{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <section v-if="steps.length" class="heritage">
      <h2 class="heritage-title">OUR HERITAGE</h2>

      <div
        v-for="(step,index) in steps"
        :key="index"
        class="heritage-item"
        :class="{ reverse: index % 2 !== 0 }"
      >
        <div class="heritage-image">
          <img
            :src="getMediaUrl(step.image)"
            :alt="step.title"
          />
        </div>

        <div class="heritage-text">
          <h3>{{ step.title }}</h3>

          <p>{{ step.description }}</p>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <section v-if="displayZari" class="zari-section">
      <h2 class="zari-title">Zari Certificate</h2>

      <div class="zari-content">
        <div class="zari-image">
          <img
            :src="getMediaUrl(zari)"
            alt="Zari Certificate"
          />
        </div>

        <div class="zari-text">
          <p>
            A Zari Certificate ensures the authenticity and purity of the zari used in the saree.
          </p>

          <p>
            This saree is a celebration of tradition, craftsmanship, and elegance.
            Every thread reflects the dedication of skilled artisans who bring
            centuries-old weaving techniques to life.
          </p>

          <p>
            The richness of silk and the beauty of zari come together to create
            a timeless piece of traditional craftsmanship.
          </p>
        </div>
      </div>
    </section>

    <hr v-if="displayZari" class="divider" />

    <section
      v-if="customerReview.length"
      class="review-section"
    >
      <h2 class="review-title">Customer Review</h2>

      <div
        v-for="(value,index) in customerReview"
        :key="index"
        class="review-card"
      >
        <div class="review-image">
          <img
            :src="getMediaUrl(value.image)"
            alt="Customer Saree"
          />
        </div>

        <div class="review-content">
          <span class="review-label">
            Customer Comments
          </span>

          <p class="review-text">
            "{{ value.content }}"
          </p>

          <div class="review-footer">
            <span class="review-name">
              — Verified Buyer {{ value.customerName }}
            </span>

            <a
              v-if="value.video"
              :href="value.video"
              class="video-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Customer Video →
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/adminfolder/axios";
import step1 from "@/assets/step1.png";
import step2 from "@/assets/step2.png";
import step3 from "@/assets/step3.png";
import step4 from "@/assets/step4.png";
import { resolveMediaUrl } from "@/utils/mediaUrl";
import { demoJournal } from "@/data/demoJournal";

export default {
  data() {
    return {
      heroImg: "",
      steps: [],
      customerReview: [],
      zari: "",
      displayZari: false,
      staticSteps: [
        {
          icon: step1,
          title: "Silk Selection",
          desc: "Finest silk from Karnataka"
        },
        {
          icon: step2,
          title: "Dyeing Process",
          desc: "Natural dyes for rich hues"
        },
        {
          icon: step3,
          title: "Hand Weaving",
          desc: "10 days of craftsmanship"
        },
        {
          icon: step4,
          title: "Final Finishing",
          desc: "Zari work & quality check"
        }
      ]
    };
  },

  mounted() {
    this.fetchJournal(this.$route.params.id);
  },

  watch: {
    "$route.params.id"(newId) {
      this.fetchJournal(newId);
    }
  },

  methods: {
    getMediaUrl(image) {
      if (!image) {
        return "";
      }

      if (
        image.startsWith("/assets/") ||
        image.startsWith("http://") ||
        image.startsWith("https://")
      ) {
        return image;
      }

      return resolveMediaUrl(image);
    },

    parseData(data) {
      if (!data) {
        return [];
      }

      if (Array.isArray(data)) {
        return data;
      }

      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Failed to parse journal data:", error);
        return [];
      }
    },

    setJournalData(data) {
      if (!data) {
        return;
      }

      this.heroImg = this.getMediaUrl(data.heroImage);

      this.zari = data.zariCertificateImage || "";

      this.displayZari = Boolean(this.zari);

      this.steps = this.parseData(data.heritageSteps);

      this.customerReview = this.parseData(data.customerReview);
    },

    goBackToJournal() {
      this.$router.push("/all_journal");
    },

    async fetchJournal(id) {
      this.heroImg = "";
      this.steps = [];
      this.customerReview = [];
      this.zari = "";
      this.displayZari = false;

      const demoData = demoJournal.find(
        journal => String(journal.id) === String(id)
      );

      if (demoData) {
        this.setJournalData(demoData);
        return;
      }

      try {
        const res = await api.get(
          `api/saree-journal/${id}`
        );

        if (res.data) {
          this.setJournalData(res.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch saree journal:",
          error
        );
      }
    }
  }
};
</script>

<style scoped src="@/components/stylesheets/saree_journal.css"></style>