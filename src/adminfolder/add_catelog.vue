<template>
    <div class="mb-9">
         <v-row justify="center" >
          <v-col cols="12" md="10">
            <v-card class="pa-6 upload-card" variant="flat">
              <!-- Title -->
              <div class="d-flex align-center mb-6">
                <img src="@/assets/logo.png" alt="logo" width="60" class="mr-3" />
                <h2 class="font-weight-bold text-brown">Add Catelog</h2>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" rounded  @click="subDialog = true">Add subcategory</v-btn>
              </div>
              </v-card>
              </v-col>
              </v-row>
               <v-row>
                <!-- Image Upload Section -->
                <v-col cols="12" md="5" class="d-flex flex-column align-center">
                  <!-- Cover Image -->
                  <h4 class="text-uppercase font-weight-bold">Image</h4>
                  <div class="upload-box" @click="triggerFileInput('cover')" @keydown.enter="triggerFileInput('cover')">
                    <img v-if="coverPreview" :src="coverPreview" alt="Cover Preview" class="preview-img" />
                    <div v-else class="upload-text">
                      <v-icon size="40" color="#A07547">mdi-cloud-upload</v-icon>
                      <p>Upload Image</p>
                    </div>
                    <input type="file" ref="coverInput" accept="image/*" class="d-none"
                      @change="handleFileUpload($event, 'cover')" />
                  </div>
                  </v-col>
                   <v-col cols="12" md="5">
                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Category</h4>
                    <v-text-field v-model="category" placeholder="Add Title" variant="underlined" hide-details />
                  </div>

                  <div class="mb-6">
                    <h4 class="text-uppercase font-weight-bold">Sub category</h4>
                    <v-textarea v-model="subcategory" placeholder="Add Description" variant="underlined" rows="3"
                      hide-details />
                  </div>
                  <div class="mb-6">
                 <v-btn style="background-color: maroon;" class="text-white" @click="uploadFiles" :disabled="uploading">
                    {{ uploading ? 'SAVING...' : 'SAVE' }}
                  </v-btn>
                  </div>
                  </v-col>
                </v-row>
           

    </div>
         <v-dialog v-model="subDialog" max-width="400">
  <v-card class="pa-4">
    <h3>Add Subcategory</h3>

           <v-select
  :items="categories"
  v-model="selectedCategory"
  label="Select Category"
  item-title="Category"
  item-value="id"
/>


    <!-- New subcategory -->
    <v-text-field
      v-model="newSubcategory"
      label="New Subcategory"
    />

    <v-btn style="background-color: maroon;" class="text-white" @click="saveSubcategory" :disabled="uploading">
      {{ uploading ? 'SAVING...' : 'SAVE' }}
    </v-btn>
  </v-card>
</v-dialog> 
</template>
<script>
import api from  '@/adminfolder/axios'
export default
{
    data()
    {
       return{
      coverInput: null,
      thumbInput: null,
      coverFile: null,
      coverPreview: null,
      category:null,
      subcategory:[],
      subDialog: false,
    categories: [],
    selectedCategory: null,
    newSubcategory: "",
    uploading: false
        }
    },
    mounted() {
  this.fetchCategories();
},
    methods:{
      triggerFileInput(type) {
      if (type === "cover") this.$refs.coverInput.click();
    },

    handleFileUpload(e, type) {
      const files = Array.from(e.target.files);

      if (type === "cover" && files[0]) {
        this.coverFile = files[0];
        this.coverPreview = URL.createObjectURL(files[0]);
      }
    },
    async fetchCategories() {
    const res = await api.get("/catelog");
    this.categories = res.data;
  },
  async saveSubcategory() {
    this.uploading = true;
  try {
    await api.post("/admin/auth/catelog/add-subcategory", {
      catelogId: this.selectedCategory,
      subcategory: this.newSubcategory
    });

    this.subDialog = false;
    this.newSubcategory = "";
  } catch (err) {
    alert("Failed");
  }
  finally {
    this.uploading = false;
  }
},
    async uploadFiles() {
      this.uploading = true;
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

        await this.saveProduct(coverUrl);
        this.resetForm();
        alert("Category saved successfully!");
      } catch (err) {
        console.error(err.response?.data || err);
        alert("Upload failed");
      }
    },

    async saveProduct(coverUrl) {
      try {
        await api.post("/admin/auth/catelog", {
          image: coverUrl,
          Category: this.category,
          Subcategory:
    Array.isArray(this.Subcategory) &&
    this.Subcategory.flat().length === 0
      ? null
      : this.Subcategory
        });
        await this.fetchCategories();
      } catch (err) {
        console.error("Error saving product:", err);
        alert("Error saving product");
      }
      finally {
        this.uploading = false;
      }
    },

    resetForm() {
      this.category = "";
      this.subcategory=[];
      this.coverFile = null;
      this.coverPreview = null;
      if (this.$refs.coverInput) this.$refs.coverInput.value = "";
    }
    }
}
</script>
<style>
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
</style>