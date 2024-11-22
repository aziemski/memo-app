<template>
  <div class="container mt-5">
    <div v-if="events.length === 0" class="alert alert-info text-center">No events.</div>
    <div v-else>
      <ul class="list-group">
        <li v-for="evt in events" :key="evt.id" class="list-group-item">
          <div class="d-flex align-items-start">
            <img
              :src="evt.imgUrl || placeholderImage"
              alt="Event Image"
              class="img-thumbnail me-3"
            />
            <div class="flex-grow-1">
              <h5 class="mb-1">{{ evt.name }}</h5>
              <p class="mb-2 text-muted">
                {{ evt.description || 'No description available.' }}
              </p>
              <p class="mb-1">
                {{ formatDate(evt.startDate) }} to
                {{ formatDate(evt.endDate) }}
              </p>
              <div>
                <span
                  v-for="cat in evt.categories"
                  :key="cat.id"
                  :class="cat.color ? 'text-light' : 'text-dark'"
                  :style="cat.color ? { backgroundColor: cat.color } : {}"
                  class="badge rounded-pill me-1"
                >
                  {{ cat.name }}
                </span>
              </div>
            </div>
            <router-link
              v-if="isAuthenticated"
              :to="{ name: 'EditEvent', params: { id: evt.id } }"
              class="btn btn-outline-info ms-3"
            >
              Edit
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useUIStore } from '@/stores/ui.js'
import { useAuthStore } from '@/stores/auth.js'
import { useEventStore } from '@/stores/event.js'

export default {
  data() {
    return {
      placeholderImage: 'https://via.placeholder.com/100x100?text=No+Image+Available',
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    uiStore() {
      return useUIStore()
    },
    eventStore() {
      return useEventStore()
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated()
    },
    events() {
      return this.eventStore.getEventsWithCategories(this.uiStore.filters)
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
  },
}
</script>

<style scoped>
.img-thumbnail {
  max-width: 100px;
  height: auto;
}

.list-group-item {
  padding: 1rem;
}
</style>
