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

<style scoped src="@/adminfolder/admin styles/catelog.css"></style>
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

