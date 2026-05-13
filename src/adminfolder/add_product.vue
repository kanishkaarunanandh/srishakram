<template>
  <v-app>
    <v-main>
      <div class="mt-7 mb-7">
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-card class="pa-6 upload-card" variant="flat">
              <!-- Title -->
              <div class="d-flex align-center mb-6">
                <img src="@/assets/logo.png" alt="logo" width="60" class="mr-3" />
                <h2 class="font-weight-bold text-brown">Add Product</h2>
              </div>

              <v-row>
                <!-- Image Upload Section -->
                <v-col cols="12" md="5" class="d-flex flex-column align-center">
                  <!-- Cover Image -->
                  <h4 class="text-uppercase font-weight-bold">Cover Image</h4>
                  <div class="upload-box" @click="triggerFileInput('cover')" @keydown.enter="triggerFileInput('cover')">
                    <img v-if="coverPreview" :src="coverPreview" alt="Cover Preview" class="preview-img" />
                    <div v-else class="upload-text">
                      <v-icon size="40" color="#A07547">mdi-cloud-upload</v-icon>
                      <p>Upload Cover</p>
                    </div>
                    <input type="file" ref="coverInput" accept="image/*" class="d-none"
                      @change="handleFileUpload($event, 'cover')" />
                  </div>

                  <!-- Thumbnail Images -->
                  <h4 class="mt-5 mb-4 text-uppercase font-weight-bold">Thumbnail Images</h4>
                  <div class="d-flex flex-wrap gap-3">
                    <div v-for="(img, index) in thumbnailPreviews" :key="index" class="thumbnail-box">
                      <img :src="img" class="thumbnail-img" />
                      <v-icon small class="remove-icon" @click="removeThumbnail(index)">mdi-close-circle</v-icon>
                    </div>

                    <!-- Add more thumbnails -->
                    <div class="upload-box small-box" @click="triggerFileInput('thumb')">
                      <v-icon size="30" color="#A07547">mdi-plus</v-icon>
                    </div>

                    <input type="file" ref="thumbInput" accept="image/*" multiple class="d-none"
                      @change="handleFileUpload($event, 'thumb')" />
                  </div>

                  <!-- Stock Type Buttons -->
                  <div class="d-flex justify-center mt-4 gap-4">
                    <v-btn :class="InstockType.includes('Instock') ? 'selected-btn' : 'unselected-btn'"
                      @click="toggleStockType('Instock')" rounded="pill" style="margin-right: 20px;">
                      Instock
                    </v-btn>

                    <v-btn :class="InstockType.includes('NewArrival') ? 'selected-btn' : 'unselected-btn'"
                      @click="toggleStockType('NewArrival')" rounded="pill">
                      NewArrival
                    </v-btn>
                  </div>
                </v-col>

                <!-- Form Fields -->
                <v-col cols="12" md="7">
                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Title</h4>
                    <v-text-field v-model="title" placeholder="Add Title" variant="underlined" hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Description</h4>
                    <v-textarea v-model="description" placeholder="Add Description" variant="underlined" rows="3"
                      hide-details />
                  </div>
                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Price</h4>
                    <v-text-field v-model="price" placeholder="e.g. 2499" variant="underlined" type="number"
                      hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Offer Price</h4>
                    <v-textarea v-model="details" placeholder="Add Offer Price" variant="underlined" rows="2"
                      hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Category</h4>
                    <v-select v-model="category" :items="categories" placeholder="Select Category" variant="underlined"
                      hide-details />
                  </div>
                   <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Sub Category</h4>
                    <v-select v-model="subcategory" :items="subcategories" placeholder="Select Sub Category" variant="underlined"
                      hide-details />
                  </div>
                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Blouse Length</h4>
                    <v-text-field v-model="blouseLength" placeholder="e.g. 0.8 meters" variant="underlined"
                      hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Saree Length</h4>
                    <v-text-field v-model="sareeLength" placeholder="e.g. 5.5 meters" variant="underlined"
                      hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Color</h4>
                    <v-text-field v-model="color" placeholder="e.g. Maroon with Gold Border" variant="underlined"
                      hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Weight</h4>
                    <v-text-field v-model="weight" placeholder="e.g. 850 grams" variant="underlined" hide-details />
                  </div>

                </v-col>
              </v-row>

              <!-- Save Button -->
              <div class="d-flex justify-center mt-6">
                <v-btn style="background-color: maroon;" class="text-white px-8" rounded="pill" @click="uploadFiles" :disabled="uploading">
                  {{uploading ? 'UPLOADING...' : 'SAVE'}}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import api from "./axios.js";

