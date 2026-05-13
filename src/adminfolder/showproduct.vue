<template>
    <v-container class="product-details-page" :style="containerStyle">
        <v-row>
            <!-- Left: Images -->
            <v-col cols="12" md="7">
                <!-- Main Image -->
                <div class="main-image-wrapper product-main-image">
  <div
    v-if="loadingProduct"
    class="main-image-skeleton skeleton-block"
    :style="{ height: `${mainImageHeight}px` }"
  ></div>
  <v-img
    v-else
    :src="getImageUrl(selectedImage || product.img)"
    :height="mainImageHeight"
    cover
    :class="{ blurred: isBlurred }"
  />
</div>


                <!-- Thumbnails -->
                <div v-if="loadingProduct" class="thumbnail-wrapper">
                    <div
                        v-for="index in 4"
                        :key="`thumb-skeleton-${index}`"
                        class="thumbnail-skeleton skeleton-block"
                        :style="{ height: `${thumbnailSize}px`, width: `${thumbnailSize}px` }"
                    ></div>
                </div>
                <div v-else class="thumbnail-wrapper">
                    <div 
                        v-for="(img, index) in product.images" 
                        :key="index" 
                        class="thumbnail-container"
                        @click="setSelectedImage(img)"
                    >
                        <v-img 
                            :src="getImageUrl(img)"
                            :height="thumbnailSize" 
                            :width="thumbnailSize"
                            cover 
                            class="thumbnail-img" 
                        />
                    </div>
                </div>
            </v-col>

            <!-- Right: Product Info -->
            <v-col cols="12" md="5" >
                <div class="mb-3 product-info-wrapper">
                    <div v-if="loadingProduct" class="product-loading-info">
                        <div class="skeleton-line skeleton-line-small"></div>
                        <div class="skeleton-line skeleton-title"></div>
                        <div class="skeleton-line skeleton-price"></div>
                    </div>
                    <template v-else>
                    <div class="text-subtitle-1 mb-1 breadcrumb-mobile">
                        <a href="/" style="text-decoration: none; color: black; font-size: 12px;">Home</a>/ <a href="/catelog"
                            style="text-decoration: none; color: black;font-size: 12px;">Collection</a>/ <a
                            style="font-size: 12px;">{{ product.category }}
                            saree</a>
                    </div>
                    <p class="product-title-mobile">
                        {{ product.title }}
                    </p>
                    <p class="product-price-mobile">
                        <span class="me-2">Rs.</span>{{ product.price }} (Exclusive of GST)
                    </p>
                    <div class="text-caption mb-5">
                        Shipping calculated at checkout.
                    </div>
                    </template>
                    <!-- Quantity -->
                    <div class="quantity-wrapper">
                        <div class="quantity-label">QUANTITY</div>

                        <div class="quantity-box">
                            <span class="qty-btn" role="button" @click="quantity > 1 && quantity--">−</span>
                            <span class="qty-value">{{ quantity }}</span>
                            <span class="qty-btn" role="button" @click="quantity++">+</span>
                        </div>

                    </div>

                </div>

                <!-- Buttons -->
                <div class="d-flex flex-column mb-4 buttons-wrapper">
                    <v-btn variant="outlined" color="black" class="mb-4" :disabled="loadingProduct || !product.title" @click="addToCart">
                        Add To Cart
                    </v-btn>
                    <v-btn color="black" dark class="text-uppercase" :disabled="loadingProduct || !product.title" @click="buyNow">
                        Buy It Now
                    </v-btn>
                </div>
                <p v-if="productError" class="product-error">{{ productError }}</p>
                <p class="discount-text">Shop Above Rs:30,000 and get 10% Discount</p>
                <!-- Features -->
                <div>
                    <p class="features-title">
                        Features</p>
                    <div class="mb-7 features-list">
                        <p>Blouse Length: <span style=" margin-left: 5px;"> {{ product.blouselength }}</span></p>
                        <p>Saree Length: <span style=" margin-left: 5px;"> {{ product.sareelength }}</span></p>
                        <p>Color: <span style=" margin-left: 5px;"> {{ product.color }}</span></p>
                        <p>Weight: <span style=" margin-left: 5px;"> {{ product.weight }}</span></p>
                    </div>

                </div>

                <v-expansion-panels elevation="0" density="compact" class="expansion-panels-wrapper">
                    <v-expansion-panel>
                        <v-expansion-panel-title style="font-size: 14px;">Description</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            {{ product.description }}
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title style="font-size: 14px;">Shipping Information</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <div>
                                <p style="font-weight: bold; margin-bottom: 5px;">Shipping Policy</p>
                                <p style="font-weight: bold;margin-bottom: 5px;">Free Domestic Shipping:</p>
                                <p>We offer free shipping for all orders > Rs.2500 in value . <br />
                                    For orders less than Rs.2500 a Fee of Rs.250 is applicable </p>
                                <p style="font-weight: bold;margin-bottom: 5px; margin-top: 9px;">Processing Time:</p>
                                <p>1. Orders will be processed within 1-2 business days after payment confirmation.
                                    <br />
                                    2. Customized or made-to-order items may necessitate additional processing time.
                                    Please refer to the product description for specific details.
                                </p>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title style="font-size: 14px;">Return Policy</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <p style="font-size: 10px;">Order Cancellation<br />
                                1.1 Cancellation Window: If you wish to cancel
                                your order, please contact us as soon as possible. We understand that
                                circumstances may change, and we will make every effort to accommodate
                                your request. However, please note that we have a limited cancellation
                                window, and once your order has been processed for shipment, we are
                                unable to cancel it.
                                <br />
                                1.2 Canceled Orders before Shipment: If your
                                order is canceled before it has been shipped, we will provide a full
                                refund to the original payment method used for the purchase.
                                <br />
                                Returns and Exchanges <br />
                                2.1
                                Return Eligibility: We want you to be satisfied with your purchase. If
                                you receive a defective or incorrect item, or if you are unsatisfied
                                with your purchase for any other valid reason, you may be eligible to
                                return the item(s).
                                <br />
                                2.2 Return Timeframe: To initiate a return,
                                please contact us within 7 days of receiving your order. Returns
                                requested after this timeframe may not be accepted.
                                <br />
                                2.3 Return
                                Condition: The item(s) must be unused, unwashed, and in the same
                                condition as when you received them, with all original tags and
                                packaging intact.
                                <br />
                                2.4 Return Process: To request a return, please
                                contact our customer support team at
                                +91-9600335577/sales@Srishakram.com. We may require you to provide
                                details and supporting documentation, such as photographs, to validate
                                your claim.
                                <br />
                                2.5 Return Shipping: You will be responsible for the
                                return shipping costs, unless the return is due to our error or a
                                defective item. We recommend using a trackable shipping method to ensure
                                the safe return of the item(s). We are not responsible for any lost or
                                damaged returns during transit.
                                <br />
                                2.6 Refund or Exchange: Upon
                                receiving and inspecting the returned item(s), we will process your
                                refund to the original payment method used for the purchase.
                                Alternatively, if you prefer an exchange, we will arrange for the
                                replacement item(s) to be shipped to you.
                                <br />
                                Refund Processing<br />
                                3.1 Refund Eligibility: Refunds will be issued for eligible returns in accordance with
                                our return policy.
                                <br />
                                3.2
                                Refund Amount: The refund will include the purchase price of the
                                returned item(s) minus any applicable discounts, shipping charges, or
                                restocking fees. Please note that any taxes or duties paid at the time
                                of purchase are non-refundable.
                                <br />
                                3.3 Refund Timeframe: We will
                                process the refund as quickly as possible, typically within 3 to 5.
                                However, the actual time it takes for the refund to appear in your
                                account may vary depending on your financial institution.
                                <br />
                                Non-Refundable Items
                                The following items are generally non-refundable:
                                <br />
                                Gift cards or e-gift cards
                                Personalized or custom-made items
                                Final sale or clearance items
                                Please refer to the product descriptions or contact our customer support team for any
                                specific non-refundable items.
                                <br />
                                Contact Us<br />
                                If
                                you have any questions, concerns, or requests regarding our
                                cancellation and refund policy, please contact us at
                                +91-9600335577/sales@Srishakram.com. Our customer support team will be
                                happy to assist you.
                                <br />
                                Please note that this cancellation and
                                refund policy applies only to purchases made directly through our online
                                boutique. If you made a purchase through a third-party platform or
                                retailer, their specific policies may apply.
                                <br />
                                By placing an order with us, you acknowledge that you have read, understood, and agreed
                                to this cancellation and refund policy.
                            </p>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <!-- Trust / Info Icons -->
                <div class="info-icons mt-6">
                    <div class="info-item">
                        <v-icon size="18">mdi-heart-outline</v-icon>
                        <span>Made in India</span>
                    </div>

                    <div class="info-item">
                        <v-icon size="18">mdi-hand-heart-outline</v-icon>
                        <span>Handwoven by Artisans</span>
                    </div>

                    <div class="info-item">
                        <v-icon size="18">mdi-earth</v-icon>
                        <span>Shipping Worldwide</span>
                    </div>

                    <div class="info-item">
                        <v-icon size="18">mdi-package-variant</v-icon>
                        <span>* Woven, Packed and Marketed by Thriya Silks</span>
                    </div>
                </div>

            </v-col>
        </v-row>

    </v-container>
    

        <!-- You May also Like -->
        <div class="recommendation-container">
            <p class="recommendation-title">
                You may also Like
            </p>

            <div class="recommendation-grid">
                <div v-for="product in products.slice(0, 5)" :key="product.id" class="recommendation-card" @click="goToProduct(product.id)">
                    <img :src="getImageUrl(product.img)" class="recommendation-img" />
                    <p class="recommendation-product-title">{{ product.title }}</p>
                    <p class="recommendation-product-price">Rs {{ product.price }}</p>
                </div>
            </div>
        </div>

        <!-- Banner -->
        <div class="banner-container">
            <img src="/src/assets/banner.webp" alt="" class="banner-img">
        </div>


        <!-- Recent -->
        <div class="recommendation-container" v-if="recentProducts.length >= 5">
            <p class="recommendation-title">
                Recent Viewed
            </p>

            <div class="recommendation-grid">
                <div
                    v-for="item in recentProducts"
                    :key="item.id"
                    class="recommendation-card"
                    @click="goToProduct(item.id)"
                >
                    <v-img
                        :src="item.img"
                        height="250"
                        cover
                        style="cursor:pointer"
                    />
                    <p class="recommendation-product-title">{{ item.title }}</p>
                    <p class="recommendation-product-price">Rs {{ item.price }}</p>
                </div>
            </div>
        </div>
