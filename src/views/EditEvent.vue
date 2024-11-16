<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Edit Event</h2>

    <div v-if="errors.length" class="alert alert-danger">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <form @submit.prevent="updateEvent" class="border p-4 rounded bg-light">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
            id="name"
            v-model="event.name"
            class="form-control"
            placeholder="Enter event name"
            type="text"
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
            id="description"
            v-model="event.description"
            class="form-control"
            placeholder="Enter event description"
        ></textarea>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="startDate" class="form-label">Start Date</label>
          <input
              id="startDate"
              v-model="event.startDate"
              class="form-control"
              type="date"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="endDate" class="form-label">End Date</label>
          <input
              id="endDate"
              v-model="event.endDate"
              class="form-control"
              type="date"
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="imgUrl" class="form-label">Image URL</label>
        <input
            id="imgUrl"
            v-model="event.imgUrl"
            class="form-control"
            placeholder="Enter image URL"
            type="url"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Categories</label>
        <div>
          <div
              v-for="category in categories"
              :key="category.id"
              class="form-check form-check-inline"
          >
            <input
                type="checkbox"
                :id="'category' + category.id"
                v-model="event.categories"
                :value="category.id"
                class="form-check-input"
            />
            <label
                :for="'category' + category.id"
                class="form-check-label badge rounded-pill"
                :class="category.color ? 'text-light' : 'text-dark'"
                :style="category.color ? { backgroundColor: category.color, padding: '8px' } : {}"
            >
              {{ category.name }}
            </label>
          </div>
        </div>
        <div class="mt-2">
          <a href="/categories" class="text-primary">Manage Categories</a>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-danger" @click="deleteEvent">Delete</button>
        <button class="btn btn-secondary" @click="goBack">Cancel</button>
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import eventService from "@/services/EventService";

export default {
  data() {
    return {
      event: {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        imgUrl: "",
        categories: [],
      },
      categories: [],
      errors: [],
    };
  },
  created() {
    this.loadEvent();
    this.loadCategories();
  },
  methods: {
    loadEvent() {
      const eventId = parseInt(this.$route.params.id);
      const eventWithCategories = eventService.findEventWithCategories(eventId);
      if (eventWithCategories) {
        this.event = {
          ...eventWithCategories,
          categories: eventWithCategories.categories.map((cat) => cat.id),
        };
      }
    },
    loadCategories() {
      this.categories = eventService.getCategories();
    },
    updateEvent() {
      this.errors = [];
      if (!this.event.name) this.errors.push("Event name is required.");
      if (!this.event.startDate) this.errors.push("Start date is required.");
      if (!this.event.endDate) this.errors.push("End date is required.");

      if (this.errors.length === 0) {
        const updatedEvent = {
          ...this.event,
          categories: this.event.categories.map((catId) =>
              this.categories.find((cat) => cat.id === catId)
          ),
        };
        eventService.updateEventWithCategories(updatedEvent);
        this.$router.push({ name: "HomePage" });
      }
    },
    deleteEvent() {
      eventService.deleteEvent(this.event.id);
      this.$router.push({ name: "HomePage" });
    },
    goBack() {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>
