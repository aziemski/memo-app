<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">{{ mode === 'edit' ? 'Edit Event' : 'Add Event' }}</h2>

    <div v-if="errors.length" class="alert alert-danger">
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <form class="border p-4 rounded bg-light" @submit.prevent="upsertEvent">
      <div class="mb-3">
        <label class="form-label" for="name">Name</label>
        <input
            id="name"
            v-model="event.name"
            class="form-control"
            placeholder="Enter event name"
            type="text"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="description">Description</label>
        <textarea
            id="description"
            v-model="event.description"
            class="form-control"
            placeholder="Enter event description"
        ></textarea>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label" for="startDate">Start Date</label>
          <input
              id="startDate"
              v-model="event.startDate"
              class="form-control"
              type="date"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label" for="endDate">End Date</label>
          <input
              id="endDate"
              v-model="event.endDate"
              class="form-control"
              type="date"
          />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="imgUrl">Image URL</label>
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
                :id="'category' + category.id"
                v-model="event.categories"
                :value="category.id"
                class="form-check-input"
                type="checkbox"
            />
            <label
                :class="category.color ? 'text-light' : 'text-dark'"
                :for="'category' + category.id"
                :style="category.color ? { backgroundColor: category.color, padding: '8px' } : {}"
                class="form-check-label badge rounded-pill"
            >
              {{ category.name }}
            </label>
          </div>
        </div>
        <div class="mt-2">
          <router-link class="text-primary" to="/categories">Manage Categories</router-link>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button
            v-if="mode === 'edit'"
            class="btn btn-danger"
            @click="deleteEvent">Delete
        </button>
        <button
            class="btn btn-secondary"
            @click="goBack">Cancel
        </button>
        <button
            class="btn btn-primary" type="submit">Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import EventService from "@/services/eventService";

export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
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
    this.loadCategories();
    if (this.mode === "edit") {
      this.loadEvent();
    }
  },
  methods: {
    loadEvent() {
      const eventId = parseInt(this.$route.params.id);
      const eventWithCategories = EventService.findEventWithCategories(eventId);
      if (eventWithCategories) {
        this.event = {
          ...eventWithCategories,
          categories: eventWithCategories.categories.map((cat) => cat.id),
        };
      }
    },
    loadCategories() {
      this.categories = EventService.getCategories();
    },
    upsertEvent() {
      this.errors = [];
      if (!this.event.name) this.errors.push("Event name is required.");
      if (!this.event.startDate) this.errors.push("Start date is required.");
      if (!this.event.endDate) this.errors.push("End date is required.");
      if (this.event.startDate && this.event.endDate) {
        const startDate = new Date(this.event.startDate);
        const endDate = new Date(this.event.endDate);
        if (endDate < startDate) {
          this.errors.push("End date cannot be before start date.");
        }
      }

      if (this.errors.length === 0) {
        const updatedEvent = {
          ...this.event,
          categories: this.event.categories.map((catId) =>
              this.categories.find((cat) => cat.id === catId)
          ),
        };
        EventService.upsertEventWithCategories(updatedEvent);
        this.$router.push({name: "HomePage"});
      }
    },
    deleteEvent() {
      EventService.deleteEvent(this.event.id);
      this.$router.push({name: "HomePage"});
    },
    goBack() {
      this.$router.push({name: "HomePage"});
    },
  },
};
</script>
