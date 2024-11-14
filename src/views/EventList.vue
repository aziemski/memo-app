<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Memo App</h1>

    <div class="d-flex justify-content-between mb-4">
      <router-link :to="{ name: 'AddEvent' }" class="btn btn-primary">+ Add Event</router-link>
      <div>
        <button @click="seedEvents" class="btn btn-secondary mr-2">Seed Eevents</button>
      </div>
    </div>

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
    this.loadCategories();
  },
  methods: {
    loadEvents() {
      this.events = eventService.getEvents();
    },
    loadCategories() {
      this.categories = eventService.getCategories();
    },
    seedEvents() {
      const sampleEvents = [
        { id: Date.now() + 1, name: 'Sample Event 1', description: 'Description for event 1', startDate: '2024-11-15', endDate: '2024-11-16', imgUrl: 'https://via.placeholder.com/100' },
        { id: Date.now() + 2, name: 'Sample Event 2', description: 'Description for event 2', startDate: '2024-11-17', endDate: '2024-11-18', imgUrl: 'https://via.placeholder.com/100' },
        { id: Date.now() + 3, name: 'Sample Event 3', description: 'Description for event 3', startDate: '2024-11-19', endDate: '2024-11-20', imgUrl: 'https://via.placeholder.com/100' }
      ];

      const sampleCategories = [
        { id: Date.now() + 1, name: 'Work' },
        { id: Date.now() + 2, name: 'Personal' },
        { id: Date.now() + 3, name: 'Urgent' }
      ];

      const sampleConnections = [
        { eventId: sampleEvents[0].id, categoryId: sampleCategories[0].id },
        { eventId: sampleEvents[1].id, categoryId: sampleCategories[1].id },
        { eventId: sampleEvents[2].id, categoryId: sampleCategories[2].id },
        { eventId: sampleEvents[1].id, categoryId: sampleCategories[0].id }
      ];

      eventService.saveEvents(sampleEvents);
      eventService.saveCategories(sampleCategories);
      eventService.saveConnections(sampleConnections);

      this.loadEvents();
      this.loadCategories();
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