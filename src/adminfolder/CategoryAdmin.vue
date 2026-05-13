<template>
  <v-container fluid class="pa-6">

    <!-- HEADER -->
    <div class="header">
      <div>
        <h1>Category Dashboard</h1>
      </div>

      <v-btn class="add-btn" @click="$router.push('add/catelog')">
        <v-icon start>mdi-plus</v-icon>
        Add Category
      </v-btn>
    </div>

    <!-- GRID -->
    <v-row>
      <v-col
        v-for="cat in categories"
        :key="cat.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="modern-card">

          <!-- IMAGE -->
          <v-img
            :src="getImageUrl(cat.image)"
            height="180"
            cover
            class="card-img"
          />

          <!-- CONTENT -->
          <div class="pa-4">

            <!-- TITLE -->
            <div class="d-flex justify-space-between align-center">
              <h3>{{ cat.Category }}</h3>

              <div>
                <v-icon class="action edit" @click="openEdit(cat)">mdi-pencil</v-icon>
                <v-icon class="action delete" @click="deleteCategory(cat.id)">mdi-delete</v-icon>
              </div>
            </div>

            <!-- SUBS -->
            <div class="mt-3">
              <v-chip
                v-for="(sub, index) in cat.Subcategory"
                :key="index"
                class="chip"
                closable
                @click:close="deleteSubcategory(cat, index)"
              >
                {{ sub }}
              </v-chip>
            </div>

          </div>

        </v-card>
      </v-col>
    </v-row>

    <!-- DIALOG -->
    <v-dialog v-model="editDialog" max-width="550">
      <v-card class="dialog-card">

        <h2 class="mb-4">
          {{ editCategory.id ? "Edit Category" : "Add Category" }}
        </h2>

        <!-- IMAGE -->
        <div class="text-center mb-4">
          <v-img
            v-if="previewImage"
            :src="previewImage"
            height="200"
            class="rounded"
          />

          <v-btn class="mt-3" @click="triggerFile">
            Upload Image
          </v-btn>

          <input
            type="file"
            ref="fileInput"
            class="d-none"
            accept="image/*"
            @change="handleImage"
          />
        </div>

        <!-- CATEGORY -->
        <v-text-field
          label="Category Name"
          v-model="editCategory.Category"
        />

        <!-- ADD SUB -->
        <div class="d-flex align-center">
  <v-text-field
    label="Add Subcategory"
    v-model="newSub"
    class="flex-grow-1"
  />

  <v-btn
    class="ml-2"
    color="primary"
    @click="addSubcategory"
  >
    Add
  </v-btn>
</div>

        <!-- SUB LIST -->
        <div class="d-flex flex-wrap">
          <v-chip
            v-for="(sub, i) in editCategory.Subcategory"
            :key="i"
            class="chip"
            closable
            @click:close="editCategory.Subcategory.splice(i,1)"
          >
            {{ sub }}
          </v-chip>
        </div>

        <!-- ACTIONS -->
        <v-card-actions class="justify-end mt-4">
          <v-btn text @click="editDialog=false">Cancel</v-btn>
          <v-btn class="save-btn" @click="saveCategory">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import api from "@/adminfolder/axios"
import { resolveMediaUrl } from "@/utils/mediaUrl";
import router from "@/router";

export default {
  data() {
    return {
      categories: [],
      editDialog: false,
      editCategory: {
        Category: "",
        Subcategory: [],
        image: ""
      },

      newSub: "",
      newImageFile: null,
      previewImage: null,

      host: "https://srishakram-backend-v2.onrender.com"
    };
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {

    getImageUrl(path) {
      return resolveMediaUrl(path);
    },

    async fetchCategories() {
      try {
        const res = await api.get("/catelog");
        this.categories = res.data || [];
      } catch (err) {
        console.error(err);
      }
    },

    openEdit(cat) {
  this.editCategory = {
    ...JSON.parse(JSON.stringify(cat)),
    Subcategory: cat.Subcategory || []   // 🔥 VERY IMPORTANT
  };

  this.previewImage = this.getImageUrl(cat.image);
  this.newImageFile = null;
  this.newSub = "";   // 🔥 reset input
  this.editDialog = true;
},

    triggerFile() {
      this.$refs.fileInput.click();
    },

    handleImage(e) {
      const file = e.target.files[0];
      if (!file) return;

      this.newImageFile = file;
      this.previewImage = URL.createObjectURL(file);
    },

   addSubcategory() {
  const sub = this.newSub.trim();

  if (!sub) return;

  if (!this.editCategory.Subcategory) {
    this.editCategory.Subcategory = [];
  }

  // جلوگیری duplicate
  if (!this.editCategory.Subcategory.includes(sub)) {
    this.editCategory.Subcategory.push(sub);
  }

  this.newSub = "";
},

    async saveCategory() {
      try {

        let imageUrl = this.editCategory.image;

        // 🔥 Upload image if changed
        if (this.newImageFile) {
          const fd = new FormData();
          fd.append("file", this.newImageFile);

          const res = await api.post("/files/products/upload/single", fd);
          imageUrl = res.data;
        }

        const payload = {
        id: this.editCategory.id,
        Category: this.editCategory.Category,
        Subcategory: this.editCategory.Subcategory || [],
        image: imageUrl
        };
        console.log("Payload to save:", payload);
        if (this.editCategory.id) {
          await api.put(`/catelog/${this.editCategory.id}`, payload);
        } else {
          await api.post(`/catelog`, payload);
        }

        this.fetchCategories();
        this.editDialog = false;

      } catch (err) {
        console.error(err);
      }
    },

    async deleteCategory(id) {
      if (!confirm("Delete category?")) return;

      try {
        await api.delete(`/catelog/${id}`);
        this.categories = this.categories.filter(c => c.id !== id);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteSubcategory(cat, index) {
      const updated = [...cat.Subcategory];
      updated.splice(index, 1);

      try {
        await api.put(`/catelog/${cat.id}`, {
          ...cat,
          Subcategory: updated
        });

        cat.Subcategory.splice(index, 1);

      } catch (err) {
        console.error(err);
      }
    }

  }
};
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-btn {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
}

.modern-card {
  border-radius: 16px;
  overflow: hidden;
  transition: 0.3s;
  background: #ffffff;
}

.modern-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.card-img {
  border-bottom: 1px solid #eee;
}

.action {
  cursor: pointer;
  margin-left: 10px;
}

.action.edit {
  color: #2196f3;
}

.action.delete {
  color: #f44336;
}

.chip {
  margin: 4px;
}

.dialog-card {
  border-radius: 16px;
  padding: 20px;
}

.save-btn {
  background: linear-gradient(45deg, #00c853, #64dd17);
  color: white;
}

</style>