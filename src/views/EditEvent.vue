<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Edit Event</h2>

    <form @submit.prevent="updateEvent">
      <div class="form-group">
        <label for="name">Event Name</label>
        <input id="name" v-model="event.name" class="form-control" placeholder="Enter event name" required type="text"/>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="event.description" class="form-control"
                  placeholder="Enter event description"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="startDate">Start Date</label>
          <input id="startDate" v-model="event.startDate" class="form-control" required type="date"/>
        </div>
        <div class="form-group col-md-6">
          <label for="endDate">End Date</label>
          <input id="endDate" v-model="event.endDate" class="form-control" type="date"/>
        </div>
      </div>

      <div class="form-group">
        <label for="imgUrl">Image URL</label>
        <input id="imgUrl" v-model="event.imgUrl" class="form-control" placeholder="Enter image URL" type="url"/>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-danger" @click="deleteEvent">Delete</button>
        <button class="btn btn-secondary" @click="goBack">Cancel</button>
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import eventService from '@/services/EventService';

export default {
  data() {
    return {
      event: {},
    };
  },
  created() {
    this.loadEvent();
  },
  methods: {
    loadEvent() {
      const eventId = parseInt(this.$route.params.id);
      this.event = eventService.getEvents().find(evt => evt.id === eventId) || {};
    },
    updateEvent() {
      eventService.updateEvent(this.event);
      this.$router.push({name: 'HomePage'});
    },
    deleteEvent() {
      eventService.deleteEvent(this.event.id);
      this.$router.push({name: 'HomePage'});
    },
    goBack() {
      this.$router.push({name: 'HomePage'});
    }
  }
};
</script>
