<template>
  <v-app>
    <v-main>
      <v-container fluid class="editor-bg">
        <v-row>

          <!-- ================= LEFT : INPUTS ================= -->
          <v-col cols="6" class="left-panel">

            <!-- HEADER & FOOTER -->
            <v-card class="section-card">
              <v-card-title>Header & Footer</v-card-title>

              <v-file-input
                v-model="files.hero"
                label="Hero Video"
                variant="outlined"
                accept="video/*"
              />

              <v-file-input
                v-model="files.footer"
                label="Footer Image"
                variant="outlined"
                accept="image/*"
              />
            </v-card>

            <!-- SECTION 1 -->
            <v-card class="section-card">
              <v-card-title>Section 1 · Videos</v-card-title>

              <v-file-input
                v-model="files.video1"
                label="Upload Video 1"
                variant="outlined"
                accept="video/*"
              />
              <v-file-input
                v-model="files.video2"
                label="Upload Video 2"
                variant="outlined"
                accept="video/*"
              />
              <v-file-input
                v-model="files.video3"
                label="Upload Video 3"
                variant="outlined"
                accept="video/*"
              />
              <v-file-input
                v-model="files.video4"
                label="Upload Video 4"
                variant="outlined"
                accept="video/*"
              />
              <v-file-input
                v-model="files.video5"
                label="Upload Video 5"
                variant="outlined"
                accept="video/*"
              />
            </v-card>

            <v-btn
              style="background-color: maroon;"
              class="text-white mt-6"
              rounded="pill"
              size="large"
              @click="uploadFile"
              :disabled="uploading"
            >
              {{ uploading ? 'UPLOADING...' : 'SAVE' }}
            </v-btn>
          </v-col>

          <!-- ================= RIGHT : PREVIEW ================= -->
          <v-col cols="6" class="right-panel">
            <h3 class="mb-4">Live Preview</h3>

            <!-- HERO PREVIEW -->
            <div v-if="files.hero" class="preview-block">
              <video :src="preview(files.hero)" autoplay muted loop />
              <span>Hero Video</span>
            </div>

            <!-- SECTION 1 PREVIEW -->
            <div class="preview-grid">
              <div v-if="files.video1" class="preview-block">
                <video :src="preview(files.video1)" muted controls playsinline />
                <span>Section 1 - 1</span>
              </div>
              <div v-if="files.video2" class="preview-block">
                <video :src="preview(files.video2)" muted controls playsinline />
                <span>Section 1 - 2</span>
              </div>
              <div v-if="files.video3" class="preview-block">
                <video :src="preview(files.video3)" muted controls playsinline />
                <span>Section 1 - 3</span>
              </div>
              <div v-if="files.video4" class="preview-block">
                <video :src="preview(files.video4)" muted controls playsinline />
                <span>Section 1 - 4</span>
              </div>
              <div v-if="files.video5" class="preview-block">
                <video :src="preview(files.video5)" muted controls playsinline />
                <span>Section 1 - 5</span>
              </div>
            </div>

            <!-- FOOTER -->
            <div v-if="files.footer" class="preview-block">
              <img :src="preview(files.footer)" />
              <span>Footer Image</span>
            </div>

           
          </v-col>

        </v-row>
      </v-container>

      <!-- ERROR DIALOG -->
      <v-dialog v-model="altermsg" max-width="400">
        <v-card>
          <v-card-title :class="dialogType === 'error' ? 'text-red' : 'text-green'">
            {{ dialogType === 'error' ? 'Error' : 'Success' }}
          </v-card-title>
          <v-card-text>{{ dialogMessage }}</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="altermsg = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import api from "./axios.js"

export default {
  data() {
    return {
      files: {
        hero: null,
        video1: null,
        video2: null,
        video3: null,
        video4: null,
        video5: null,
        journal1: null,
        journal2: null,
        journal3: null,
        footer: null,
        section3_1: null,
        section3_2: null,
        section3_3: null
      },
      altermsg: false,
      dialogMessage: "",
      dialogType: "error",
      uploading: false
    }
  },

  methods: {
    preview(file) {
      if (!file) return ""
      return URL.createObjectURL(file)
    },

    async uploadFile() {
      // Check if any files selected
      const hasFiles = Object.values(this.files).some(f => f !== null)
      if (!hasFiles) {
        this.dialogMessage = "Please select files first!"
        this.dialogType = "error"
        this.altermsg = true
        return
      }

      this.uploading = true

      try {
        const formData = new FormData()
        const indexMap = {
          hero: 0,
          video1: 1,
          video2: 2,
          video3: 3,
          video4: 4,
          video5: 5,
          journal1: 6,
          journal2: 7,
          journal3: 8,
          footer: 9,
          section3_1: 10,
          section3_2: 11,
          section3_3: 12
        }

        // Add files to FormData
        Object.entries(this.files).forEach(([key, file]) => {
          if (file) {
            formData.append("files", file)
            formData.append("indexes", indexMap[key])
          }
        })

        // Upload to S3
        const uploadRes = await api.post("/files/upload", formData, {
          timeout: 300000,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        
        const urls = uploadRes.data
        console.log('Upload response:', urls)

        // Map to backend schema
        const payload = {
          hero: urls["0"] || null,

          section1_1: urls["1"] || null,
          section1_2: urls["2"] || null,
          section1_3: urls["3"] || null,
          section1_4: urls["4"] || null,
          section1_5: urls["5"] || null,

          section2_1: urls["6"] || null,
          section2_2: urls["7"] || null,
          section2_3: urls["8"] || null,

          footer: urls["9"] || null,

          section3_1: urls["10"] || null,
          section3_2: urls["11"] || null,
          section3_3: urls["12"] || null
        }

        console.log("Sending payload:", payload)

        // Save to database
        await api.post("/admin/auth/imgs", payload)
        
        this.dialogMessage = "All files uploaded successfully!"
        this.dialogType = "success"
        this.altermsg = true

        // Reset form
        this.files = {
          hero: null,
          video1: null,
          video2: null,
          video3: null,
          video4: null,
          video5: null,
          journal1: null,
          journal2: null,
          journal3: null,
          footer: null,
          section3_1: null,
          section3_2: null,
          section3_3: null
        }
      } catch (err) {
        console.error(err)
        this.dialogMessage = "Error uploading files: " + (err.response?.data?.message || err.message)
        this.dialogType = "error"
        this.altermsg = true
      } finally {
        this.uploading = false
      }
    }
  }
}
</script>

<style scoped>
.editor-bg {
  background: #f6f4f1;
  min-height: 100vh;
}

.left-panel {
  padding-right: 24px;
}

.right-panel {
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 24px;
  overflow-y: auto;
}

.section-card {
  padding: 20px;
  border-radius: 18px;
  margin-bottom: 24px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.preview-block {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,.15);
  margin-bottom: 16px;
}

.preview-block img,
.preview-block video {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.preview-block span {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0,0,0,.6);
  color: #fff;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
}
</style>