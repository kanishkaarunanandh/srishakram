<template>
  <v-container class="collection-container">
    <v-row>
      <!-- LEFT FILTERS -->
      <v-col cols="12" md="3" class="filters-col">
        <!-- Mobile Filter Toggle Button -->
        <v-btn 
          class="mobile-filter-btn" 
          block 
          variant="outlined"
          @click="mobileFiltersOpen = true"
        >
          <v-icon start>mdi-filter-variant</v-icon>
          Filters
        </v-btn>

        <!-- Desktop Filters (Sticky) -->
        <div class="desktop-filters sticky-filters">
          <v-expansion-panels flat>
            <v-expansion-panel
              v-for="filter in filters"
              :key="filter"
              v-show="filter !== 'SUBCATEGORY' || selectedCategoryFilter"
            >
              <v-expansion-panel-title class="filter-title">
                {{ filter }}
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <!-- AVAILABILITY -->
                <div v-if="filter === 'AVAILABILITY'" class="availability-box">
                  <v-checkbox v-model="inStockOnly" density="compact" hide-details @change="applyAvailabilityFilter">
                    <template #label>
                      <span class="availability-label">
                        In stock <span class="count">({{ inStockCount }})</span>
                      </span>
                    </template>
                  </v-checkbox>

                  <v-checkbox v-model="newArrivalOnly" density="compact" hide-details @change="applyAvailabilityFilter">
                    <template #label>
                      <span class="availability-label">
                        New arrivals <span class="count">({{ newArrivalCount }})</span>
                      </span>
                    </template>
                  </v-checkbox>
                </div>

                <!-- PRICE -->
                <div v-if="filter === 'PRICE'">
                  <div class="price-range-text">
                    Rs. {{ priceRange[0] }} <span>(MRP inclusive of all taxes)</span>
                  </div>
                  <div class="price-range-text text-right">
                    Rs. {{ priceRange[1] }} <span>(MRP inclusive of all taxes)</span>
                  </div>

                  <v-range-slider
                    v-model="priceRange"
                    :min="1000"
                    :max="150000"
                    step="100"
                    hide-details
                    class="mt-4"
                    @end="applyPriceFilter"
                  />
                </div>

                <!-- COLOR -->
                <div v-if="filter === 'COLOR'">
                  <v-checkbox
                    v-for="color in allColors"
                    :key="color"
                    :value="color"
                    v-model="selectedColors"
                    density="compact"
                    hide-details
                    @change="applyColorFilter"
                  >
                    <template #label>
                      <span class="availability-label">{{ color }}</span>
                    </template>
                  </v-checkbox>
                </div>

                <!-- CATEGORY -->
                <div v-if="filter === 'CATEGORY'">
                  <v-checkbox
                    v-for="cat in categoriesFilter"
                    :key="cat.id"
                    :label="cat.Category"
                    :value="cat"
                    v-model="selectedCategoryFilter"
                    density="compact"
                    hide-details
                    @change="applyCategoryFilter"
                  />
                </div>

                <!-- SUBCATEGORY -->
                <div v-if="filter === 'SUBCATEGORY' && selectedCategoryFilter">
                  <v-checkbox
                    v-for="sub in normalizedSubcategories"
                    :key="sub"
                    :label="sub"
                    :value="sub"
                    v-model="selectedSubcategoryFilter"
                    density="compact"
                    hide-details
                    @change="applySubcategoryFilter"
                  />
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <!-- Mobile Filters Dialog -->
        <v-dialog v-model="mobileFiltersOpen" fullscreen class="mobile-filters-dialog">
          <v-card>
            <v-toolbar color="white" elevation="0">
              <v-toolbar-title>Filters</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="mobileFiltersOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text class="pa-4">
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="filter in filters"
                  :key="filter"
                  v-show="filter !== 'SUBCATEGORY' || selectedCategoryFilter"
                >
                  <v-expansion-panel-title class="filter-title">
                    {{ filter }}
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    <!-- AVAILABILITY -->
                    <div v-if="filter === 'AVAILABILITY'" class="availability-box">
                      <v-checkbox v-model="inStockOnly" density="compact" hide-details @change="applyAvailabilityFilter">
                        <template #label>
                          <span class="availability-label">
                            In stock <span class="count">({{ inStockCount }})</span>
                          </span>
                        </template>
                      </v-checkbox>

                      <v-checkbox v-model="newArrivalOnly" density="compact" hide-details @change="applyAvailabilityFilter">
                        <template #label>
                          <span class="availability-label">
                            New arrivals <span class="count">({{ newArrivalCount }})</span>
                          </span>
                        </template>
                      </v-checkbox>
                    </div>

                    <!-- PRICE -->
                    <div v-if="filter === 'PRICE'">
                      <div class="price-range-text">
                        Rs. {{ priceRange[0] }} <span>(MRP inclusive of all taxes)</span>
                      </div>
                      <div class="price-range-text text-right">
                        Rs. {{ priceRange[1] }} <span>(MRP inclusive of all taxes)</span>
                      </div>

                      <v-range-slider
                        v-model="priceRange"
                        :min="1000"
                        :max="150000"
                        step="100"
                        hide-details
                        class="mt-4"
                        @end="applyPriceFilter"
                      />
                    </div>

                    <!-- COLOR -->
                    <div v-if="filter === 'COLOR'">
                      <v-checkbox
                        v-for="color in allColors"
                        :key="color"
                        :value="color"
                        v-model="selectedColors"
                        density="compact"
                        hide-details
                        @change="applyColorFilter"
                      >
                        <template #label>
                          <span class="availability-label">{{ color }}</span>
                        </template>
                      </v-checkbox>
                    </div>

                    <!-- CATEGORY -->
                    <div v-if="filter === 'CATEGORY'">
                      <v-checkbox
                        v-for="cat in categoriesFilter"
                        :key="cat.id"
                        :label="cat.Category"
                        :value="cat"
                        v-model="selectedCategoryFilter"
                        density="compact"
                        hide-details
                        @change="applyCategoryFilter"
                      />
                    </div>

                    <!-- SUBCATEGORY -->
                    <div v-if="filter === 'SUBCATEGORY' && selectedCategoryFilter">
                      <v-checkbox
                        v-for="sub in normalizedSubcategories"
                        :key="sub"
                        :label="sub"
                        :value="sub"
                        v-model="selectedSubcategoryFilter"
                        density="compact"
                        hide-details
                        @change="applySubcategoryFilter"
                      />
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>

            <v-card-actions class="pa-4">
              <v-btn block color="black" @click="mobileFiltersOpen = false">
                Apply Filters
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- RIGHT PRODUCTS -->
      <v-col cols="12" md="9">
        <!-- PRODUCT GRID -->
        <v-row ref="productGrid" class="products-grid">
          <v-col 
            v-for="product in visibleProducts" 
            :key="product.id" 
            cols="6" 
            sm="6" 
            md="4"
            class="product-col"
            :class="{ 'product-animate': shouldAnimate(product.id) }" 
            :style="getDelayStyle(product.id)"
            @click="showdetails(product)"
          >
            <v-card flat class="product-card">
              <div class="product-image-wrapper">
               <v-img :src="getImageUrl(product.img)" aspect-ratio="0.75" cover />
                <span v-if="product.instock || product.newArrival" class="badge">
                  {{ product.instock ? 'In Stock' : 'New Arrival' }}
                </span>
              </div>

              <v-card-text class="product-info">
                <div class="product-title">{{ product.title }}</div>
                <div class="product-price">
                  Rs. {{ product.price }}
                  <span class="price-note">(MRP inclusive of all taxes)</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div ref="sentinel" class="scroll-sentinel"></div>

        <!-- PAGINATION -->
        <div class="pagination-wrapper" v-if="showPagination && totalPages > 1">
          <span 
            v-for="p in paginationPages" 
            :key="p" 
            class="page-number" 
            :class="{ active: p - 1 === page }"
            @click="goToPage(p - 1)"
          >
            {{ p }}
          </span>

          <span v-if="totalPages > paginationPages.length" class="dots">...</span>

          <span 
            class="page-number" 
            v-if="totalPages > paginationPages.length" 
            @click="goToPage(totalPages - 1)"
          >
            {{ totalPages }}
          </span>

          <button class="next-btn" @click="nextPage">❯</button>
        </div>
      </v-col>
    </v-row>

    <!-- Bottom Description -->
    <div class="bottom-description">
      <p class="description-title">KANCHIPURAM COLLECTIONS</p>
      <p class="description-text">
        Step into the world of timeless sophistication with our exclusive collection of Kanchipuram silk sarees from
        Sri Shakram. Each saree is meticulously handcrafted by skilled artisans in the traditional looms of Kanchipuram,
        renowned for their exceptional craftsmanship and rich heritage. Adorned with intricate motifs and vibrant colors, 
        these sarees feature classic designs such as temple borders, intricate floral patterns, and geometric motifs,
        embellished with exquisite zari work. Perfect for weddings, cultural celebrations, and special occasions, our 
        Kanchipuram silk sarees embody luxury and tradition, offering unparalleled elegance and grace. Elevate your wardrobe 
        with the epitome of South Indian craftsmanship with Sri Shakram' Kanchipuram silk sarees, where every piece tells 
        a story of timeless beauty and cultural pride.
      </p>
    </div>

    <!-- Wedding Collection Banner -->
    <div class="wedding-banner">
      <div class="banner-content">
        <div class="banner-text">
          <p class="banner-title">Flat 20% Offer</p>
          <p class="banner-subtitle">Wedding Collection</p>
        </div>
        <v-btn color="black" class="shop-btn">shop collection</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import api from '@/adminfolder/axios'