</template>

<script>
import { resolveMediaUrl } from '@/utils/mediaUrl'
import api from "./axios.js";

const createEmptyProduct = () => ({
    title: "",
    img: "",
    images: [],
    category: "",
    price: 0,
    blouselength: "",
    sareelength: "",
    color: "",
    weight: "",
    features: {
        length: 0,
        blouselength: 0,
        color: "",
        weight: 0,
        sareelength: 0,
    },
    description: "",
    shippingInfo: "",
    returnPolicy: "",
});

export default {
    name: "ProductDetails",
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            product: createEmptyProduct(),
            loadingProduct: false,
            productError: "",
            selectedImage: null,
            quantity: 1,
            recentProducts: [],
            products: [],
            isBlurred: false,
            blurTimer: null,
            loadingProductId: null,
            productRequestController: null,
            productRequestKey: 0

        };
    },
    computed: {
        containerStyle() {
            return this.$vuetify.display.mobile 
                ? 'width: 100%; padding: 16px;' 
                : 'width: 90%; margin-left: 4%;';
        },
        mainImageHeight() {
            return this.$vuetify.display.mobile ? 400 : 600;
        },
        thumbnailSize() {
            return this.$vuetify.display.mobile ? 80 : 100;
        },
        currentProductId() {
            return String(this.$route.params.id || this.id || "");
        }
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler(newId) {
                this.loadProduct(newId);
            }
        },
        selectedImage(newImage) {
            if (this.loadingProduct) {
                return;
            }

            if (!this.loadingProduct && newImage) {
                this.preloadImage(newImage);
            }
            this.startBlurTimer();
        }
    },
    beforeUnmount() {
        this.clearBlurTimer();
        this.productRequestController?.abort();
},
    methods: {
            getImageUrl(path) {
      return resolveMediaUrl(path);
    },
        getProducts() {
            api.get('/upload/recent')
                .then((res) => {
                    this.products = res.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        clearBlurTimer() {
            if (this.blurTimer) {
                clearTimeout(this.blurTimer);
                this.blurTimer = null;
            }
            this.isBlurred = false;
        },
        resetProductState() {
            this.clearBlurTimer();
            this.selectedImage = null;
            this.quantity = 1;
            this.product = createEmptyProduct();
            this.productError = "";
        },
        setSelectedImage(img) {
            if (this.loadingProduct) return;
            this.selectedImage = img;
        },
        startBlurTimer() {
  // Clear old timer
  if (this.blurTimer) {
    clearTimeout(this.blurTimer);
  }

  this.isBlurred = false;

  this.blurTimer = setTimeout(() => {
    this.isBlurred = true;
  }, 60000); 
},
        preloadImage(path) {
            const imageUrl = this.getImageUrl(path);

            if (!imageUrl) {
                return Promise.resolve();
            }

            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = imageUrl;
            });
        },
        scrollToProductTop(behavior = "smooth") {
            window.scrollTo({ top: 0, behavior });
        },
        goToProduct(productId) {
            const nextId = String(productId);

            if (!nextId || nextId === this.currentProductId) {
                return;
            }

            this.resetProductState();
            this.loadingProduct = true;
            this.scrollToProductTop();
            this.$router.push(`/product/${nextId}`);
        },

        addToCart() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$router.push("/login/account");
                return;
            }

            const cartItem = {
                productId: this.currentProductId,
                quantity: this.quantity
            };

            api.post("/cart", cartItem, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                alert("Item added to cart");
            })
            .catch(err => {
                console.error("Cart save failed", err);
            });
        },
        buyNow() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$router.push("/login/account");
                return;
            }
            const buyNowItem = {
                productId: this.currentProductId,
                productName: this.product.title,
                price: this.product.price,
                quantity: this.quantity,
                image: this.product.img,
                offer_price: this.product.offer_price || 0
            };

            sessionStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
            this.$router.push("/checkout");
        },

        searchproduct(item) {
            console.log(item);
            this.$router.push({
                name: "Collection",
                params: { category: item },
            });
        },

        // 🔹 SAVE PRODUCT ID
        addToRecentlyViewed(productId) {
            let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

            // Remove duplicate
            viewed = viewed.filter(id => String(id) !== String(productId));

            // Add to front
            viewed.unshift(productId);

            // Keep only last 5
            viewed = viewed.slice(0, 6);

            localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
        },

        // 🔹 FETCH PRODUCTS
        fetchRecentlyViewed() {
            const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

            // Remove current product
            const filtered = viewed.filter(id => String(id) !== this.currentProductId);

            if (!filtered.length) {
                this.recentProducts = [];
                return;
            }

            Promise.all(
                filtered.map(id => api.get(`/upload/products/${id}`))
            ).then(responses => {
                this.recentProducts = responses.map(r => r.data);
            }).catch((err) => {
                console.error("Recent products load failed:", err);
            });
        },
        async loadProduct(id) {
            const productId = String(id || "");

            if (!productId) {
                this.resetProductState();
                this.productError = "Product not found.";
                return;
            }

            if (this.loadingProduct && this.loadingProductId === productId) {
                return;
            }

            this.productRequestController?.abort();
            const requestController = new AbortController();
            const requestKey = this.productRequestKey + 1;
            this.productRequestController = requestController;
            this.productRequestKey = requestKey;
            this.loadingProductId = productId;
            this.loadingProduct = true;
            this.resetProductState();

            try {
                const res = await api.get(`/upload/products/${productId}`, {
                    signal: requestController.signal,
                });

                if (requestKey !== this.productRequestKey) {
                    return;
                }

                const nextProduct = {
                    ...createEmptyProduct(),
                    ...res.data,
                    images: Array.isArray(res.data?.images) ? res.data.images : [],
                };

                await this.preloadImage(nextProduct.img);

                if (requestKey !== this.productRequestKey) {
                    return;
                }

                this.product = nextProduct;
                this.selectedImage = null;
                this.quantity = 1;
                this.startBlurTimer();

                // Save to recently viewed
                this.addToRecentlyViewed(productId);
                this.fetchRecentlyViewed();
            } catch (err) {
                if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
                    return;
                }

                console.error("Error fetching product:", err);
                this.productError = "Unable to load this product. Please try again.";
                this.product = createEmptyProduct();
            } finally {
                if (requestKey === this.productRequestKey) {
                    this.loadingProduct = false;
                    this.loadingProductId = null;
                    this.productRequestController = null;
                }
            }
        }
    },
    mounted() {
        this.getProducts();
    },

};
</script>

