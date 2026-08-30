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
            <v-card flat class="collectionproduct-card">
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
<style scoped src="@/components/stylesheets/collections.css"></style>

<script>
import api from '@/adminfolder/axios'
import { resolveMediaUrl } from '@/utils/mediaUrl'
import { demoProducts } from '@/data/demoProducts'

export default {
  data() {
    return {
      products: [...demoProducts],
      allDemoProducts: [...demoProducts],
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
      backendAvailable: false
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

    this.createStaticCategories()
    this.fetchStaticColors()
    this.fetchProducts()
    this.fetchCategoryFilters()
    this.fetchBackendProducts()

    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  watch: {
    '$route.query'(newQuery, oldQuery) {
      if (
        newQuery.category &&
        newQuery.category !== 'All Kanchipuram Silk Saree'
      ) {
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
      this.fetchBackendProducts()
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
  if (!path) return ''

  if (
    path.startsWith('http') ||
    path.startsWith('data:image') ||
    path.startsWith('/')
  ) {
    return path
  }

  return resolveMediaUrl(path)
},

    normalizeProduct(product) {
      if (!product) return null

      return {
        ...product,
        id: product.id || product.productId,
        productId: product.productId || product.id,
        images:
          Array.isArray(product.images) && product.images.length
            ? product.images
            : product.img
              ? [product.img]
              : [],
        price: Number(product.price || 0),
        offer_price: Number(product.offer_price || 0),
        instock: Boolean(product.instock),
        newArrival: Boolean(product.newArrival)
      }
    },

    createStaticCategories() {
      const categoryMap = {}

      demoProducts.forEach(product => {
        if (!product.category) return

        if (!categoryMap[product.category]) {
          categoryMap[product.category] = {
            id: product.category,
            Category: product.category,
            Subcategory: []
          }
        }

        if (
          product.subcategory &&
          !categoryMap[product.category].Subcategory.includes(
            product.subcategory
          )
        ) {
          categoryMap[product.category].Subcategory.push(
            product.subcategory
          )
        }
      })

      this.categoriesFilter = Object.values(categoryMap)

      if (
        this.$route.query.category &&
        this.$route.query.category !== 'All Kanchipuram Silk Saree'
      ) {
        const matchedCategory = this.categoriesFilter.find(
          c => c.Category === this.$route.query.category
        )

        this.selectedCategoryFilter = matchedCategory || null
      }

      if (this.$route.query.subcategory) {
        this.selectedSubcategoryFilter =
          this.$route.query.subcategory
      }
    },

    fetchStaticColors() {
      const colors = new Set()

      demoProducts.forEach(product => {
        if (product.color) {
          colors.add(product.color)
        }
      })

      this.allColors = [...colors]
    },

    applyCategoryFilter() {
      this.selectedSubcategoryFilter = null
      this.page = 0
      this.visibleCount = 9

      const newCategory =
        this.selectedCategoryFilter?.Category

      if (newCategory) {
        this.$router.push({
          name: 'Collection',
          query: {
            category: newCategory
          }
        })
      } else {
        this.$router.push({
          name: 'Collection',
          query: {
            category: 'All Kanchipuram Silk Saree'
          }
        })
      }
    },

    applySubcategoryFilter() {
      this.page = 0
      this.visibleCount = 9

      const categoryValue =
        this.selectedCategoryFilter?.Category ||
        this.$route.query.category

      const subcategoryValue =
        this.selectedSubcategoryFilter

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
          query: {
            category: categoryValue
          }
        })
      }
    },

    async fetchCategoryFilters() {
      try {
        const res = await api.get('/catelog')

        if (
          Array.isArray(res.data) &&
          res.data.length
        ) {
          this.categoriesFilter = res.data
          this.backendAvailable = true
        }

        return res.data
      } catch (error) {
        console.log(
          'Backend unavailable. Using static categories.'
        )

        return this.categoriesFilter
      }
    },

    fetchColors(category = null) {
      const filterValue =
        category ||
        this.$route.query.category

      const colors = new Set()

      demoProducts.forEach(product => {
        const categoryMatches =
          !filterValue ||
          filterValue === 'All Kanchipuram Silk Saree' ||
          product.category === filterValue

        if (categoryMatches && product.color) {
          colors.add(product.color)
        }
      })

      this.allColors = [...colors]

      if (
        !filterValue ||
        filterValue === 'All Kanchipuram Silk Saree'
      ) {
        return
      }

      api.get('/upload/getproduct/colors', {
        params: {
          category: filterValue
        }
      })
        .then(res => {
          if (
            Array.isArray(res.data) &&
            res.data.length
          ) {
            this.allColors = res.data
            this.backendAvailable = true
          }
        })
        .catch(() => {
          console.log('Using static colors.')
        })
    },

    handleScroll() {
      if (!this.useInfiniteScroll) return
      if (this.isLoadingMore) return
      if (!this.$refs.sentinel) return

      const rect =
        this.$refs.sentinel.getBoundingClientRect()

      if (
        rect.top < window.innerHeight - 150 &&
        this.visibleCount < this.products.length
      ) {
        this.isLoadingMore = true

        const previousCount =
          this.visibleCount

        this.visibleCount += 9

        this.$nextTick(() => {
          this.visibleProducts
            .slice(previousCount)
            .forEach(product => {
              this.animatedIds.add(product.id)
            })

          setTimeout(() => {
            this.isLoadingMore = false

            if (
              this.visibleCount >=
              this.products.length
            ) {
              this.showPagination = false
            }
          }, 500)
        })
      }
    },

    shouldAnimate(id) {
      return this.animatedIds.has(id)
    },

    getDelayStyle(id) {
      const index =
        [...this.animatedIds].indexOf(id)

      if (index === -1) return {}

      return {
        animationDelay:
          `${(index % 3) * 0.25}s`
      }
    },

    applyAvailabilityFilter() {
      this.page = 0
      this.visibleCount = 9
      this.fetchProducts()
      this.fetchBackendProducts()
    },

    applyColorFilter() {
      this.page = 0
      this.visibleCount = 9
      this.fetchProducts()
      this.fetchBackendProducts()
    },

    fetchProducts() {
      let filteredProducts = [...demoProducts]

      const category =
        this.$route.query.category

      const subcategory =
        this.$route.query.subcategory

      if (
        category &&
        category !== 'All Kanchipuram Silk Saree'
      ) {
        filteredProducts =
          filteredProducts.filter(
            product =>
              product.category === category
          )
      }

      if (subcategory) {
        filteredProducts =
          filteredProducts.filter(
            product =>
              product.subcategory ===
              subcategory
          )
      }

      filteredProducts =
        filteredProducts.filter(product => {
          const price =
            Number(product.price || 0)

          return (
            price >= this.priceRange[0] &&
            price <= this.priceRange[1]
          )
        })

      if (this.inStockOnly) {
        filteredProducts =
          filteredProducts.filter(
            product =>
              product.instock === true
          )
      }

      if (this.newArrivalOnly) {
        filteredProducts =
          filteredProducts.filter(
            product =>
              product.newArrival === true
          )
      }

      if (this.selectedColors.length) {
        filteredProducts =
          filteredProducts.filter(
            product =>
              this.selectedColors.includes(
                product.color
              )
          )
      }

      if (
        this.$route.query.color &&
        !this.selectedColors.length
      ) {
        filteredProducts =
          filteredProducts.filter(
            product =>
              product.color ===
              this.$route.query.color
          )
      }

      this.products =
        filteredProducts.map(product =>
          this.normalizeProduct(product)
        )

      this.inStockCount =
        filteredProducts.filter(
          product => product.instock
        ).length

      this.newArrivalCount =
        filteredProducts.filter(
          product => product.newArrival
        ).length

      this.totalPages =
        Math.ceil(
          filteredProducts.length / 9
        )

      this.visibleCount =
        Math.min(
          9,
          this.products.length
        )

      this.backendAvailable = false
    },

    async fetchBackendProducts() {
      const filterValue =
        this.$route.query.category ||
        'All Kanchipuram Silk Saree'

      const subValue =
        this.$route.query.subcategory ||
        null

      const params = {
        category: filterValue,
        minPrice: this.priceRange[0],
        maxPrice: this.priceRange[1],
        inStock: this.inStockOnly,
        newArrival: this.newArrivalOnly,
        page: this.page,
        color: this.selectedColors
      }

      if (
        subValue &&
        subValue !== 'false'
      ) {
        params.subcategory = subValue
      }

      try {
        const res = await api.get(
          '/upload/getproduct/category',
          { params }
        )

        if (
          res.data &&
          Array.isArray(
            res.data.content
          )
        ) {
          this.products =
            res.data.content.map(
              product =>
                this.normalizeProduct(
                  product
                )
            )

          this.totalPages =
            res.data.totalPages || 0

          this.inStockCount =
            res.data.inStockCount || 0

          this.newArrivalCount =
            res.data.newArrivalCount || 0

          this.backendAvailable = true

          this.visibleCount =
            Math.min(
              9,
              this.products.length
            )
        }
      } catch (error) {
        console.log(
          'Backend sleeping. Static products are being used.'
        )

        this.backendAvailable = false
      }
    },

    applyPriceFilter() {
      this.page = 0
      this.visibleCount = 9
      this.fetchProducts()
      this.fetchBackendProducts()
    },

    goToPage(p) {
      this.useInfiniteScroll = false
      this.showPagination = true
      this.page = p

      this.scrollToTop(() => {
        this.fetchProducts()
        this.fetchBackendProducts()
      })
    },

    nextPage() {
      if (
        this.page <
        this.totalPages - 1
      ) {
        this.useInfiniteScroll = false
        this.page++
        this.scrollToTop()
        this.fetchProducts()
        this.fetchBackendProducts()
      }
    },

    scrollToTop(cb) {
      const top =
        this.$el.offsetTop || 0

      window.scrollTo({
        top,
        behavior: 'smooth'
      })

      setTimeout(() => {
        if (cb) cb()
      }, 400)
    },

    showdetails(product) {
      const productId =
        product.id ||
        product.productId

      this.$router.push({
        name: 'showproduct',
        params: {
          id: productId
        }
      })
    }
  }
}
</script>

