<template>
  <div class="wrapper">

    <!-- Ambient background glow -->
    <div class="glow glow-one"></div>
    <div class="glow glow-two"></div>


 <!-- =====================================================
     MINIMAL U PATTERNS
====================================================== -->

<!-- Top-left U pattern -->
<div class="u-pattern u-pattern-top">
  <span></span>
  <span></span>
</div>

<!-- Bottom-right U pattern -->
<div class="u-pattern u-pattern-bottom">
  <span></span>
  <span></span>
</div>

   


    <!-- =====================================================
         MAIN CARD
    ====================================================== -->

    <div class="card">

      <!-- Gold top accent -->
      <div class="top-strip"></div>


      <div class="card-inner">


        <!-- =================================================
             THREAD / WEAVING ICON
        ================================================== -->

        <div class="textile-icon">

          <span class="thread-line"></span>

          <svg
            class="spool-icon"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >

            <!-- spool -->
            <path
              d="M13 8
                 C13 5 27 5 27 8
                 C27 11 24 13 20 13
                 C16 13 13 11 13 8Z"
              class="icon-stroke"
            />

            <path
              d="M13 32
                 C13 35 27 35 27 32
                 C27 29 24 27 20 27
                 C16 27 13 29 13 32Z"
              class="icon-stroke"
            />

            <path
              d="M13 8V32"
              class="icon-stroke"
            />

            <path
              d="M27 8V32"
              class="icon-stroke"
            />

            <!-- thread -->
            <path
              d="M20 13
                 C16 17 25 19 20 23
                 C16 26 19 28 20 27"
              class="icon-stroke"
            />

          </svg>

          <span class="thread-line reverse"></span>

        </div>


        <!-- Coming soon -->
        <span class="tag">
          Coming Soon
        </span>


        <!-- Title -->
        <h1 class="title">
          {{ title }}
        </h1>


        <!-- Elegant divider -->
        <div class="ornamental-rule">

          <span></span>

          <svg
            viewBox="0 0 20 20"
            class="divider-diamond"
          >
            <rect
              x="6"
              y="6"
              width="8"
              height="8"
              transform="rotate(45 10 10)"
            />
          </svg>

          <span></span>

        </div>


        <!-- Message -->
        <p class="message">
          {{ message }}
        </p>


        <!-- =================================================
             FEATURES
        ================================================== -->

        <div
          class="features"
          v-if="type === 'customization'"
        >

          <!-- Choose Color -->
          <span class="feature-pill">

            <svg
              class="feature-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="8.5" />
              <circle cx="9" cy="9" r="1" />
              <circle cx="14.5" cy="8.5" r="1" />
              <circle cx="16" cy="13" r="1" />
              <path
                d="M8 14.5
                   C8 17 10 18.5 12 18.5"
              />
            </svg>

            <span>Choose Color</span>

          </span>


          <!-- Select Fabric -->
          <span class="feature-pill">

            <svg
              class="feature-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M5 7.5L12 4L19 7.5L12 11L5 7.5Z" />
              <path d="M5 12L12 15.5L19 12" />
              <path d="M5 16.5L12 20L19 16.5" />
            </svg>

            <span>Select Fabric</span>

          </span>


          <!-- Custom Design -->
          <span class="feature-pill">

            <svg
              class="feature-icon"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 20
                   L5.5 15.5
                   L16 5
                   L19 8
                   L8.5 18.5
                   L4 20Z"
              />

              <path d="M14 7L17 10" />

              <path
                d="M18.5 4.5
                   L19.5 3.5
                   L21 5
                   L20 6"
              />
            </svg>

            <span>Custom Design</span>

          </span>

        </div>


        <!-- =================================================
             NOTIFY FORM
        ================================================== -->

        <form
          class="notify"
          @submit.prevent
        >

          <input
            type="email"
            placeholder="Email address"
          />

          <button type="submit">

            Notify Me

            <span class="btn-arrow">
              →
            </span>

          </button>

        </form>


        <!-- Back -->
        <button
          class="back-btn"
          @click="$router.back()"
        >

          <span class="back-arrow">
            ←
          </span>

          Back to Sri Shakram

        </button>

      </div>

    </div>

  </div>
</template>


<style scoped src="@/components/stylesheets/comingsoon.css"></style>
<script>
;
export default {

  data() {

    return {};

  },

  computed: {

    type() {

      return this.$route.query.type;

    },

    title() {

      return this.type === "customization"
        ? "Design Your Own Saree"
        : "Tussar Silks Collection";

    },

    message() {

      return this.type === "customization"
        ? "We're weaving together a feature that lets you personalize your saree with your favorite fabric, color, and design."
        : "Our premium Tussar silk collection is being handcrafted and will be available soon.";

    }

  }

};

</script>


