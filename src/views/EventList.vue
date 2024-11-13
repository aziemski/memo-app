<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Memo App</h1>

    <div class="d-flex justify-content-between mb-4">
      <router-link :to="{ name: 'AddEvent' }" class="btn btn-primary">+ Add Event</router-link>
      <div>
        <button @click="seedEvents" class="btn btn-secondary mr-2">Seed Events</button>
        <button @click="seedCategories" class="btn btn-secondary">Seed Categories</button>
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
export default {
  data() {
    return {
      events: [],
      categories: [],
      eventCategoryConnections: []
    };
  },
  created() {
    this.loadEvents();
    this.loadCategories();
    this.loadConnections();
  },
  methods: {
    loadEvents() {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        this.events = JSON.parse(savedEvents);
      }
    },
    loadCategories() {
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories) {
        this.categories = JSON.parse(savedCategories);
      }
    },
    loadConnections() {
      const savedConnections = localStorage.getItem('eventCategoryConnections');
      if (savedConnections) {
        this.eventCategoryConnections = JSON.parse(savedConnections);
      }
    },
    seedEvents() {
      const sampleEvents = [
        { id: Date.now() + 1, name: 'Sample Event 1', description: 'Description for event 1', startDate: '2024-11-15', endDate: '2024-11-16', imgUrl: 'https://via.placeholder.com/100' },
        { id: Date.now() + 2, name: 'Sample Event 2', description: 'Description for event 2', startDate: '2024-11-17', endDate: '2024-11-18', imgUrl: 'https://via.placeholder.com/100' },
        { id: Date.now() + 3, name: 'Sample Event 3', description: 'Description for event 3', startDate: '2024-11-19', endDate: '2024-11-20', imgUrl: 'https://via.placeholder.com/100' }
      ];
      localStorage.setItem('events', JSON.stringify(sampleEvents));
      this.events = sampleEvents;
    },
    seedCategories() {
      const sampleCategories = [
        { id: Date.now() + 1, name: 'Work' },
        { id: Date.now() + 2, name: 'Personal' },
        { id: Date.now() + 3, name: 'Urgent' }
      ];
      const sampleConnections = [
        { eventId: this.events[0].id, categoryId: sampleCategories[0].id },
        { eventId: this.events[1].id, categoryId: sampleCategories[1].id  },
        { eventId: this.events[2].id, categoryId: sampleCategories[2].id  },
        { eventId: this.events[1].id, categoryId: sampleCategories[0].id  }
      ];
      localStorage.setItem('categories', JSON.stringify(sampleCategories));
      localStorage.setItem('eventCategoryConnections', JSON.stringify(sampleConnections));
      this.categories = sampleCategories;
      this.eventCategoryConnections = sampleConnections;
    },
    getCategoriesForEvent(eventId) {
      const categoryIds = this.eventCategoryConnections
        .filter(conn => conn.eventId === eventId)
        .map(conn => conn.categoryId);
      return this.categories
        .filter(cat => categoryIds.includes(cat.id))
        .map(cat => cat.name);
    }
  }
};
</script>

<style scoped>
.img-thumbnail {
  max-width: 100px;
}
</style>