import { resolveMediaUrl } from '@/utils/mediaUrl'

export default {
  data() {
    return {
      products: [],
      filters: ['AVAILABILITY', 'PRICE', 'COLOR', 'CATEGORY', 'SUBCATEGORY'],
      allColors: [],
      page: 0,
      totalPages: 0,
      priceRange: [1000, 150000],
      inStockOnly: false,
      newArrivalOnly: false,   
      inStockCount: 0,
      newArrivalCount: 0,
      visibleCount: 9,
      isAnimating: false,
      animatedIds: new Set(),
      useInfiniteScroll: true,
      showPagination: false,
      selectedColors: [],
      categoriesFilter: [],
      subcategoriesFilter: [],
      selectedCategoryFilter: null,
      selectedSubcategoryFilter: null,
      isLoadingMore: false,
      mobileFiltersOpen: false,
    }
  },

  computed: {
    category() {
      return this.$route.query.category
    },

    normalizedSubcategories() {
      let categoryObj = null

      if (this.selectedCategoryFilter) {
        categoryObj = this.selectedCategoryFilter
      } else if (this.$route.query.category) {
        categoryObj = this.categoriesFilter.find(
          c => c.Category === this.$route.query.category
        )
      }

      if (!categoryObj || !categoryObj.Subcategory) return []

      let subs = []

      if (Array.isArray(categoryObj.Subcategory)) {
        categoryObj.Subcategory.forEach(s => {
          if (typeof s === 'string') {
            subs.push(...s.split(','))
          }
        })
      } else if (typeof categoryObj.Subcategory === 'string') {
        subs = categoryObj.Subcategory.split(',')
      }

      return [...new Set(subs.map(s => s.trim()).filter(Boolean))]
    },

    activeFilter() {
      return this.$route.query.category || this.$route.query.subcategory
    },

    colorFromSearch() {
      return this.$route.query.color
    },

    paginationPages() {
      const pages = []
      for (let i = 1; i <= Math.min(5, this.totalPages); i++) {
        pages.push(i)
      }
      return pages
    },

    visibleProducts() {
      return this.products.slice(0, this.visibleCount)
    }
  },

  mounted() {
    if (this.colorFromSearch) {
      this.selectedColors = [this.colorFromSearch]
    }
    
    this.fetchCategoryFilters().then(() => {
      if (this.$route.query.category && this.$route.query.category !== 'All Kanchipuram Silk Saree') {
        const matchedCategory = this.categoriesFilter.find(
          c => c.Category === this.$route.query.category
        )
        this.selectedCategoryFilter = matchedCategory || null
      } else {
        this.selectedCategoryFilter = null
      }
      
      if (this.$route.query.subcategory) {
        this.selectedSubcategoryFilter = this.$route.query.subcategory
      }
    })
    
    this.fetchProducts()
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  watch: {
    '$route.query'(newQuery, oldQuery) {
      if (newQuery.category && newQuery.category !== 'All Kanchipuram Silk Saree') {
        const matchedCategory = this.categoriesFilter.find(
          c => c.Category === newQuery.category
        )
        this.selectedCategoryFilter = matchedCategory || null
      } else {
        this.selectedCategoryFilter = null
      }

      if (newQuery.subcategory) {
        this.selectedSubcategoryFilter = newQuery.subcategory
      } else {
        this.selectedSubcategoryFilter = null
      }

      if (newQuery.category !== oldQuery.category) {
        this.selectedColors = []

        if (newQuery.color) {
          this.selectedColors = [newQuery.color]
        }
        
        this.fetchColors(newQuery.category)
      }

      this.page = 0
      this.visibleCount = 9
      this.animatedIds.clear()
      this.fetchProducts()
    },

    selectedColors() {
      this.page = 0
      this.fetchProducts()
    },

    activeFilter(newVal) {
      if (newVal) {
        this.fetchColors(newVal)
      }
    }
  },

  methods: {
    getImageUrl(path) {
      return resolveMediaUrl(path);
    },
    applyCategoryFilter() {
      this.selectedSubcategoryFilter = null
      this.page = 0
      
      const newCategory = this.selectedCategoryFilter?.Category
      
      if (newCategory) {
        this.$router.push({
          name: 'Collection',
          query: { category: newCategory }
        })
      } else {
        this.$router.push({
          name: 'Collection',
          query: { category: 'All Kanchipuram Silk Saree' }
        })
      }
    },

    applySubcategoryFilter() {
      this.page = 0
      const categoryValue = this.selectedCategoryFilter?.Category || this.activeFilter
      const subcategoryValue = this.selectedSubcategoryFilter
      
      if (subcategoryValue) {
        this.$router.push({
          name: 'Collection',
          query: {
            category: categoryValue,
            subcategory: subcategoryValue
          }
        })
      } else {
        this.$router.push({
          name: 'Collection',
          query: { category: categoryValue }
        })
      }
    },

    async fetchCategoryFilters() {
      const res = await api.get("/catelog")
      this.categoriesFilter = res.data
      return res.data
    },

    fetchColors(category = null) {
      const filterValue = category || this.activeFilter
      if (!filterValue) return

      api.get('upload/getproduct/colors', {
        params: { category: filterValue }
      }).then(res => {
        this.allColors = res.data
      }).catch(err => {
        console.error('Error fetching colors:', err)
        this.allColors = []
      })
    },

    handleScroll() {
      if (!this.useInfiniteScroll) return
      if (this.isLoadingMore) return
      if (!this.$refs.sentinel) return

      const rect = this.$refs.sentinel.getBoundingClientRect()

      if (rect.top < window.innerHeight - 150 && this.visibleCount < this.products.length) {
        this.isLoadingMore = true

        const prev = this.visibleCount
        this.visibleCount += 9

        this.$nextTick(() => {
          this.visibleProducts
            .slice(prev)
            .forEach(p => this.animatedIds.add(p.id))

          setTimeout(() => {
            this.isLoadingMore = false

            if (this.visibleCount >= this.products.length) {
              this.showPagination = true
              this.useInfiniteScroll = false
            }
          }, 800)
        })
      }
    },

    shouldAnimate(id) {
      return this.animatedIds.has(id)
    },

    getDelayStyle(id) {
      const index = [...this.animatedIds].indexOf(id)
      if (index === -1) return {}

      return {
        animationDelay: `${(index % 3) * 0.25}s`
      }
    },

    applyAvailabilityFilter() {
      this.page = 0
      this.fetchProducts()
    },

    applyColorFilter() {
      this.fetchProducts()
    },

    fetchProducts(category = null, subcategory = null) {
      let filterValue = category || this.activeFilter || 'All Kanchipuram Silk Saree'
      let subValue = subcategory ?? this.$route.query.subcategory ?? null

      if (typeof filterValue === "object") {
        filterValue = filterValue.value || filterValue.title
      }

      const params = {
        category: filterValue,
        minPrice: this.priceRange[0],
        maxPrice: this.priceRange[1],
        inStock: this.inStockOnly,
        newArrival: this.newArrivalOnly,
        page: this.page,
        color: this.selectedColors
      }

      if (subValue && subValue !== 'false') {
        params.subcategory = subValue
      }

      api.get("/upload/getproduct/category", { params })
        .then(res => {
          this.products = res.data.content
          this.totalPages = res.data.totalPages
          this.inStockCount = res.data.inStockCount
          this.newArrivalCount = res.data.newArrivalCount
        })
        .catch(err => console.error(err))
    },

    applyPriceFilter() {
      this.page = 0
      this.fetchProducts()
    },

    goToPage(p) {
      this.useInfiniteScroll = false
      this.showPagination = true
      this.page = p

      this.scrollToTop(() => {
        this.fetchProducts()
      })
    },

    nextPage() {
      if (this.page < this.totalPages - 1) {
        this.useInfiniteScroll = false
        this.page++
        this.scrollToTop()
        this.fetchProducts()
      }
    },

    scrollToTop(cb) {
      const top = this.$el.offsetTop || 0

      window.scrollTo({
        top,
        behavior: 'smooth'
      })

      setTimeout(() => {
        cb && cb()
      }, 400)
    },

    showdetails(product) {
      this.$router.push({
        name: 'showproduct',
        params: { id: product.id }
      })
    }
  }
}
</script>

<style scoped>
/* ================= CONTAINER ================= */
.collection-container {
  max-width: 1670px;
  padding: 20px 75px;
  box-sizing: border-box;
}

/* ================= FILTERS ================= */
.filters-col {
  position: relative;
}

.mobile-filter-btn {
  display: none;
  margin-bottom: 20px;
}

.desktop-filters {
  display: block;
}

.sticky-filters {
  position: sticky;
  top: 150px;
  align-self: start;
}

.filter-title {
  letter-spacing: 2px;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px solid #f6f2ec;
}

.availability-box {
  padding-top: 4px;
}

.availability-label {
  font-size: 13px;
  color: #000;
}

.count {
  color: #777;
  font-size: 12px;
}

.price-range-text {
  font-size: 12px;
  color: #000;
  margin-bottom: 4px;
}

.price-range-text span {
  font-size: 11px;
  color: #777;
}

.text-right {
  text-align: right;
}

/* ================= PRODUCTS GRID ================= */
.products-grid {
  margin-top: 10px;
  align-items: stretch;
  row-gap: 28px;
}

.product-col {
  cursor: pointer;
  display: flex;
}

.product-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1.16;
  width: 100%;
}

