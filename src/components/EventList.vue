<template>
  <div class="container mt-4">
    <div v-if="events.length === 0" class="alert alert-info text-center">
      No events.
    </div>
    <div v-else>
    <ul class="list-group">
      <li v-for="evt in events" :key="evt.id" class="list-group-item">
        <div class="d-flex align-items-center">
          <img v-if="evt.imgUrl" :src="evt.imgUrl" alt="Event Image" class="img-thumbnail mr-3" style="max-width: 100px;" />
          <div class="flex-grow-1">
            <h5 class="mb-1">{{ evt.name }}</h5>
            <p class="mb-1">{{ evt.startDate }} to {{ evt.endDate }}</p>
            <small class="text-muted">Categories: {{ getCategoriesForEvent(evt.id).join(', ') }}</small>
          </div>
          <router-link :to="{ name: 'EditEvent', params: { id: evt.id }}" class="btn btn-outline-info ml-3">Edit</router-link>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import eventService from '@/services/EventService';

export default {
  data() {
    return {
      events: [],
      categories: [],
    };
  },
  created() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      this.events = eventService.getEvents();
    },
    getCategoriesForEvent(eventId) {
      return eventService.getCategoriesForEvent(eventId);
    }
  }
};
</script>

<style scoped>
.img-thumbnail {
  max-width: 100px;
}
</style>