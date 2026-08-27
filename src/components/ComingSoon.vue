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


<script>

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


<style scoped>

/* =========================================================
   COLOR PALETTE
========================================================= */

.wrapper {

  --maroon: #4a1414;
  --maroon-deep: #2f0d0d;
  --maroon-soft: #6e2323;

  --cream: #fbf6ec;
  --cream-soft: #f3ead9;

  --gold: #c98a2e;
  --gold-light: #e0b168;
  --gold-pale: #f1d9ab;

  --ink-soft: #6b5f56;

}


/* =========================================================
   BACKGROUND
========================================================= */

.wrapper {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  position: relative;

  overflow: hidden;

  padding: 40px 20px;

  background:
    linear-gradient(
      160deg,
      var(--maroon) 0%,
      var(--maroon-deep) 100%
    );

  font-family:
    'Helvetica Neue',
    Arial,
    sans-serif;

}


/* =========================================================
   AMBIENT LIGHT
========================================================= */

.glow {

  position: absolute;

  border-radius: 50%;

  filter: blur(80px);

  pointer-events: none;

}


.glow-one {

  width: 420px;
  height: 420px;

  background: var(--gold);

  opacity: 0.13;

  top: -180px;
  left: -140px;

}


.glow-two {

  width: 360px;
  height: 360px;

  background: var(--gold-light);

  opacity: 0.08;

  bottom: -160px;
  right: -120px;

}





/* =========================================================
   CARD
========================================================= */

.card {

  position: relative;

  z-index: 2;

  max-width: 460px;

  width: 100%;

  background: var(--cream);

  border-radius: 14px;

  overflow: hidden;

  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(201, 138, 46, 0.25);

  animation: fadeUp 0.8s ease;

}


@keyframes fadeUp {

  from {

    opacity: 0;

    transform: translateY(26px);

  }

  to {

    opacity: 1;

    transform: translateY(0);

  }

}

/* =========================================================
   MINIMAL U-SHAPED GOLD PATTERN
========================================================= */

.u-pattern {
  position: absolute;

  width: 330px;
  height: 365px;

  pointer-events: none;

  z-index: 0;

  opacity: 0.32;
}


/* The two thin U lines */

.u-pattern span {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  border-left: 1px solid var(--gold-pale);
  border-right: 1px solid var(--gold-pale);

  border-bottom: 1px solid var(--gold-pale);

  border-radius: 0 0 170px 170px;
}


/* Inner U */

.u-pattern span:nth-child(2) {
  width: calc(100% - 42px);
  height: calc(100% - 42px);

  left: 21px;
  top: 0;

  border-color: rgba(241, 217, 171, 0.75);
}


/* =========================================================
   TOP-LEFT U
========================================================= */

.u-pattern-top {
  top: -105px;
  left: -40px;
}


/* =========================================================
   BOTTOM-RIGHT U
========================================================= */

.u-pattern-bottom {
  bottom: -105px;
  right: -40px;

  transform: rotate(180deg);
}

/* =========================================================
   GOLD TOP STRIP
========================================================= */

.top-strip {

  height: 6px;

  width: 100%;

  background:
    linear-gradient(
      90deg,
      var(--gold),
      var(--gold-light),
      var(--gold)
    );

}


/* =========================================================
   CARD CONTENT
========================================================= */

.card-inner {

  padding: 40px 40px 38px;

  text-align: center;

}


/* =========================================================
   THREAD ICON
========================================================= */

.textile-icon {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  margin-bottom: 14px;

}


.thread-line {

  width: 32px;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--gold)
    );

}


.thread-line.reverse {

  background:
    linear-gradient(
      90deg,
      var(--gold),
      transparent
    );

}


.spool-icon {

  width: 27px;
  height: 27px;

}


.icon-stroke {

  fill: none;

  stroke: var(--gold);

  stroke-width: 1.15;

  stroke-linecap: round;

  stroke-linejoin: round;

}


/* =========================================================
   TAG
========================================================= */

.tag {

  display: inline-block;

  font-size: 10px;

  letter-spacing: 3px;

  text-transform: uppercase;

  color: var(--gold);

  background: var(--cream-soft);

  border: 1px solid var(--gold-pale);

  padding: 7px 18px;

  border-radius: 20px;

  margin-bottom: 21px;

}


/* =========================================================
   TITLE
========================================================= */