.product-image-wrapper :deep(.v-img) {
  height: 100%;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #000;
  color: #fff;
  font-size: 11px;
  padding: 4px 8px;
  z-index: 2;
}

.product-info {
  flex: 1;
  padding: 10px 0 0 !important;
}

.product-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.35;
}

.product-price {
  font-size: 13px;
  color: #333;
}

.price-note {
  color: #777;
  font-size: 11px;
  display: block;
  margin-top: 2px;
}

/* ================= ANIMATIONS ================= */
.product-animate {
  opacity: 0;
  animation: fadeSlideUp 0.8s ease forwards;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-sentinel {
  height: 1px;
}

/* ================= PAGINATION ================= */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 80px 0 40px;
}

.page-number {
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
}

.page-number:hover {
  color: #666;
}

.page-number.active {
  color: #000;
  font-weight: 600;
}

.dots {
  font-size: 14px;
  color: #aaa;
}

.next-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #000;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}

.next-btn:hover {
  background: #333;
}

/* ================= BOTTOM DESCRIPTION ================= */
.bottom-description {
  max-width: 900px;
  margin: 90px auto 40px;
  text-align: center;
}

.description-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 16px;
}

.description-text {
  font-size: 12px;
  line-height: 1.6;
  color: #333;
}

/* ================= WEDDING BANNER ================= */
.wedding-banner {
  background-color: #FCF8F5;
  width: 100%;
  margin-top: 30px;
  padding: 30px 0;
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
}

