<template>
  <v-container fluid class="journal-wrapper">
    <v-row>
      <!-- ================= LEFT : EDITOR PANEL ================= -->
      <v-col cols="12" md="4">
        <div class="editor-panel">
          <h2 class="editor-title">Saree Journal Editor</h2>

          <!-- PRODUCT -->
          <v-text-field
            v-model="form.productName"
            label="Product Name"
            variant="outlined"
            density="comfortable"
          />

          <!-- HERO -->
          <v-file-input
            v-model="heroFile"
            label="Hero Banner Image (Landscape only)"
            accept="image/*"
            variant="outlined"
            density="comfortable"
            @change="handleHeroFileChange"
          />

          <!-- ZARI -->
          <h3 class="section-title">Zari Certificate</h3>
          <v-file-input
            v-model="zariFile"
            label="Zari Certificate Image (Landscape only)"
            accept="image/*"
            variant="outlined"
            density="comfortable"
            @change="handleZariFileChange"
          />

          <!-- HERITAGE -->
          <h3 class="section-title">Heritage Story</h3>

          <div
            v-for="(step, i) in form.heritageSteps"
            :key="i"
            class="editor-block"
          >
            <v-text-field v-model="step.title" label="Title" variant="outlined" />
            <v-textarea v-model="step.description" label="Description" variant="outlined" />

            <v-file-input
              v-model="step.file"
              label="Story Image (Landscape only)"
              accept="image/*"
              variant="outlined"
              @change="handleStepImageChange(i)"
            />

            <v-btn variant="text" color="red" @click="removeStep(i)">
              Remove
            </v-btn>
          </div>

          <v-btn class="mb-6 text-white" style="background-color: brown;" @click="addStep">
            + Add Heritage Step
          </v-btn>

          <!-- REVIEWS -->
          <h3 class="section-title">Customer Voices</h3>

          <div
            v-for="(review, i) in form.customerReview"
            :key="i"
            class="editor-block"
          >
            <v-text-field v-model="review.customerName" label="Customer Name" variant="outlined" />
            <v-textarea v-model="review.content" label="Review" variant="outlined" />

            <v-file-input
              v-model="review.imageFile"
              label="Customer Image (Landscape only)"
              accept="image/*"
              variant="outlined"
              @change="handleReviewImageChange(i)"
            />

            <v-file-input
              v-model="review.videoFile"
              label="Customer Video (optional)"
              accept="video/*"
              variant="outlined"
              @change="uploadReviewVideo(i)"
            />

            <v-btn variant="text" color="red" @click="removeReview(i)">
              Remove
            </v-btn>
          </div>

          <v-btn style="background-color: brown;" class="mb-4 text-white" @click="addReview">
            + Add Review
          </v-btn>

          <v-btn block size="large" style="background-color: maroon;color: white; margin-top: 15px;" @click="save" :disabled="uploading">
            {{ uploading ? 'UPLOADING...' : 'SAVE JOURNAL' }}
          </v-btn>
        </div>
      </v-col>

      <!-- ================= RIGHT : LUXURY PREVIEW ================= -->
      <v-col cols="12" md="8">
        <div class="preview-panel">
          <!-- HERO -->
          <div class="hero-preview" v-if="heroPreview">
            <img :src="heroPreview" />
            <div class="hero-overlay">
              <span class="badge">Handcrafted</span>
              <h1>{{ form.productName || "Pure Silk Saree" }}</h1>
            </div>
          </div>

          <!-- HERITAGE -->
          <h2 class="preview-heading">Our Heritage</h2>

          <div
            v-for="(step, i) in form.heritageSteps"
            :key="'p'+i"
            class="heritage-row"
            :class="{ reverse: i % 2 !== 0 }"
          >
            <img v-if="step.image" :src="step.image" />
            <div class="heritage-text">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>

          <!-- ZARI -->
          <div v-if="form.zariCertificateImage" class="zari-section">
            <h2 class="preview-heading">Zari Certificate</h2>
            <div class="zari-box">
              <img :src="form.zariCertificateImage" />
              <p>
                This certificate guarantees the purity and authenticity of zari,
                ensuring the saree meets the highest traditional standards.
              </p>
            </div>
          </div>

          <!-- REVIEWS -->
         <!-- REVIEWS -->
<h2 class="preview-heading">Customer Reviews</h2>

<v-slide-group show-arrows>
  <v-slide-item
    v-for="(review, i) in form.customerReview"
    :key="'r'+i"
  >
    <div class="review-preview">

      <!-- IMAGE -->
      <img
        v-if="review.image"
        :src="review.image"
        class="avatar"
      />

      <!-- VIDEO PREVIEW -->
      <video
        v-if="reviewVideoPreview(review)"
        :src="reviewVideoPreview(review)"
        muted
        loop
        playsinline
        class="review-video"
        @mouseenter="$event.target.play()"
        @mouseleave="$event.target.pause()"
      ></video>

      <p>"{{ review.content }}"</p>
      <span>— {{ review.customerName || "Verified Buyer" }}</span>

    </div>
  </v-slide-item>
</v-slide-group>


        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/adminfolder/axios"

