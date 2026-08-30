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
<style scoped src="@/adminfolder/admin styles/showproduct.css"></style>

<style scoped src=""></style>
<script>
import { resolveMediaUrl } from '@/utils/mediaUrl'
import api from "./axios.js";
import { showToast } from '@/utils/toast';
import { demoProducts } from "@/data/demoProducts";


const createEmptyProduct = () => ({
    id: null,
    productId: null,
    title: "",
    img: "",
    images: [],
    category: "",
    subcategory: "",
    price: 0,
    offer_price: 0,
    blouselength: "",
    sareelength: "",
    color: "",
    weight: "",
    instock: false,
    newArrival: false,

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

const SITE_URL = "https://srishakram-frontend-v2.vercel.app";

export default {
    name: "ProductDetails",

    props: {
        id: {
            type: [Number, String],
            required: false,
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

            // Static products available immediately
            products: [...demoProducts],

            backendAvailable: false,

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
            return String(
                this.$route.params.id ||
                this.id ||
                ""
            );
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

            if (newImage) {
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
        /*
         * MEDIA URL
         */
        getImageUrl(path) {
    if (!path) return "";

    if (
        path.startsWith("http") ||
        path.startsWith("/") ||
        path.startsWith("data:")
    ) {
        return path;
    }

    return resolveMediaUrl(path);
},

        async getProducts() {
            this.products = [...demoProducts];

            try {
                const res = await api.get('/upload/recent');

                if (
                    Array.isArray(res.data) &&
                    res.data.length
                ) {
                    this.products = res.data;
                    this.backendAvailable = true;

                    console.log("Backend products loaded");
                }

            } catch (error) {
                console.log(
                    "Backend unavailable. Using static demo products."
                );

                this.products = [...demoProducts];
                this.backendAvailable = false;
            }
        },

        /*
         * CLEAR BLUR
         */
        clearBlurTimer() {
            if (this.blurTimer) {
                clearTimeout(this.blurTimer);
                this.blurTimer = null;
            }

            this.isBlurred = false;
        },

        /*
         * RESET PRODUCT
         */
        resetProductState() {
            this.clearBlurTimer();

            this.selectedImage = null;

            this.quantity = 1;

            this.product = createEmptyProduct();

            this.productError = "";
        },

        /*
         * SELECT THUMBNAIL
         */
        setSelectedImage(img) {
            if (this.loadingProduct) {
                return;
            }

            this.selectedImage = img;
        },

        /*
         * BLUR TIMER
         */
        startBlurTimer() {
            if (this.blurTimer) {
                clearTimeout(this.blurTimer);
            }

            this.isBlurred = false;

            this.blurTimer = setTimeout(() => {
                this.isBlurred = true;
            }, 60000);
        },

        /*
         * PRELOAD IMAGE
         */
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

        /*
         * FIND STATIC PRODUCT
         */
        findDemoProduct(productId) {
            return demoProducts.find(product =>
                String(product.id) === String(productId) ||
                String(product.productId) === String(productId)
            );
        },

        /*
         * NORMALIZE PRODUCT
         */
        normalizeProduct(productData) {
            if (!productData) {
                return createEmptyProduct();
            }

            return {
                ...createEmptyProduct(),
                ...productData,

                id:
                    productData.id ||
                    productData.productId,

                productId:
                    productData.productId ||
                    productData.id,

                images:
                    Array.isArray(productData.images) &&
                    productData.images.length
                        ? productData.images
                        : productData.img
                            ? [productData.img]
                            : []
            };
        },

        /*
         * META TAG
         */
        setMetaTag(selector, attribute, value) {
            let element =
                document.head.querySelector(selector);

            if (!element) {
                element =
                    document.createElement("meta");

                const match =
                    selector.match(
                        /\[(name|property)="([^"]+)"\]/
                    );

                if (match) {
                    element.setAttribute(
                        match[1],
                        match[2]
                    );
                }

                document.head.appendChild(element);
            }

            element.setAttribute(
                attribute,
                value
            );
        },

        /*
         * CANONICAL URL
         */
        setProductCanonical(productId) {
            let canonical =
                document.head.querySelector(
                    'link[rel="canonical"]'
                );

            if (!canonical) {
                canonical =
                    document.createElement("link");

                canonical.setAttribute(
                    "rel",
                    "canonical"
                );

                document.head.appendChild(
                    canonical
                );
            }

            canonical.setAttribute(
                "href",
                `${SITE_URL}/product/${productId}`
            );
        },

        /*
         * PRODUCT SEO
         */
        updateProductSeo(product, productId) {
            const productName =
                product.title ||
                "Silk Saree";

            const title =
                `${productName} | Sri Shakram`;

            const description =
                `${productName} from Sri Shakram Silks. Explore Kanchipuram silk sarees, traditional silk sarees, pure silk sarees, bridal sarees, and zari collections.`;

            const imageUrl =
                this.getImageUrl(product.img) ||
                `${SITE_URL}/logo.png`;

            const productUrl =
                `${SITE_URL}/product/${productId}`;

            document.title = title;

            this.setMetaTag(
                'meta[name="description"]',
                "content",
                description
            );

            this.setMetaTag(
                'meta[name="keywords"]',
                "content",
                `${productName}, Sri Shakram, Sri Shakram Silks, Kanchipuram Silk Sarees, Traditional Silk Sarees`
            );

            this.setMetaTag(
                'meta[property="og:title"]',
                "content",
                title
            );

            this.setMetaTag(
                'meta[property="og:description"]',
                "content",
                description
            );

            this.setMetaTag(
                'meta[property="og:url"]',
                "content",
                productUrl
            );

            this.setMetaTag(
                'meta[property="og:image"]',
                "content",
                imageUrl
            );

            this.setMetaTag(
                'meta[name="twitter:title"]',
                "content",
                title
            );

            this.setMetaTag(
                'meta[name="twitter:description"]',
                "content",
                description
            );

            this.setMetaTag(
                'meta[name="twitter:image"]',
                "content",
                imageUrl
            );

            this.setProductCanonical(productId);

            const existingSchema =
                document.getElementById(
                    "product-json-ld"
                );

            if (existingSchema) {
                existingSchema.remove();
            }

            const schema =
                document.createElement("script");

            schema.id =
                "product-json-ld";

            schema.type =
                "application/ld+json";

            schema.textContent =
                JSON.stringify({
                    "@context":
                        "https://schema.org",

                    "@type":
                        "Product",

                    name:
                        productName,

                    image:
                        imageUrl,

                    description,

                    brand: {
                        "@type":
                            "Brand",

                        name:
                            "Sri Shakram Silks"
                    },

                    category:
                        product.category ||
                        "Kanchipuram Silk Sarees",

                    offers: {
                        "@type":
                            "Offer",

                        priceCurrency:
                            "INR",

                        price:
                            product.price ||
                            undefined,

                        availability:
                            product.instock
                                ? "https://schema.org/InStock"
                                : "https://schema.org/OutOfStock",

                        url:
                            productUrl
                    }
                });

            document.head.appendChild(schema);
        },

        /*
         * SCROLL TOP
         */
        scrollToProductTop(
            behavior = "smooth"
        ) {
            window.scrollTo({
                top: 0,
                behavior
            });
        },

        /*
         * NAVIGATE TO PRODUCT
         */
        goToProduct(productId) {
            const nextId =
                String(productId);

            if (
                !nextId ||
                nextId === this.currentProductId
            ) {
                return;
            }

            this.resetProductState();

            this.loadingProduct = true;

            this.scrollToProductTop();

            this.$router.push(
                `/product/${nextId}`
            );
        },

        /*
         * ADD TO CART
         */
        addToCart() {
            const token =
                localStorage.getItem("token");

            if (!token) {
                showToast(
                    "Please login to continue",
                    "warning"
                );

                this.$router.push(
                    "/login/account"
                );

                return;
            }

            const cartItem = {
                productId:
                    this.product.id ||
                    this.product.productId ||
                    this.currentProductId,

                quantity:
                    this.quantity
            };

            api.post(
                "/cart",
                cartItem,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )
                .then(() => {
                    showToast(
                        "Product added to cart",
                        "success"
                    );
                })

                .catch(err => {
                    console.error(
                        "Cart save failed",
                        err
                    );

                    showToast(
                        "Backend is unavailable. Please try again shortly.",
                        "error"
                    );
                });
        },

        /*
         * BUY NOW
         */
        buyNow() {
            const token =
                localStorage.getItem("token");

            if (!token) {
                showToast(
                    "Please login to continue",
                    "warning"
                );

                this.$router.push(
                    "/login/account"
                );

                return;
            }

            const buyNowItem = {
                productId:
                    this.product.id ||
                    this.product.productId ||
                    this.currentProductId,

                productName:
                    this.product.title,

                price:
                    this.product.price,

                quantity:
                    this.quantity,

                image:
                    this.product.img,

                offer_price:
                    this.product.offer_price || 0
            };

            sessionStorage.setItem(
                "buyNowItem",
                JSON.stringify(
                    buyNowItem
                )
            );

            this.$router.push(
                "/checkout"
            );
        },

        /*
         * SAVE RECENT PRODUCT
         */
        addToRecentlyViewed(productId) {
            let viewed =
                JSON.parse(
                    localStorage.getItem(
                        "recentlyViewed"
                    )
                ) || [];

            viewed =
                viewed.filter(
                    id =>
                        String(id) !==
                        String(productId)
                );

            viewed.unshift(
                productId
            );

            viewed =
                viewed.slice(
                    0,
                    6
                );

            localStorage.setItem(
                "recentlyViewed",
                JSON.stringify(
                    viewed
                )
            );
        },

        /*
         * FETCH RECENT PRODUCTS
         */
        async fetchRecentlyViewed() {
            const viewed =
                JSON.parse(
                    localStorage.getItem(
                        "recentlyViewed"
                    )
                ) || [];

            const filtered =
                viewed.filter(
                    id =>
                        String(id) !==
                        this.currentProductId
                );

            if (!filtered.length) {
                this.recentProducts = [];
                return;
            }

            // Static products first
            this.recentProducts =
                filtered
                    .map(id =>
                        this.findDemoProduct(id)
                    )
                    .filter(Boolean)
                    .map(product =>
                        this.normalizeProduct(product)
                    );

            // Try backend
            try {
                const responses =
                    await Promise.all(
                        filtered.map(
                            id =>
                                api.get(
                                    `/upload/products/${id}`
                                )
                        )
                    );

                const backendProducts =
                    responses
                        .map(
                            response =>
                                response.data
                        )
                        .filter(Boolean)
                        .map(
                            product =>
                                this.normalizeProduct(
                                    product
                                )
                        );

                if (
                    backendProducts.length
                ) {
                    this.recentProducts =
                        backendProducts;
                }

            } catch (error) {
                console.log(
                    "Using static recently viewed products."
                );
            }
        },

        /*
         * LOAD PRODUCT
         */
        async loadProduct(id) {
            const productId =
                String(id || "");

            if (!productId) {
                this.resetProductState();

                this.productError =
                    "Product not found.";

                return;
            }

            if (
                this.loadingProduct &&
                this.loadingProductId ===
                productId
            ) {
                return;
            }

            // Cancel previous request
            this.productRequestController?.abort();

            const requestController =
                new AbortController();

            const requestKey =
                this.productRequestKey + 1;

            this.productRequestController =
                requestController;

            this.productRequestKey =
                requestKey;

            this.loadingProductId =
                productId;

            this.resetProductState();

            /*
             * STEP 1
             * LOAD STATIC PRODUCT
             */
            const demoProduct =
                this.findDemoProduct(
                    productId
                );

            if (demoProduct) {
                const normalizedDemoProduct =
                    this.normalizeProduct(
                        demoProduct
                    );

                this.product =
                    normalizedDemoProduct;

                this.loadingProduct =
                    false;

                this.productError =
                    "";

                this.preloadImage(
                    normalizedDemoProduct.img
                );

                this.addToRecentlyViewed(
                    productId
                );

                this.fetchRecentlyViewed();

                this.updateProductSeo(
                    normalizedDemoProduct,
                    productId
                );

            } else {
                // No static product, show loader
                this.loadingProduct =
                    true;
            }

            /*
             * STEP 2
             * TRY BACKEND
             */
            try {
                const res =
                    await api.get(
                        `/upload/products/${productId}`,
                        {
                            signal:
                                requestController.signal
                        }
                    );

                if (
                    requestKey !==
                    this.productRequestKey
                ) {
                    return;
                }

                const backendProduct =
                    this.normalizeProduct(
                        res.data
                    );

                await this.preloadImage(
                    backendProduct.img
                );

                if (
                    requestKey !==
                    this.productRequestKey
                ) {
                    return;
                }

                // Replace static product
                this.product =
                    backendProduct;

                this.backendAvailable =
                    true;

                this.productError =
                    "";

                this.selectedImage =
                    null;

                this.quantity =
                    1;

                this.startBlurTimer();

                this.addToRecentlyViewed(
                    productId
                );

                this.fetchRecentlyViewed();

                this.updateProductSeo(
                    backendProduct,
                    productId
                );

            } catch (err) {

                // Request cancelled
                if (
                    err.name === "CanceledError" ||
                    err.code === "ERR_CANCELED"
                ) {
                    return;
                }

                console.log(
                    "Backend unavailable. Using static product."
                );

                this.backendAvailable =
                    false;

                // Keep static product
                if (demoProduct) {
                    this.product =
                        this.normalizeProduct(
                            demoProduct
                        );

                    this.productError =
                        "";

                    this.startBlurTimer();

                } else {
                    this.product =
                        createEmptyProduct();

                    this.productError =
                        "Product not available.";
                }

            } finally {

                if (
                    requestKey ===
                    this.productRequestKey
                ) {
                    this.loadingProduct =
                        false;

                    this.loadingProductId =
                        null;

                    this.productRequestController =
                        null;
                }
            }
        }
    },

    mounted() {
        // Static products immediately
        // Backend replaces if available
        this.getProducts();
    }
};
</script>


