import { reactive, watch } from 'vue'

const savedState = JSON.parse(localStorage.getItem('store')) || {}

export const store = reactive({
  isListView: savedState.isListView !== undefined ? savedState.isListView : false,
  users: savedState.users !== undefined ? savedState.users : [],

  currentUser: savedState.currentUser !== undefined ? savedState.currentUser : null,
  filters: {
    selectedCategories:
      savedState.filters?.selectedCategories !== undefined
        ? savedState.filters.selectedCategories
        : [],
    timeRange:
      savedState.filters?.timeRange !== undefined
        ? savedState.filters.timeRange
        : { from: null, to: null },
  },

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
})

watch(
  () => ({
    isListView: store.isListView,
    users: store.users,
    currentUser: store.currentUser,
    filters: store.filters,
  }),
  (newValues) => {
    localStorage.setItem('store', JSON.stringify(newValues))
  },
  { deep: true },
)
