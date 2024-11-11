<template>
  <div>
      <h1>Events List</h1>
      <div v-for="event in events" :key="event.id">
          <p>{{ event.name }}</p>
          <button @click="editEvent(event)">Edit</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        events: [
        { id: 1, name: "Event One" },
        { id: 2, name: "Event Two" }
      ]
      };
  },
  methods: {
      editEvent(event) {
        console.log("edit event" + event)
      },
  }
};
</script>