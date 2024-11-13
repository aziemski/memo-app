<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Edit Event</h2>

    <form @submit.prevent="updateEvent">
      <div class="form-group">
        <label for="name">Event Name</label>
        <input type="text" id="name" v-model="event.name" class="form-control" placeholder="Enter event name" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="event.description" class="form-control" placeholder="Enter event description"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="startDate">Start Date</label>
          <input type="date" id="startDate" v-model="event.startDate" class="form-control" required />
        </div>
        <div class="form-group col-md-6">
          <label for="endDate">End Date</label>
          <input type="date" id="endDate" v-model="event.endDate" class="form-control" />
        </div>
      </div>

      <div class="form-group">
        <label for="imgUrl">Image URL</label>
        <input type="url" id="imgUrl" v-model="event.imgUrl" class="form-control" placeholder="Enter image URL" />
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button @click="deleteEvent" class="btn btn-danger">Delete</button>
        <button @click="goBack" class="btn btn-secondary">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {}
    };
  },
  created() {
    this.loadEvent();
  },
  methods: {
    loadEvent() {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      const eventId = parseInt(this.$route.params.id);
      this.event = events.find(evt => evt.id === eventId) || {};
    },
    updateEvent() {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      const index = events.findIndex(evt => evt.id === this.event.id);
      if (index !== -1) {
        events.splice(index, 1, this.event);
        localStorage.setItem('events', JSON.stringify(events));
      }
      this.$router.push({ name: 'EventList' });
    },
    deleteEvent() {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      const updatedEvents = events.filter(evt => evt.id !== this.event.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      this.$router.push({ name: 'EventList' });
    },
    goBack() {
      this.$router.push({ name: 'EventList' });
    }
  }
};
</script>