<style>
.product-details-page {
  position: relative;
  box-sizing: border-box;
}

.main-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  max-width: 100%;
}

.blurred {
  filter: blur(8px);
  transition: filter 0.5s ease;
}

.skeleton-block,
.skeleton-line {
    background: linear-gradient(90deg, #f1eeee 25%, #faf8f6 40%, #f1eeee 65%);
    background-size: 220% 100%;
    animation: product-skeleton-loading 1.2s ease-in-out infinite;
}

.main-image-skeleton {
    width: 100%;
    border-radius: inherit;
}

.thumbnail-skeleton {
    flex-shrink: 0;
    border-radius: 4px;
}

.product-loading-info {
    padding-top: 2px;
}

.skeleton-line {
    border-radius: 999px;
    height: 14px;
    margin-bottom: 14px;
}

.skeleton-line-small {
    width: 48%;
    height: 12px;
}

.skeleton-title {
    width: 86%;
    height: 42px;
    border-radius: 6px;
}

.skeleton-price {
    width: 54%;
    height: 18px;
}

.product-error {
    color: #8a1f12;
    font-size: 13px;
    margin: 8px 0 0;
}

@keyframes product-skeleton-loading {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}

.quantity-label {
    font-size: 12px;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.quantity-box {
    display: flex !important;
    align-items: center !important;
    border: 1px solid #d1d1d1;
    width: 95px;
}

.qty-btn {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    user-select: none;
}

.qty-value {
    width: 39px;
    text-align: center;
    font-size: 14px;
    padding-left: 10px;
}

.thumbnail-wrapper {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: auto;
    max-width: 100%;
}

.thumbnail-container {
    flex-shrink: 0;
    cursor: pointer;
}

.thumbnail-img {
    border: 2px solid transparent;
    transition: border-color 0.2s;
    border-radius: 4px;
}

.thumbnail-container:hover .thumbnail-img {
    border-color: #000;
}

.info-icons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 17px;
    margin-top: 24px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #000;
}

.info-item .v-icon {
    color: #000;
}

/* Recommendations Section */
.recommendation-container {
    margin-top: 100px;
    font-weight: 500;
    margin-bottom: 100px;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}

.recommendation-title {
    margin-bottom: 40px;
    text-align: center;
    font-size: 24px;
}

.recommendation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    font-size: 12px;
    gap: 18px;
}

