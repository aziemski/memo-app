<template>
  <div>
    <h1>Add New Event</h1>
    <form @submit.prevent="addEvent">
      <input v-model="event.name" placeholder="Event Name" required />
      <input v-model="event.description" placeholder="Event Description" />
      <input type="date" v-model="event.startDate" required />
      <input type="date" v-model="event.endDate" placeholder="End Date" />
      <input v-model="event.imgUrl" placeholder="Image URL" />
      <button type="submit">Save</button>
      <button @click="goBack">Cancel</button>
    </form>
  </div>
</template>

<script>
import Event from '../models/Event';

export default {
  data() {
    return {
      event: new Event('', '', '', '', '')
    };
  },
  methods: {
    addEvent() {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      events.push(this.event);
      localStorage.setItem('events', JSON.stringify(events));
      this.$router.push({ name: 'EventList' });
    },
    goBack() {
      this.$router.push({ name: 'EventList' });
    }
  }
};
</script>
