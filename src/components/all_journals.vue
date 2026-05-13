<template>
  <div style="width: 100%; padding: 60px 0; background: #faf7f2;">
    <h2 style="text-align: center; font-weight: 400; margin-bottom: 40px;">
      The Saree Journal
    </h2>

    <div
      style="
        width: 85%;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      "
    >
      <div
        v-for="journal in journals"
        :key="journal.id"
        class="journal-card"
        @click="Sareejournal(journal.id)"
      >
        <!-- IMAGE -->
        <div class="img-box">
          <img :src="resolveMediaUrl(journal.heroImage)" />
        </div>

        <!-- CONTENT -->
        <div class="card-content">
          <p class="journal-title">
            Saree Journal #{{ journal.id }}
          </p>
            <p class="journal-title">
            {{ journal.productName }}
          </p>

          <span class="read-more" @click="Sareejournal(journal.id)"><span style="text-decoration: underline;">Read Story</span> →</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/adminfolder/axios"
import { resolveMediaUrl } from "@/utils/mediaUrl"
export default {
    data() {
    return {
      journals: []
    }
  },
  mounted() {
    this.getalljournals();
  },
  methods: {
    resolveMediaUrl,
    Sareejournal(id)
      {
        this.$router.push({ name: 'SareeJournal', params: { id } });
      },
    getalljournals() {
      api.get('api/saree-journal/all/journal')
        .then(res => {
           this.journals = res.data
        })
        .catch(err => {
          console.error("Failed to fetch all journals:", err);
        });
    }
  }
}
</script>
<style scoped>
.journal-card {
  background: #fff;
  cursor: pointer;
  transition: all 0.35s ease;
}

.journal-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.12);
}

.img-box {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.journal-card:hover img {
  transform: scale(1.08);
}

.card-content {
  padding: 14px;
}

.journal-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.journal-desc {
  font-size: 12px;
  color: #555;
  margin-bottom: 10px;
}

.read-more {
  font-size: 11px;
  letter-spacing: 1px;
  color: #000;
  
}
</style>