.recommendation-card {
    width: 100%;
    min-width: 0;
}

.recommendation-img {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: auto;
    object-fit: cover;
}

.recommendation-product-title {
    margin-top: 8px;
    font-size: 13px;
}

.recommendation-product-price {
    font-size: 14px;
    font-weight: 500;
}

/* Banner */
.banner-container {
    margin-bottom: 100px;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}

.banner-img {
    width: 100%;
    display: block;
}

/* Desktop specific styles */
.product-info-wrapper {
    width: 145%;
}

.buttons-wrapper {
    width: 145%;
}

.expansion-panels-wrapper {
    border: 1px solid lightgray;
}

.product-title-mobile {
    font-size: xx-large;
    font-weight: 500;
}

.product-price-mobile {
    margin-top: 7px;
    font-size: 15px;
}

.discount-text {
    font-size: 14px;
    margin-top: 7px;
}

.features-title {
    font-size: 17px;
    margin-top: 27px;
    font-weight: 500;
}

.features-list {
    font-size: 17px;
    margin-top: 12px;
}

/* Mobile Responsive Styles */
@media (max-width: 959px) {
    :deep(.v-container) {
        max-width: 100% !important;
    }

    .product-details-page {
        overflow-x: hidden;
    }

    .main-image-wrapper {
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 18px 38px rgba(72, 23, 12, 0.1);
    }

    .thumbnail-wrapper {
        gap: 12px;
        margin: 14px 0 24px;
    }

    .thumbnail-img {
        border-radius: 12px;
        box-shadow: 0 10px 22px rgba(72, 23, 12, 0.08);
    }

    /* Fix the width overflow issue */
    .product-info-wrapper {
        width: 100% !important;
        padding: 6px 2px 0;
    }

    .buttons-wrapper {
        width: 100% !important;
        gap: 2px;
    }

    .thumbnail-wrapper {
        padding-bottom: 10px;
    }

    .thumbnail-container {
        flex-shrink: 0;
    }

    .product-title-mobile {
        color: #34110e;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 27px;
        line-height: 1.18;
    }

    .product-price-mobile {
        color: #3a1511;
        font-size: 16px;
        line-height: 1.4;
    }

    .quantity-label {
        font-size: 12px;
    }

    .quantity-box {
        width: 118px;
        height: 40px;
        border-color: rgba(194, 148, 78, 0.38);
        border-radius: 999px;
        overflow: hidden;
    }

    .qty-btn,
    .qty-value {
        min-width: 38px;
        height: 40px;
        padding-left: 0;
    }

    .discount-text {
        color: rgba(58, 21, 17, 0.76);
        font-size: 14px;
        line-height: 1.5;
    }

    .features-title {
        font-size: 19px;
    }

    .features-list {
        font-size: 15px;
        line-height: 1.65;
    }

    .buttons-wrapper :deep(.v-btn) {
        min-height: 46px;
        border-radius: 999px;
        letter-spacing: 0.13em;
    }

    .expansion-panels-wrapper {
        border-color: rgba(194, 148, 78, 0.28);
        border-radius: 18px;
        overflow: hidden;
    }

    .info-icons {
        font-size: 12px;
    }

    .info-item span {
        font-size: 12px;
    }

    /* Recommendations Mobile */
    .recommendation-container {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        padding: 0 16px;
        margin-top: 60px;
        margin-bottom: 60px;
    }

    .recommendation-title {
        font-size: 20px;
        margin-bottom: 24px;
    }

    .recommendation-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }

    .recommendation-card {
        width: 100%;
        max-width: none;
    }

    .recommendation-img {
        width: 100%;
        height: auto;
        aspect-ratio: 4/5;
    }

    .recommendation-product-title {
        font-size: 11px;
    }

    .recommendation-product-price {
        font-size: 12px;
    }

    /* Banner Mobile */
    .banner-container {
        margin-bottom: 60px;
        padding: 0 16px;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
    }

    .banner-img {
        width: 100%;
        margin-left: 0;
    }

    .breadcrumb-mobile {
        font-size: 11px !important;
    }

    .breadcrumb-mobile a {
        font-size: 11px !important;
    }
}