export default {
  data() {
    return {
      heroFile: null,
      zariFile: null,
      form: {
        productName: "",
        heroImage: null,
        zariCertificateImage: null,
        heritageSteps: [],
        customerReview: [],
        uploading: false
      }
    }
  },

  computed: {
    heroPreview() {
      return this.form.heroImage ||
        (this.heroFile ? URL.createObjectURL(this.heroFile) : null)
    }
  },

  methods: {
    // Validate that image is landscape (width >= height)
    async validateLandscapeImage(file) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)
        
        img.onload = () => {
          URL.revokeObjectURL(url)
          if (img.width >= img.height) {
            resolve(true)
          } else {
            reject(new Error('Please upload a landscape (horizontal) image only. Portrait images are not allowed.'))
          }
        }
        
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('Invalid image file'))
        }
        
        img.src = url
      })
    },

    // Hero image validation
    async handleHeroFileChange() {
      const file = this.heroFile
      if (!file) return
      
      try {
        await this.validateLandscapeImage(file)
      } catch (error) {
        alert(error.message)
        this.heroFile = null
      }
    },

    // Zari image validation
    async handleZariFileChange() {
      const file = this.zariFile
      if (!file) return
      
      try {
        await this.validateLandscapeImage(file)
        await this.uploadZari()
      } catch (error) {
        alert(error.message)
        this.zariFile = null
      }
    },

    // Heritage step image validation
    async handleStepImageChange(i) {
      const file = this.form.heritageSteps[i].file
      if (!file) return
      
      try {
        await this.validateLandscapeImage(file)
        await this.uploadStepImage(i)
      } catch (error) {
        alert(error.message)
        this.form.heritageSteps[i].file = null
      }
    },

    // Review image validation
    async handleReviewImageChange(i) {
      const file = this.form.customerReview[i].imageFile
      if (!file) return
      
      try {
        await this.validateLandscapeImage(file)
        await this.uploadReviewImage(i)
      } catch (error) {
        alert(error.message)
        this.form.customerReview[i].imageFile = null
      }
    },

    reviewVideoPreview(review) {
      // If already uploaded (S3 key / URL)
      if (review.video) return review.video

      // If selected but not uploaded yet
      if (review.videoFile)
        return URL.createObjectURL(review.videoFile)

      return null
    },

    addStep() {
      this.form.heritageSteps.push({
        title: "",
        description: "",
        image: null,
        file: null
      })
    },

    removeStep(i) {
      this.form.heritageSteps.splice(i, 1)
    },

    addReview() {
      this.form.customerReview.push({
        customerName: "",
        content: "",
        image: null,
        video: null,
        imageFile: null,
        videoFile: null
      })
    },

    removeReview(i) {
      this.form.customerReview.splice(i, 1)
    },

    async uploadStepImage(i) {
      const f = this.form.heritageSteps[i].file
      if (f) this.form.heritageSteps[i].image = await this.uploadToS3(f)
    },

    async uploadReviewImage(i) {
      const f = this.form.customerReview[i].imageFile
      if (f) this.form.customerReview[i].image = await this.uploadToS3(f)
    },

    async uploadReviewVideo(i) {
      const f = this.form.customerReview[i].videoFile
      if (f) this.form.customerReview[i].video = await this.uploadToS3(f)
    },

    async uploadZari() {
      if (this.zariFile)
        this.form.zariCertificateImage = await this.uploadToS3(this.zariFile)
    },

    async uploadToS3(file) {
      const fd = new FormData()
      fd.append("file", file)
      const res = await api.post("/files/upload-single", fd)
      return res.data
    },

    async save() {
      this.uploading = true
      if (this.heroFile && !this.form.heroImage)
        this.form.heroImage = await this.uploadToS3(this.heroFile)

      this.form.heritageSteps.forEach(s => delete s.file)
      this.form.customerReview.forEach(r => {
        delete r.imageFile
        delete r.videoFile
      })

      await api.post("/api/saree-journal", this.form)
      alert("Journal saved")
        this.resetForm()
        this.uploading = false

    },
    resetForm() {
  this.heroFile = null
  this.zariFile = null

  this.form = {
    productName: "",
    heroImage: null,
    zariCertificateImage: null,
    heritageSteps: [],
    customerReview: []
  }
}

  }
}
</script>
<style scoped>
.review-video {
  width: 100%;
  height: 160px;
  border-radius: 14px;
  object-fit: cover;
  margin-bottom: 12px;
  box-shadow: 0 8px 18px rgba(0,0,0,.15);
  cursor: pointer;
}

.review-preview {
  position: relative;
}

.journal-wrapper {
  background: linear-gradient(135deg, #f7efe8, #efe3d7);
}

.editor-panel {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(14px);
  padding: 30px;
  border-radius: 24px;
}

.editor-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
  color: maroon;
}

.section-title {
  margin: 28px 0 12px;
  font-weight: 600;
  color: maroon;
}

.editor-block {
  margin-bottom: 20px;
}

.preview-panel {
  background: #fffaf5;
  border-radius: 28px;
  padding: 30px;
}

.hero-preview {
  position: relative;
  height: 360px;
  border-radius: 22px;
  overflow: hidden;
}

.hero-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.65), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  color: white;
}

.badge {
  background: #c6a25d;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  width: fit-content;
  margin-bottom: 8px;
}

.preview-heading {
  margin: 40px 0 18px;
  color: maroon;
}

.heritage-row {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  align-items: center;
}

.heritage-row.reverse {
  flex-direction: row-reverse;
}

.heritage-row img {
  width: 260px;
  height: 320px;
  object-fit: cover;
  border-radius: 18px;
}

.zari-box {
  display: flex;
  gap: 30px;
  align-items: center;
}

.zari-box img {
  width: 260px;
  border-radius: 14px;
}

.review-preview {
  width: 280px;
  background: white;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,.12);
  margin-right: 20px;
}

.review-preview img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}
</style>