<template>
  <div>
    <h1>Memo App</h1>
    <router-link :to="{ name: 'AddEvent' }">Add Event</router-link>
    <button @click="seedEvents">Seed Events</button>
    <ul>
      <li v-for="evt in events" :key="evt.id">
        <img v-if="evt.imgUrl" :src="evt.imgUrl" alt="Event Image" style="max-width: 100px;" />
        <p>{{ evt.name }} - {{ evt.description }}- {{ evt.startDate }} to {{ evt.endDate }}</p>
        <router-link :to="{ name: 'EditEvent', params: { id: evt.id }}">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: []
    };
  },
  created() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        this.events = JSON.parse(savedEvents);
      }
    },
    seedEvents() {
      const sampleEvents = [
        {
          id: Date.now() + 1,
          name: 'Sample Event 1',
          description: 'Description for event 1',
          startDate: '2024-11-15',
          endDate: '2024-11-16',
          imgUrl: 'https://via.placeholder.com/100'
        },
        {
          id: Date.now() + 2,
          name: 'Sample Event 2',
          description: 'Description for event 2',
          startDate: '2024-11-17',
          endDate: '2024-11-18',
          imgUrl: 'https://via.placeholder.com/100'
        },
        {
          id: Date.now() + 3,
          name: 'Sample Event 3',
          description: 'Description for event 3',
          startDate: '2024-11-19',
          endDate: '2024-11-20',
          imgUrl: 'https://via.placeholder.com/100'
        }
      ];
      localStorage.setItem('events', JSON.stringify(sampleEvents));
      this.events = sampleEvents;
    }
  }
};
</script>
