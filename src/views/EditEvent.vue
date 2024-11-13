<template>
  <div>
    <h1>Edit Event</h1>
    <form @submit.prevent="updateEvent">
      <input v-model="event.name" placeholder="Event Name" required />
      <input v-model="event.description" placeholder="Event Description" />
      <input type="date" v-model="event.startDate" required />
      <input type="date" v-model="event.endDate" placeholder="End Date" />
      <input v-model="event.imgUrl" placeholder="Image URL" />
      <button type="submit">Save</button>
      <button @click="goBack">Cancel</button>
      <button @click="deleteEvent">Delete</button>
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
