import { reactive, watch } from 'vue'

const savedState = JSON.parse(localStorage.getItem('store')) || {}

export const store = reactive({
  users: savedState.users !== undefined ? savedState.users : [],

  currentUser: savedState.currentUser !== undefined ? savedState.currentUser : null,
})

watch(
  () => ({
    users: store.users,
    currentUser: store.currentUser,
  }),
  (newValues) => {
    localStorage.setItem('store', JSON.stringify(newValues))
  },
  { deep: true },
)