export default {
  data() {
    return {
      coverInput: null,
      thumbInput: null,

      coverFile: null,
      coverPreview: null,

      thumbnailFiles: [],
      thumbnailPreviews: [],

      title: "",
      description: "",
      details: "",
      category: "",
      subcategory: "",
      subcategories: ["Extra Weft","Ganga Jamuna Bordar","Contrast","Butta","Checks","Stripes"],
      categories: [
        "All Kanchipuram Silk Saree",
        "Double Naada",
        "Korvai",
        "Morning-Evening",
        "Brocade",
        "All Self",
        "Pure Silk"
      ],

      blouseLength: "",
      sareeLength: "",
      color: "",
      weight: "",
      price: "",
      InstockType: [],
      uploading: false
    };
  },

  methods: {
    validateForm() {
      if (!this.title.trim()) return alert("Title is required");
      if (!this.description.trim()) return alert("Description is required");
      if (!this.category) return alert("Category is required");
      if (!this.color.trim()) return alert("Color is required");

      if (!this.price || Number(this.price) <= 0)
        return alert("Valid price is required");

      if (Number(this.weight) <= 0)
        return alert("Valid weight is required");

      return true;
    },

    toggleStockType(type) {
      if (this.InstockType.includes(type)) {
        this.InstockType = this.InstockType.filter(t => t !== type);
      } else {
        this.InstockType.push(type);
      }
    },

    triggerFileInput(type) {
      if (type === "cover") this.$refs.coverInput.click();
      else if (type === "thumb") this.$refs.thumbInput.click();
    },

    handleFileUpload(e, type) {
      const files = Array.from(e.target.files);

      if (type === "cover" && files[0]) {
        this.coverFile = files[0];
        this.coverPreview = URL.createObjectURL(files[0]);
      } else if (type === "thumb") {
        files.forEach(file => {
          this.thumbnailFiles.push(file);
          this.thumbnailPreviews.push(URL.createObjectURL(file));
        });
      }
    },

    removeThumbnail(index) {
      this.thumbnailFiles.splice(index, 1);
      this.thumbnailPreviews.splice(index, 1);
    },

    async uploadFiles() {
      this.uploading = true;
      if (!this.validateForm()) return;

      if (!this.coverFile) {
        alert("Please select a cover image!");
        return;
      }

      const coverForm = new FormData();
      coverForm.append("file", this.coverFile);

      try {
        const coverRes = await api.post(
          "/files/products/upload/single",
          coverForm
        );
        const coverUrl = coverRes.data;

        const thumbUrls = [];
        for (let file of this.thumbnailFiles) {
          const thumbForm = new FormData();
          thumbForm.append("file", file);
          const thumbRes = await api.post(
            "/files/products/upload/single",
            thumbForm
          );
          thumbUrls.push(thumbRes.data);
        }

        await this.saveProduct(coverUrl, thumbUrls);
        this.resetForm();
        alert("Product saved successfully!");
      } catch (err) {
        console.error(err.response?.data || err);
        alert("Upload failed");
      }
    },

    async saveProduct(coverUrl, thumbUrls) {
      try {
        await api.post("/admin/auth/product", {
          img: coverUrl,
          images: thumbUrls,
          title: this.title,
          description: this.description,
          offer_price: this.details,
          price: this.price,
          category: this.category,
          subcategory: this.subcategory,
          instock: this.InstockType.includes("Instock"),
          newArrival: this.InstockType.includes("NewArrival"),
          blouselength: this.blouseLength ? Number(this.blouseLength) : 0,
          sareelength: this.sareeLength ? Number(this.sareeLength) : 0,
          color: this.color,
          weight: this.weight ? Number(this.weight) : 0
        });
      } catch (err) {
        console.error("Error saving product:", err);
        alert("Error saving product");
      }
      finally {
         this.uploading = false;
      }
    },

    resetForm() {
      this.title = "";
      this.description = "";
      this.details = "";
      this.category = "";
      this.subcategory="";
      this.coverFile = null;
      this.coverPreview = null;
      this.thumbnailFiles = [];
      this.thumbnailPreviews = [];
      this.InstockType = [];
      this.blouseLength = "";
      this.sareeLength = "";
      this.color = "";
      this.weight = "";
      this.price = "";

      if (this.$refs.coverInput) this.$refs.coverInput.value = "";
      if (this.$refs.thumbInput) this.$refs.thumbInput.value = "";
    }
  }
};
</script>


<style scoped>
.selected-btn {
  background-color: #a07547;
  color: white;
}

.unselected-btn {
  background-color: white;
  color: #a07547;
  border: 2px solid #a07547;
}

.upload-card {
  width: 100%;
}

.upload-box {
  border: 2px dashed #a07547;
  border-radius: 12px;
  width: 100%;
  max-width: 320px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.small-box {
  width: 100px;
  height: 100px;
}

.upload-text {
  text-align: center;
  color: #a07547;
  font-weight: 600;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.thumbnail-box {
  position: relative;
  width: 100px;
  height: 100px;
  border: 2px solid #a07547;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-icon {
  position: absolute;

  right: 2px;
  color: red;
  cursor: pointer;
  background: white;
  border-radius: 50%;
}

.text-brown {
  color: #a07547;
}
</style>
