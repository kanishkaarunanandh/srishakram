<template>
  <div>
    <!-- PRODUCT GRID -->
    <v-row class="mt-10 px-10">
      <v-col
        v-for="product in imgs"
        :key="product.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="product-card position-relative">
  
  <!-- DELETE ICON -->
  <v-icon
    class="delete-icon"
    @click.stop="confirmDelete(product.id)"
  >
    mdi-delete
  </v-icon>

  <!-- IMAGE -->
  <v-img
    :src="getImageUrl(product.img)"
    height="250"
    cover
    @click="openProduct(product)"
  />
</v-card>
      </v-col>
    </v-row>

    <!-- EDIT DIALOG -->
    <v-dialog v-model="dialog" >
      <v-card class="pa-6 edit-card">
        <!-- HEADER -->
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="title">Edit Product</h3>
          <v-btn icon @click="closeDialog" variant="flat" style="color: maroon;">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-row>
          <!-- IMAGE SECTION -->
          <v-col cols="12" md="4" class="text-center">
            <!-- Cover Image -->
            <h4 class="mb-3 text-uppercase font-weight-bold">Cover Image</h4>
            <v-img
              v-if="previewImage"
              :src="previewImage"
              height="300"
              cover
              class="mb-4"
            />
            <div v-else class="no-image">No Image</div>
            
            <v-btn color="#615443" class="text-white" rounded="pill" @click="triggerFile">
              Change Cover Image
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              class="d-none"
              accept="image/*"
              @change="handleImage"
            />

            <!-- Thumbnail Images -->
            <h4 class="mt-5 mb-4 text-uppercase font-weight-bold">
              Thumbnail Images
            </h4>

            <div class="d-flex flex-wrap gap-3">
              <div
                v-for="(img, index) in thumbnailPreviews"
                :key="index"
                class="thumbnail-box"
              >
                <img :src="img" class="thumbnail-img" />
                <v-icon
                  small
                  class="remove-icon"
                  @click="removeThumbnail(index)"
                >
                  mdi-close-circle
                </v-icon>
              </div>

              <!-- Add new thumbnail -->
              <div class="upload-box small-box" @click="triggerThumbInput">
                <v-icon size="30" style="color: maroon;">mdi-plus</v-icon>
              </div>

              <input
                type="file"
                ref="thumbInput"
                multiple
                accept="image/*"
                class="d-none "
                @change="handleThumbnailUpload"
              />
            </div>
          </v-col>
           
          <!-- FORM -->
          <v-col cols="12" md="8">
            <v-text-field label="Title" v-model="edit.title" variant="underlined" />

            <v-textarea
              label="Description"
              v-model="edit.description"
              variant="underlined"
              rows="3"
            />

            <v-text-field
              label="Price"
              type="number"
              v-model="edit.price"
              variant="underlined"
            />

            <v-text-field
              label="Offer Price"
              type="number"
              v-model="edit.offer_price"
              variant="underlined"
            />

            <v-select
              label="Category"
              :items="categories"
              v-model="edit.category"
              variant="underlined"
            />

            <v-select
              label="Sub Category"
              :items="subcategories"
              v-model="edit.subcategory"
              variant="underlined"
            />

            <v-text-field
              label="Color"
              v-model="edit.color"
              variant="underlined"
            />

            <v-text-field
              label="Weight (grams)"
              type="number"
              v-model="edit.weight"
              variant="underlined"
            />

            <v-text-field
              label="Blouse Length"
              type="number"
              v-model="edit.blouselength"
              variant="underlined"
            />

            <v-text-field
              label="Saree Length"
              type="number"
              v-model="edit.sareelength"
              variant="underlined"
            />

            <!-- STOCK BUTTONS -->
            <div class="d-flex gap-4 mt-4 justify-space-evenly">
              <v-btn
                
                :class="edit.instock ? 'selected-btn' : 'unselected-btn'"
                rounded="pill"
                @click="edit.instock = !edit.instock"
              >
                Instock
              </v-btn>

              <v-btn
                :class="edit.newArrival ? 'selected-btn' : 'unselected-btn'"
                rounded="pill"
                @click="edit.newArrival = !edit.newArrival"
              >
                New Arrival
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- SAVE -->
        <div class="text-center mt-6 ">
          <v-btn style="background-color: maroon;margin-left: 450px; margin-top: 50px;" class="text-white px-8" rounded="pill" @click="updateProduct" :disabled="uploading">
            {{ uploading ? 'UPDATING...' : 'SAVE CHANGES' }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h6">Confirm Delete</v-card-title>
    <v-card-text>
      Are you sure you want to delete this product?
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text @click="deleteDialog = false">Cancel</v-btn>
      <v-btn color="red" @click="deleteProduct">Delete</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  </div>
</template>

<script>
import api from "@/adminfolder/axios"
import { resolveMediaUrl } from "@/utils/mediaUrl";

export default {
  data() {
    return {
      uploading: false,
      host: "https://srishakram-backend-v2.onrender.com",
      imgs: [],
      dialog: false,

      edit: {},
      selectedId: null,

      // Cover image
      newImageFile: null,
      previewImage: null,

      // Thumbnail images
      existingImages: [],
      newThumbnailFiles: [],
      thumbnailPreviews: [],

      // ✅ CATEGORY DATA
      catalog: [],
      categories: [],
      subcategories: [],
      deleteDialog: false,
      deleteId: null,
    };
  },

  mounted() {
    this.loadProducts();
    this.fetchCategories();
  },

  watch: {
    // ✅ When category changes → update subcategories
    "edit.category"(newVal) {
      const selected = this.catalog.find(
        item => item.Category === newVal
      );

      this.subcategories = selected?.Subcategory || [];
    }
  },

  methods: {
    confirmDelete(id) {
  this.deleteId = id;
  this.deleteDialog = true;
},
async confirmDelete(id) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");

  if (!confirmDelete) return;

  try {
    await api.delete(`/admin/auth/product/${id}`);

    // Remove from UI instantly (no reload needed)
    this.imgs = this.imgs.filter(p => p.id !== id);

    alert("✅ Product deleted successfully!");

  } catch (err) {
    console.error("Delete error:", err);
    alert("❌ Failed to delete product");
  }
},
async deleteProduct() {
  try {
    await api.delete(`/admin/auth/product/${this.deleteId}`);

    this.imgs = this.imgs.filter(p => p.id !== this.deleteId);

    this.deleteDialog = false;
    alert("✅ Product deleted!");

  } catch (err) {
    console.error(err);
    alert("❌ Delete failed");
  }
},
    // ✅ FETCH CATEGORY DATA
    async fetchCategories() {
      const res = await api.get("/catelog");

      this.catalog = res.data;

      // Extract only category names
      this.categories = this.catalog.map(item => item.Category);
    },

    getImageUrl(path) {
      return resolveMediaUrl(path);
    },

    async loadProducts() {
      try {
        this.imgs = [];

        let page = 0;
        let totalPages = 1;

        while (page < totalPages) {
          const res = await api.get("upload/getproduct/category", {
            params: {
              category: "All Kanchipuram Silk Saree",
              minPrice: 1000,
              maxPrice: 150000,
              inStock: false,
              newArrival: false,
              page: page
            }
          });

          this.imgs.push(...res.data.content);
          totalPages = res.data.totalPages;
          page++;
        }

      } catch (err) {
        console.error("Product load failed:", err);
      }
    },

    openProduct(product) {
      this.selectedId = product.id;
      this.edit = { ...product };

      // ✅ Set category-based subcategories
      const selected = this.catalog.find(
        item => item.Category === product.category
      );
      this.subcategories = selected?.Subcategory || [];

      // Cover image
      this.previewImage = this.getImageUrl(product.img);
      this.newImageFile = null;

      // Thumbnails
      this.existingImages = [...(product.images || [])];
      this.thumbnailPreviews = this.existingImages.map(img =>
        this.getImageUrl(img)
      );
      this.newThumbnailFiles = [];

      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.previewImage = null;
      this.newImageFile = null;
      this.existingImages = [];
      this.newThumbnailFiles = [];
      this.thumbnailPreviews = [];
      this.edit = {};
      this.selectedId = null;
    },

    triggerFile() {
      this.$refs.fileInput.click();
    },

    handleImage(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.newImageFile = file;
      this.previewImage = URL.createObjectURL(file);
      e.target.value = "";
    },

    triggerThumbInput() {
      this.$refs.thumbInput.click();
    },

    handleThumbnailUpload(e) {
      const files = Array.from(e.target.files);

      files.forEach(file => {
        this.newThumbnailFiles.push(file);
        this.thumbnailPreviews.push(URL.createObjectURL(file));
      });

      e.target.value = "";
    },

    removeThumbnail(index) {
      const existingCount = this.existingImages.length;

      if (index < existingCount) {
        this.existingImages.splice(index, 1);
      } else {
        const newIndex = index - existingCount;
        this.newThumbnailFiles.splice(newIndex, 1);
      }

      this.thumbnailPreviews.splice(index, 1);
    },

    async updateProduct() {
      this.uploading = true;

      try {
        let imgUrl = this.edit.img;

        // Upload cover image
        if (this.newImageFile) {
          const fd = new FormData();
          fd.append("file", this.newImageFile);
          const res = await api.post("/files/products/upload/single", fd);
          imgUrl = res.data;
        }

        // Existing images
        let finalImages = [...this.existingImages];

        // Upload new thumbnails
        for (let file of this.newThumbnailFiles) {
          const fd = new FormData();
          fd.append("file", file);
          const res = await api.post("/files/products/upload/single", fd);
          finalImages.push(res.data);
        }

        const payload = {
          img: imgUrl,
          images: finalImages,
          title: this.edit.title,
          description: this.edit.description,
          offer_price: this.edit.offer_price,
          price: Number(this.edit.price),
          category: this.edit.category,
          subcategory: this.edit.subcategory,
          color: this.edit.color,
          weight: Number(this.edit.weight),
          blouselength: Number(this.edit.blouselength),
          sareelength: Number(this.edit.sareelength),
          instock: this.edit.instock,
          newArrival: this.edit.newArrival
        };

        await api.put(`/admin/auth/product/${this.selectedId}`, payload);

        await this.loadProducts();
        this.closeDialog();

        alert("✅ Product updated successfully!");

      } catch (err) {
        console.error("Update error:", err);
        alert("❌ Update failed");
      } finally {
        this.uploading = false;
      }
    }
  }
};
</script>

<style scoped>
.delete-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  color: red;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  z-index: 10;
}
.product-card {
  border: 2px solid maroon;
  border-radius: 16px;
  cursor: pointer;
  margin-bottom:50px;
}

.edit-card {
  border: 2px solid maroon;
  border-radius: 14px;
}

.title {
  color: maroon;
  font-weight: 700;
}

.selected-btn {
  background: maroon;
  color: white;
}

.unselected-btn {
  border: 2px solid maroon;
  color: maroon;
}

.no-image {
  height: 300px;
  border: 2px dashed marron;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-box {
  border: 2px dashed maroon;
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
  margin-left: 10px;
}

.thumbnail-box {
  position: relative;
  width: 100px;
  height: 100px;
  border: 2px solid maroon;
  border-radius: 12px;
  overflow: hidden;
  margin-left: 10px;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  
}

.remove-icon {
  position: absolute;
  top: 2px;
  right: 2px;
  color: red;
  cursor: pointer;
  background: white;
  border-radius: 50%;
}
</style>