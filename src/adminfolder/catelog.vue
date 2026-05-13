<template>
  <v-container class="collage-container">

    <div class="section-title">Discover Collections</div>

    <div class="collage-grid">

      <!-- BIG -->
      <div 
        v-if="categories[0]"
        class="collage-item big"
        @click="goToCategory(categories[0])"
      >
        <v-img :src="getImageUrl(categories[0].image)" cover />
        <div class="overlay">
          <h2>{{ categories[0].Category }}</h2>
        </div>
      </div>

      <!-- MEDIUM -->
      <div 
        v-if="categories[1]"
        class="collage-item medium"
        @click="goToCategory(categories[1])"
      >
        <v-img :src="getImageUrl(categories[1].image)" cover />
        <div class="overlay">
          <h3>{{ categories[1].Category }}</h3>
        </div>
      </div>

      <!-- SMALL -->
      <div 
        v-if="categories[2]"
        class="collage-item small"
        @click="goToCategory(categories[2])"
      >
        <v-img :src="getImageUrl(categories[2].image)" cover />
        <div class="overlay">
          <h4>{{ categories[2].Category }}</h4>
        </div>
      </div>

      <!-- 🔥 DYNAMIC COLLAGE (FIXED) -->
      <div
        v-for="(cat, index) in categories.slice(3)"
        :key="cat.id || index"
        class="collage-item auto"
        :class="getDynamicClass(index)"
        @click="goToCategory(cat)"
      >
        <v-img :src="getImageUrl(cat.image)" cover />
        <div class="overlay">
          <span>{{ cat.Category }}</span>
        </div>
      </div>

    </div>

  </v-container>
</template>

<script>
import api from "@/adminfolder/axios"
import { resolveMediaUrl } from "@/utils/mediaUrl";

export default {
  data() {
    return {
      categories: []
    };
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    async fetchCategories() {
      try {
        const res = await api.get("/catelog");
        this.categories = res.data || [];
      } catch (err) {
        console.error(err);
      }
    },

    getImageUrl(path) {
      return resolveMediaUrl(path);
    },

    goToCategory(cat) {
      if (!cat) return;
      this.$router.push({
        name: "Collection",
        query: { category: cat.Category }
      });
    },

    // 🔥 MAIN FIX (DIFFERENT SIZES)
    getDynamicClass(index) {
      if (index % 6 === 0) return "tall";
      if (index % 5 === 0) return "wide";
      if (index % 4 === 0) return "big-auto";
      return "normal";
    }
  }
};
</script>

<style scoped>

/* ================= CONTAINER ================= */
.collage-container {
  max-width: 1500px;
  margin: auto;
  padding: 40px 20px;
}

/* ================= TITLE ================= */
.section-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
  letter-spacing: 3px;
  font-family: 'Playfair Display', serif;
}

/* ================= GRID ================= */
.collage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 180px;
  gap: 16px;

  /* 🔥 FIXES EMPTY SPACES */
  grid-auto-flow: dense;
}

/* ================= ITEMS ================= */
.collage-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.collage-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

/* ================= IMAGE ================= */
.collage-item .v-img {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

.collage-item:hover .v-img {
  transform: scale(1.12);
}

/* ================= FIRST 3 ================= */
.big {
  grid-column: span 2;
  grid-row: span 2;
}

.medium {
  grid-column: span 1;
}

.small {
  grid-column: span 1;
}

/* ================= 🔥 DYNAMIC COLLAGE ================= */
.normal {
  grid-column: span 1;
  grid-row: span 1;
}

.wide {
  grid-column: span 2;
}

.tall {
  grid-row: span 2;
}

.big-auto {
  grid-column: span 2;
  grid-row: span 2;
}

/* ================= OVERLAY ================= */
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  color: white;
}

/* TEXT */
.overlay h2 {
  font-size: 28px;
  font-family: 'Playfair Display', serif;
}

.overlay h3 {
  font-size: 22px;
}

.overlay h4 {
  font-size: 18px;
}

.overlay span {
  font-size: 14px;
}

/* ================= MOBILE ================= */
@media (max-width: 960px) {
  .collage-grid {
    grid-template-columns: 1fr;
  }

  .big,
  .wide,
  .tall,
  .big-auto {
    grid-column: span 1;
    grid-row: span 1;
  }
}

</style>