/* Tablet adjustments */
@media (min-width: 600px) and (max-width: 959px) {
    .product-details-page {
        padding-top: 105px !important;
    }

    .product-main-image {
        margin-top: 12px !important;
    }

    .recommendation-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
    }

    .recommendation-card {
        width: 100%;
        max-width: none;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .product-info-wrapper,
    .buttons-wrapper {
        width: 100%;
    }

    .recommendation-container {
        width: calc(100% - 48px);
        margin-left: auto;
        margin-right: auto;
        margin-top: 72px;
        margin-bottom: 72px;
    }

    .recommendation-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
    }

    .banner-container {
        width: calc(100% - 48px);
        margin-left: auto;
        margin-right: auto;
    }
}

/* Extra small mobile devices */
@media (max-width: 599px) {
    .product-details-page {
        padding-top: 88px !important;
    }

    .product-main-image {
        margin-top: 8px !important;
    }

    .recommendation-grid {
        grid-template-columns: 1fr;
    }

    .quantity-wrapper {
        margin-bottom: 16px;
    }
    
    .info-icons {
        margin-top: 16px;
    }
}
</style>

<style scoped>
:deep(.v-expansion-panel-title) {
    min-height: 36px !important;
    padding: 6px 16px !important;
}

:deep(.v-expansion-panel-title__content) {
    padding: 0 !important;
}

:deep(.v-expansion-panel-title span) {
    line-height: 1.2;
}
</style>
