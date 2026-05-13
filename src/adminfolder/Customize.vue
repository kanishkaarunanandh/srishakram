<template>
  <div>
       <div style="padding-left: 50px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
         <h1 style="color: #A07547;">Customization</h1>
        <v-btn @click="saveusercustom(store.selectedColors)" rounded="pill" color="#615443" >save</v-btn>
      </div>
      <div>
        <div style="margin-top: 15px;">
          <h2 style="color: #A07547;">Select Color :</h2>

          <!-- ROW -->
          <div style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 20px;
      flex-wrap: wrap;
    ">
            <!-- Button -->
            <v-btn rounded="pill" @click="goToPalette" color="#615443">
              Select From Palette
            </v-btn>

            <!-- Selected colors -->
            <div v-for="c in store.selectedColors" :key="c.threadCode"
              style="display: flex; align-items: center; gap: 6px;">
              <!-- Color box -->
              <div :style="{
                backgroundColor: c.hex,
                border: '1px solid #000',
                width: '80px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }">
                {{ c.hex }}
              </div>

              <!-- Remove button -->
              <v-btn style="color: brown;" size="small" icon variant="flat" @click="unselectColor(c)">
                ✕
              </v-btn>
            </div>
          </div>
        </div>
        <div style="margin-top: 30px;">
          <h2 style="color: #A07547;">Select Border :</h2>

          <!-- ROW -->
          <div style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 5px;
      flex-wrap: wrap;
    ">
            <v-btn rounded="pill" color="#615443" @click="onPaletteButton1Click">
              Select From Palette
            </v-btn>

            <!-- Button -->
            <v-radio-group v-model="paletteOption1" inline>

              <v-radio label="Customize Border" value="border" color="#A07547"
                style="color: #A07547; padding-left: 70px; margin-top: 25px;" />
            </v-radio-group>


            <!-- Selected colors -->
           <div></div>
          </div>
        </div>
         <div style="margin-top: 20px;">
          <h2 style="color: #A07547;">Select Pallu :</h2>

          <!-- ROW -->
          <div style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 5px;
      flex-wrap: wrap;
    ">
            <v-btn rounded="pill" color="#615443" @click="onPaletteButton2Click">
              Select From Palette
            </v-btn>

            <!-- Button -->
            <v-radio-group v-model="paletteOption2" inline>

              <v-radio label="Customize Pallu" value="pallu" color="#A07547"
                style="color: #A07547; padding-left: 70px; margin-top: 25px;" />
            </v-radio-group>


            <!-- Selected colors -->
            <div>

            </div>
          </div>
        </div>
         <div style="margin-top: 20px;margin-bottom: 0px;">
          <h2 style="color: #A07547;">Select Body :</h2>

          <!-- ROW -->
          <div style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 5px;
      flex-wrap: wrap;
    ">
            <v-btn rounded="pill" color="#615443" @click="onPaletteButton3Click">
              Select From Palette
            </v-btn>

            <!-- Button -->
            <v-radio-group v-model="paletteOption3" inline>

              <v-radio label="Customize Body" value="body" color="#A07547"
                style="color: #A07547; padding-left: 70px; margin-top: 25px;" />
            </v-radio-group>


            <!-- Selected colors -->
           <div>

           </div>
          </div>
        </div>
      </div>
       </div>
  </div>
</template>
<script>
import { useColorStore } from "@/adminfolder/colorStore";
import api from "@/adminfolder/axios";

export default {
  
  data() {
    return {
      orderid: localStorage.getItem("orderid"),
      paletteOption1: null,
      paletteOption2: null,
      paletteOption3: null
    };
  },
  setup() {
    const store = useColorStore();
    return { store };
  },
  methods: {
    goToPalette() {
      this.$router.push("/color-palette");
    },
    unselectColor(color) {
      this.store.toggleColor(color);
    },
    onPaletteButton1Click() {
      this.paletteOption1 = null;
    },
    onPaletteButton2Click() {
      this.paletteOption2 = null;
    },
    onPaletteButton3Click() {
      this.paletteOption3 = null;
    },
    saveusercustom(selectedColors) {
      const colorMap = {};

      selectedColors.forEach(c => {
        colorMap[c.threadCode] = c.hex;
      });

      const payload = {
        orderId: this.orderid,
        selectedColors: colorMap,
        selectedBorder: [],
        selectedPallu: [],
        selectedBody: []
      };
      if (this.paletteOption1 === "border") {
        payload.selectedBorder = ["Customize Border"];
      }
      if (this.paletteOption2 === "pallu") {
        payload.selectedPallu = ["Customize Pallu"];
      }
      if (this.paletteOption3 === "body") {
        payload.selectedBody = ["Customize Body"];
      }

      console.log("Payload:", payload);
      api.post('user/custom/colors', payload)
        .then(response => {
          console.log("Colors saved successfully:", response.data);
           this.paletteOption1 = null;
      this.paletteOption2 = null;
      this.paletteOption3 = null;

      // ✅ RESET STORE
      this.store.resetColors();
        })
        .catch(error => {
          console.error("Error saving colors:", error);
        });
    }

  },

};
</script>
