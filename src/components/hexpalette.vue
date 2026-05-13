<template>
  <div class="palette-layout">
    <!-- COLOR WHEEL -->
    <div class="wheel-container">
      <div
        v-for="(hex, i) in hexes"
        :key="i"
        class="hex"
        :class="{ active: selectedColors.includes(hex.color) }"
        :style="{
          backgroundColor: hex.color,
          transform: `translate(${hex.x}px, ${hex.y}px)`
        }"
        @click="toggleColor(hex.color)"
      ></div>
          <div style="margin-top: 55%;"><v-btn color="#FCF8F5" elevation="0" @click="saveselectedcolors()">Save</v-btn></div>

    </div>
   
    <!-- RIGHT SIDE PREVIEW -->
    <div v-if="selectedColors.length" class="preview">
      <div
        v-for="(c, i) in selectedColors"
        :key="i"
        class="preview-box"
        :style="{ background: c }"
      ></div>
      
    </div>
  </div>
</template>


<script>
  import api from '@/adminfolder/axios';
export default {
  data() {
    return {
      hexes: [],
      selectedColors: [],
      customerId: localStorage.getItem("customerId")
    };
  },
  mounted() {
    this.generateHexWheel();
  },
  methods: {
  generateHexWheel() {
  const size = 18;
  const radius = 8;
  const hexHeight = size * 2;
  const hexWidth = Math.sqrt(3) * size;

  let result = [];

  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const s = -q - r;
      if (Math.abs(s) <= radius) {
        const x = hexWidth * (q + r / 2);
        const y = hexHeight * (r * 0.75);

        const angle = Math.atan2(y, x);
        const hue = (angle * 180) / Math.PI + 180;

        const dist = Math.min(
          Math.sqrt(x * x + y * y) / (radius * hexWidth),
          1
        );

        const light = 50 + (1 - dist) * 20;

        result.push({
          x,
          y,
          color: `hsl(${hue.toFixed(2)}, 100%, ${light.toFixed(2)}%)`
        });
      }
    }
  }

  this.hexes = result;
},

    toggleColor(color) {
       
      const index = this.selectedColors.indexOf(color);
       console.log(this.selectedColors);
      if (index === -1) {
        this.selectedColors.push(color);
      } else {
        this.selectedColors.splice(index, 1);
      }
    },
    saveselectedcolors()
    {
     
      api.post('/user/custom/colors', {params: {
        colors: this.selectedColors,
        customerid: this.customerId
      }}).then((res)=>{
         alert("saved successfully")
      })
    }
  }
};
</script>

<style>
/* MAIN LAYOUT */
.palette-layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  margin-top: 8%;
}

/* WHEEL */
.wheel-container {
  position: relative;
  width: 520px;
  height: 520px;
  margin-top: 10%;
}

/* HEX */
.hex {
  position: absolute;
  width: 36px;
  height: 36px;
  clip-path: polygon(
    25% 6%,
    75% 6%,
    100% 50%,
    75% 94%,
    25% 94%,
    0% 50%
  );
  cursor: pointer;
  transition: transform 0.15s ease;
}

.hex:hover {
  transform: scale(1.15);
  z-index: 2;
}

.hex.active {
  box-shadow: 0 0 0 4px #000;
  border: 3px solid black;
  z-index: 3;
}

/* PREVIEW ON RIGHT */
.preview {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  gap: 10px;
}

.preview-box {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 2px solid #000;
}

</style>