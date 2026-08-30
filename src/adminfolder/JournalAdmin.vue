<template>
  <v-container fluid class="pa-6">

    <!-- HEADER -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h2>Journal Management</h2>
    </div>

    <!-- JOURNAL LIST -->
    <v-row>
      <v-col
        v-for="j in journals"
        :key="j.id"
        cols="12"
        md="4"
      >
        <v-card class="pa-3">

          <v-img
            :src="j.heroImage"
            height="180"
            cover
          />

          <div class="mt-3">
            <h3>{{ j.productName }}</h3>
          </div>

          <div class="mt-3 d-flex justify-space-between">
            <v-btn small color="blue" @click="editJournal(j)">
              Edit
            </v-btn>

            <v-btn small color="red" @click="deleteJournal(j.id)">
              Delete
            </v-btn>
          </div>

        </v-card>
      </v-col>
    </v-row>

    <!-- EDIT DIALOG -->
    <v-dialog v-model="dialog" fullscreen>
  <v-card class="edit-wrapper">

    <v-container fluid>
      <v-row>

        <!-- ================= LEFT: EDIT PANEL ================= -->
        <v-col cols="12" md="4">
          <div class="editor-panel">

            <h2 class="editor-title">Edit Journal</h2>

            <!-- PRODUCT -->
            <v-text-field
              v-model="form.productName"
              label="Product Name"
              variant="outlined"
            />

            <!-- HERO -->
            <h3 class="section-title">Hero Image</h3>

            <v-img
              v-if="form.heroImage"
              :src="form.heroImage"
              height="180"
              class="rounded mb-3"
            />

            <v-file-input
              label="Change Hero Image"
              variant="outlined"
              @change="handleHero"
            />

            <!-- ZARI CERTIFICATE -->
            <h3 class="section-title">Zari Certificate</h3>

            <v-img
            v-if="form.zariCertificateImage"
            :src="form.zariCertificateImage"
            height="150"
            class="rounded mb-3"
            />

            <v-file-input
            label="Change Zari Certificate Image"
            variant="outlined"
            @change="handleZari"
            />

            <!-- HERITAGE -->
            <h3 class="section-title">Heritage Story</h3>

            <div
              v-for="(step,i) in form.heritageSteps"
              :key="i"
              class="editor-block"
            >
              <v-text-field v-model="step.title" label="Title" />
              <v-textarea v-model="step.description" label="Description" />

              <v-img
                v-if="step.image"
                :src="step.image"
                height="120"
                class="rounded mb-2"
              />

              <v-file-input
                label="Change Image"
                @change="handleStepImage(i)"
              />

              <v-btn variant="text" color="red" @click="removeStep(i)">
                Remove
              </v-btn>
            </div>

            <v-btn class="mb-4 add-btn" @click="addStep">
              + Add Step
            </v-btn>

            <!-- REVIEWS -->
            <h3 class="section-title">Customer Reviews</h3>

            <div
              v-for="(r,i) in form.customerReview"
              :key="i"
              class="editor-block"
            >
              <v-text-field v-model="r.customerName" label="Customer Name" />
              <v-textarea v-model="r.content" label="Review" />

              <v-img
                v-if="r.image"
                :src="r.image"
                height="100"
                class="rounded mb-2"
              />

              <v-file-input
                label="Change Image"
                @change="handleReviewImage(i)"
              />

              <v-btn variant="text" color="red" @click="removeReview(i)">
                Remove
              </v-btn>
            </div>

            <v-btn class="add-btn mb-4" @click="addReview">
              + Add Review
            </v-btn>

            <!-- ACTION -->
            <v-btn
              block
              size="large"
              class="save-btn"
              @click="updateJournal"
            >
              Update Journal
            </v-btn>

          </div>
        </v-col>

        <!-- ================= RIGHT: LIVE PREVIEW ================= -->
        <v-col cols="12" md="8">
          <div class="preview-panel">

            <!-- HERO -->
            <div v-if="form.heroImage" class="hero-preview">
              <img :src="form.heroImage" />
              <div class="hero-overlay">
                <h1>{{ form.productName || "Luxury Saree" }}</h1>
              </div>
            </div>

            <!-- ZARI PREVIEW -->
<div v-if="form.zariCertificateImage" class="zari-section">
  <h2 class="preview-heading">Zari Certificate</h2>

  <div class="zari-box">
    <img :src="form.zariCertificateImage" />
    <p>
      This certificate ensures authenticity of zari used in the saree.
    </p>
  </div>
</div>

            <!-- HERITAGE -->
            <h2 class="preview-heading">Our Heritage</h2>

            <div
              v-for="(step,i) in form.heritageSteps"
              :key="'p'+i"
              class="heritage-row"
              :class="{ reverse: i % 2 }"
            >
              <img v-if="step.image" :src="step.image" />

              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>

            <!-- REVIEWS -->
            <h2 class="preview-heading">Customer Reviews</h2>

            <v-slide-group show-arrows>
              <v-slide-item
                v-for="(r,i) in form.customerReview"
                :key="'r'+i"
              >
                <div class="review-card">
                  <img v-if="r.image" :src="r.image" />
                  <p>"{{ r.content }}"</p>
                  <span>— {{ r.customerName }}</span>
                </div>
              </v-slide-item>
            </v-slide-group>

          </div>
        </v-col>

      </v-row>
    </v-container>

  </v-card>
</v-dialog>

  </v-container>
</template>
<style scoped src="@/adminfolder/admin styles/journalAdmin.css"></style>
<script>
import api from "@/adminfolder/axios";

export default {
  data() {
    return {
      journals: [],
      dialog: false,
      form: {},
      heroFile: null
    };
  },

  mounted() {
    this.fetchJournals();
  },

  methods: {

    async fetchJournals() {
      const res = await api.get("/api/saree-journal/all/journal");
      this.journals = res.data;
    },
    async handleZari(e) {
  const file = e.target.files[0];
  if (file) {
    this.form.zariCertificateImage = await this.upload(file);
  }
},
    editJournal(j) {
      this.form = JSON.parse(JSON.stringify(j));
      this.dialog = true;
    },

    addStep() {
      this.form.heritageSteps.push({
        title: "",
        description: "",
        image: null
      });
    },

    removeStep(i) {
      this.form.heritageSteps.splice(i,1);
    },

    addReview() {
      this.form.customerReview.push({
        customerName: "",
        content: "",
        image: null
      });
    },

    removeReview(i) {
      this.form.customerReview.splice(i,1);
    },

    async upload(file) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post("/files/upload-single", fd);
      return res.data;
    },

    async handleHero(e) {
      const file = e.target.files[0];
      if (file) {
        this.form.heroImage = await this.upload(file);
      }
    },

    async handleStepImage(i) {
      const file = event.target.files[0];
      if (file) {
        this.form.heritageSteps[i].image = await this.upload(file);
      }
    },

    async handleReviewImage(i) {
      const file = event.target.files[0];
      if (file) {
        this.form.customerReview[i].image = await this.upload(file);
      }
    },

    async updateJournal() {
      await api.put(`/api/saree-journal/${this.form.id}`, this.form);
      this.dialog = false;
      this.fetchJournals();
    },

    async deleteJournal(id) {
      if (!confirm("Delete journal?")) return;

      await api.delete(`/api/saree-journal/${id}`);
      this.journals = this.journals.filter(j => j.id !== id);
    }

  }
};
</script>