.title {

  font-family:
    Georgia,
    'Times New Roman',
    serif;

  font-weight: 500;

  font-size: 28px;

  line-height: 1.3;

  color: var(--maroon);

  margin: 0 0 15px;

}


/* =========================================================
   ORNAMENTAL DIVIDER
========================================================= */

.ornamental-rule {

  width: 125px;

  margin: 0 auto 21px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

}


.ornamental-rule span {

  height: 1px;

  flex: 1;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--gold)
    );

}


.ornamental-rule span:last-child {

  background:
    linear-gradient(
      90deg,
      var(--gold),
      transparent
    );

}


.divider-diamond {

  width: 12px;

  height: 12px;

}


.divider-diamond rect {

  fill: var(--gold);

}


/* =========================================================
   MESSAGE
========================================================= */

.message {

  font-size: 14.5px;

  line-height: 1.7;

  color: var(--ink-soft);

  margin: 0 0 27px;

}


/* =========================================================
   FEATURES
========================================================= */

.features {

  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 9px;

  margin-bottom: 30px;

}


.feature-pill {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  padding: 8px 13px;

  border-radius: 20px;

  border: 1px solid var(--gold-pale);

  background:
    linear-gradient(
      180deg,
      #fff,
      var(--cream-soft)
    );

  color: var(--maroon);

  font-size: 11.5px;

  letter-spacing: 0.2px;

  transition: all 0.25s ease;

}


.feature-icon {

  width: 15px;
  height: 15px;

  stroke: var(--gold);

  stroke-width: 1.35;

  stroke-linecap: round;

  stroke-linejoin: round;

  flex-shrink: 0;

}


.feature-pill:hover {

  transform: translateY(-2px);

  border-color: var(--gold);

  background:
    linear-gradient(
      135deg,
      #fffaf0,
      var(--cream-soft)
    );

  box-shadow:
    0 5px 14px rgba(201, 138, 46, 0.12);

}


/* =========================================================
   NOTIFY
========================================================= */

.notify {

  display: flex;

  gap: 8px;

  margin-bottom: 24px;

}


.notify input {

  flex: 1;

  min-width: 0;

  padding: 13px 18px;

  border-radius: 24px;

  border: 1px solid var(--gold-pale);

  outline: none;

  font-size: 14px;

  background: #fff;

  color: var(--maroon);

}


.notify input::placeholder {

  color: #b8a892;

}


.notify input:focus {

  border-color: var(--gold);

  box-shadow:
    0 0 0 3px
    rgba(201, 138, 46, 0.12);

}


/* =========================================================
   NOTIFY BUTTON
========================================================= */

.notify button {

  display: flex;

  align-items: center;

  gap: 6px;

  padding: 13px 21px;

  border-radius: 24px;

  border: none;

  background:
    linear-gradient(
      135deg,
      var(--gold),
      var(--gold-light)
    );

  color: var(--cream);

  font-size: 13px;

  font-weight: 600;

  letter-spacing: 0.3px;

  cursor: pointer;

  white-space: nowrap;

  transition: all 0.3s ease;

  box-shadow:
    0 6px 16px
    rgba(201, 138, 46, 0.35);

}


.notify button:hover {

  transform: translateY(-2px);

  box-shadow:
    0 10px 22px
    rgba(201, 138, 46, 0.45);

}


.btn-arrow {

  transition: transform 0.3s ease;

}


.notify button:hover .btn-arrow {

  transform: translateX(3px);

}


/* =========================================================
   BACK BUTTON
========================================================= */

.back-btn {

  display: inline-flex;

  align-items: center;

  gap: 5px;

  background: none;

  border: none;

  color: var(--maroon-soft);

  font-size: 13px;

  cursor: pointer;

  transition: color 0.25s ease;

}


.back-arrow {

  transition: transform 0.25s ease;

}


.back-btn:hover {

  color: var(--gold);

}


.back-btn:hover .back-arrow {

  transform: translateX(-3px);

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 480px) {

  .wrapper {

    padding: 25px 15px;

  }


  .card-inner {

    padding: 35px 25px 32px;

  }


  .title {

    font-size: 25px;

  }


  .message {

    font-size: 14px;

  }


  .notify {

    flex-direction: column;

  }


  .notify button {

    justify-content: center;

  }


  .u-pattern {
  width: 230px;
  height: 270px;

  opacity: 0.22;
}

.u-pattern-top {
  top: -80px;
  left: -55px;
}

.u-pattern-bottom {
  bottom: -80px;
  right: -55px;
}

}

</style>