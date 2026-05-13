<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-card class="palette-card">
              <v-card-title class="text-center py-6">
                <h2 class="palette-title">Saree Color Customization</h2>
              </v-card-title>

              <v-card-text>
                <!-- Paint Palette Icon and Main Colors -->
                <div class="palette-section">
                  <div class="palette-icon">
  <img :src="palette" alt="Palette" class="palette-img" />
</div>


                  <!-- Main Color Selection Title -->
                  <h3 class="section-title">Select Main Color</h3>
                  
                  <!-- Main Color Buttons -->
                  <div class="main-colors">
                    <div
                      v-for="(color, index) in mainColors"
                      :key="index"
                      class="color-btn-wrapper"
                    >
                      <button
                        class="color-btn"
                        :class="{ active: selectedColor === color.name }"
                        :style="{ backgroundColor: color.color }"
                        @click="selectColor(color.name)"
                      ></button>
                      <span class="color-label">{{ capitalize(color.name) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Color Shades Section -->
                <div v-if="selectedColor" class="shades-section">
                  <h3 class="section-title">Choose Your Shade</h3>
                  <p class="section-subtitle">Click on any shade to select</p>
                  
                  <div class="shades-bar">
                    <div
                      v-for="(shade, index) in currentShades"
                      :key="index"
                      class="shade"
                      :style="{ backgroundColor: shade }"
                      @click="selectShade(shade)"
                      :class="{ 'selected-shade': selectedShade === shade }"
                      :title="shade"
                    ></div>
                  </div>
                </div>

                <!-- Selected Color Display -->
                <div v-if="selectedShade" class="selected-display">
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="6" class="text-center">
                      <div class="selected-color-box" :style="{ backgroundColor: selectedShade }"></div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="selected-info">
                        <h4>Your Selection</h4>
                        <p class="color-code">{{ selectedShade }}</p>
                        <p class="color-name">{{ capitalize(selectedColor) }} Shade</p>
                        <v-btn
                          style="color: maroon;"
                          dark
                          rounded
                          class="mt-4"
                          @click="confirmSelection"
                        >
                          <v-icon left>mdi-check</v-icon>
                          Confirm Color
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Snackbar for confirmation -->
        <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          color="success"
          top
        >
          Color {{ selectedShade }} selected successfully!
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import palette from '@/assets/image.png';
export default {
  name: 'SareeColorPalette',
  
  data() {
    return {
      palette: palette,  
      selectedColor: null,
      selectedShade: null,
      snackbar: false,
      
      mainColors: [
        { name: 'green', color: '#00CC00' },
        { name: 'red', color: '#FF0000' },
        { name: 'blue', color: '#0000FF' },
        { name: 'yellow', color: '#FFFF00' },
        { name: 'cyan', color: '#00FFFF' },
        { name: 'magenta', color: '#FF00FF' }
      ],

      colorShades: {
        red: [
          '#FFE5E5', '#FFCCCC', '#FFB3B3', '#FF9999',
          '#FF8080', '#FF6666', '#FF4D4D', '#FF3333',
          '#FF1A1A', '#FF0000', '#E60000', '#CC0000',
          '#B30000', '#990000', '#800000', '#660000',
          '#4D0000', '#330000', '#1A0000', '#000000'
        ],
        
        green: [
          '#E5FFE5', '#CCFFCC', '#B3FFB3', '#99FF99',
          '#80FF80', '#66FF66', '#4DFF4D', '#33FF33',
          '#1AFF1A', '#00FF00', '#00E600', '#00CC00',
          '#00B300', '#009900', '#008000', '#006600',
          '#004D00', '#003300', '#001A00', '#000000'
        ],
        
        blue: [
          '#E5E5FF', '#CCCCFF', '#B3B3FF', '#9999FF',
          '#8080FF', '#6666FF', '#4D4DFF', '#3333FF',
          '#1A1AFF', '#0000FF', '#0000E6', '#0000CC',
          '#0000B3', '#000099', '#000080', '#000066',
          '#00004D', '#000033', '#00001A', '#000000'
        ],
        
        yellow: [
          '#FFFFCC', '#FFFFB3', '#FFFF99', '#FFFF80',
          '#FFFF66', '#FFFF4D', '#FFFF33', '#FFFF1A',
          '#FFFF00', '#E6E600', '#CCCC00', '#B3B300',
          '#999900', '#808000', '#666600', '#4D4D00',
          '#333300', '#1A1A00', '#0D0D00', '#000000'
        ],
        
        cyan: [
          '#E5FFFF', '#CCFFFF', '#B3FFFF', '#99FFFF',
          '#80FFFF', '#66FFFF', '#4DFFFF', '#33FFFF',
          '#1AFFFF', '#00FFFF', '#00E6E6', '#00CCCC',
          '#00B3B3', '#009999', '#008080', '#006666',
          '#004D4D', '#003333', '#001A1A', '#000000'
        ],
        
        magenta: [
          '#FFE5FF', '#FFCCFF', '#FFB3FF', '#FF99FF',
          '#FF80FF', '#FF66FF', '#FF4DFF', '#FF33FF',
          '#FF1AFF', '#FF00FF', '#E600E6', '#CC00CC',
          '#B300B3', '#990099', '#800080', '#660066',
          '#4D004D', '#330033', '#1A001A', '#000000'
        ]
      }
    };
  },

  computed: {
    currentShades() {
      return this.colorShades[this.selectedColor] || [];
    }
  },

  methods: {
    selectColor(colorName) {
      this.selectedColor = colorName;
      this.selectedShade = null;
    },

    selectShade(shade) {
      this.selectedShade = shade;
    },

    confirmSelection() {
      if (this.selectedShade) {
        this.snackbar = true;
        // Emit the selected color to parent component
        this.$emit('color-selected', {
          mainColor: this.selectedColor,
          shade: this.selectedShade
        });
      }
    },

    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style scoped>
.palette-card {
  border-radius: 20px;
  margin-top: 50px;
}

.palette-title {
  color: maroon;
  font-weight: 700;
  font-size: 28px;
}

.palette-section {
  display: flex;
  flex-direction: column;
  align-items: center;
 
}

.palette-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}

.palette-img {
  width: 320px;
  max-width: 100%;
  height: auto;
  display: block;
}

.paint-palette {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
}

.section-title {
  color: #333;
  font-weight: 600;
  font-size: 22px;
  margin: 25px 0 10px;
  text-align: center;
}

.section-subtitle {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}

.main-colors {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.color-btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.color-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
 
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.color-btn:hover {
  transform: scale(1.15);
  border-width: 5px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.color-btn.active {
  transform: scale(1.25);
  border-width: 6px;
  
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.color-label {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  text-transform: capitalize;
}

.shades-section {
  margin: 40px 0;
}

.shades-bar {
  display: flex;
  height: 90px;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
 
}

.shade {
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.shade:hover {
  transform: scaleY(1.15);
  z-index: 1;
}

.shade.selected-shade {
  transform: scaleY(1.3);
  z-index: 2;
  box-shadow: inset 0 0 0 4px white;
}

.selected-display {
  margin-top: 40px;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 2px solid maroon;
}

.selected-color-box {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.selected-info {
  text-align: center;
}

.selected-info h4 {
  color: maroon;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.color-code {
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  margin: 10px 0;
}

.color-name {
  font-size: 16px;
  color: #666;
  margin: 5px 0;
}

/* Responsive Design */
@media (max-width: 960px) {
  .palette-icon {
    width: 220px;
    height: 220px;
  }

  .color-btn {
    width: 60px;
    height: 60px;
  }

  .shades-bar {
    height: 70px;
  }

  .selected-color-box {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 600px) {
  .palette-card {
    margin: 10px;
  }

 

  .color-btn {
    width: 50px;
    height: 50px;
  }

  .main-colors {
    gap: 15px;
  }

  .shades-bar {
    height: 60px;
    border-radius: 30px;
  }

  .selected-color-box {
    width: 100px;
    height: 100px;
  }

  .palette-title {
    font-size: 22px;
  }

  .section-title {
    font-size: 18px;
  }
}
</style>