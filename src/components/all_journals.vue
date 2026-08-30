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
          <img :src="getJournalImage(journal.heroImage)" />
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

<style scoped src="@/components/stylesheets/all_journals.css"></style>
<script>
import api from "@/adminfolder/axios"
import { resolveMediaUrl } from "@/utils/mediaUrl"
import { demoJournal } from "@/data/demoJournal"; 

export default {
    data() {
    return {
      journals: [...demoJournal]
    }
  },
  mounted() {
    this.getalljournals();
  },
  methods: {
    resolveMediaUrl,
    getJournalImage(image) {
    if (!image) {
      return "/no-image.png";
    }

    // Static frontend image
    if (image.startsWith("/assets/")) {
      return image;
    }

    // Backend image
    return this.resolveMediaUrl(image);
  },
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