.banner-text {
  font-size: 14px;
}

.banner-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.banner-subtitle {
  color: #666;
}

.shop-btn {
  border-radius: 0;
  font-size: 10px;
  letter-spacing: 1px;
}

/* ================= MOBILE STYLES ================= */
@media (max-width: 1024px) {
  .collection-container {
    max-width: 100%;
    padding: 18px 18px 34px;
  }

  /* Show mobile filter button, hide desktop filters */
  .mobile-filter-btn {
    display: block;
  }

  .desktop-filters {
    display: none;
  }

  .products-grid {
    margin-top: 4px;
    margin-left: -6px;
    margin-right: -6px;
    row-gap: 22px;
  }

  .product-col {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0 6px 24px !important;
  }

  .product-card {
    padding: 8px 8px 13px;
    border: 1px solid rgba(194, 148, 78, 0.18);
    border-radius: 18px;
    background: rgba(255, 250, 244, 0.72);
    box-shadow: 0 14px 30px rgba(72, 23, 12, 0.07);
  }

  .product-image-wrapper {
    aspect-ratio: 1 / 1.12;
    border-radius: 15px;
    box-shadow: 0 12px 26px rgba(36, 8, 7, 0.09);
  }

  .product-info {
    padding: 14px 4px 2px !important;
  }

  .product-title {
    color: #34110e;
    font-size: 14px;
    line-height: 1.35;
  }

  .product-price {
    color: rgba(58, 21, 17, 0.76);
    font-size: 12px;
    line-height: 1.45;
  }

  .price-note {
    font-size: 11px;
    line-height: 1.4;
  }

  .badge {
    border-radius: 999px;
    background: #6f1d18;
    font-size: 10px;
    padding: 5px 9px;
  }

  /* Pagination */
  .pagination-wrapper {
    margin: 40px 0 20px;
    gap: 12px;
  }

  .page-number {
    font-size: 12px;
  }

  .next-btn {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  /* Bottom description */
  .bottom-description {
    margin: 58px auto 34px;
    padding: 0 6px;
    max-width: 100%;
  }

  .description-title {
    color: #3a1511;
    font-size: 16px;
    line-height: 1.35;
    letter-spacing: 0.08em;
  }

  .description-text {
    color: rgba(58, 21, 17, 0.76);
    font-size: 14px;
    line-height: 1.8;
    text-align: left;
  }

  /* Wedding banner */
  .banner-content {
    flex-direction: column;
    gap: 16px;
    padding: 0 16px;
    text-align: center;
  }

  .banner-text {
    font-size: 14px;
    line-height: 1.55;
  }
}

@media (min-width: 560px) and (max-width: 1024px) {
  .product-col {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .product-image-wrapper {
    aspect-ratio: 1 / 1.14;
  }
}

@media (max-width: 480px) {
  .collection-container {
    padding: 14px 12px 30px;
  }

  .mobile-filter-btn {
    min-height: 42px;
  }

  .product-card {
    border-radius: 20px;
  }
}

/* Tablet adjustments */
@media (max-width: 1280px) and (min-width: 961px) {
  .collection-container {
    padding: 20px 30px;
  }

  .banner-content {
    padding: 0 30px;
  }
}
</style>
