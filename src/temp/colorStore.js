import { defineStore } from "pinia";

export const useColorStore = defineStore("color", {
  state: () => ({
    selectedColors: []
  }),

  actions: {
    toggleColor(color) {
      const index = this.selectedColors.findIndex(
        c => c.threadCode === color.threadCode
      );

      if (index === -1) {
        // not selected → add
        this.selectedColors.push(color);
      } else {
        // already selected → remove
        this.selectedColors.splice(index, 1);
      }
    },

    isSelected(threadCode) {
      return this.selectedColors.some(c => c.threadCode === threadCode);
    },
    resetColors() {
      this.selectedColors = [];
    }
  }
});
