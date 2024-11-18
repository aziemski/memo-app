import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isListView: false,
    filters: {
      selectedCategories: [],
      timeRange: { from: null, to: null },
    },
  }),
  actions: {
    toggleView() {
      this.isListView = !this.isListView
    },
    setFilterSelectedCategories(value) {
      this.filters.selectedCategories = Array.isArray(value) ? value : []
    },
    setFilterTimeRange(value) {
      this.filters.timeRange = value || { from: null, to: null }
    },
    clearFilters() {
      this.filters.selectedCategories = []
      this.filters.timeRange = { from: null, to: null }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'uiStore',
        storage: localStorage,
      },
    ],
  },
})
